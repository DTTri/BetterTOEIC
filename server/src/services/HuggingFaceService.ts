import axios from 'axios';
import dotenv from 'dotenv';
import { SWTest } from '~/models';

dotenv.config();

class HuggingFaceService {
  private apiKey: string;
  private baseUrl: string;
  private llmModel: string;
  private sttModel: string;

  constructor() {
    this.apiKey = process.env.HUGGING_FACE_API_KEY || '';
    this.baseUrl = 'https://api-inference.huggingface.co/models/';
    this.llmModel = 'mistralai/Mixtral-8x7B-Instruct-v0.1';
    this.sttModel = 'openai/whisper-large-v3';
  }

  async evaluateSWTest(
    test: SWTest,
    answers: string[]
  ): Promise<{
    evaluations: string[];
    sampleAnswers: string[];
    scores: number[];
    transcriptions?: string[];
  }> {
    try {
      const evaluations: string[] = [];
      const sampleAnswers: string[] = [];
      const scores: number[] = [];
      const transcriptions: string[] = [];

      // Process each answer
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const isSpoken = i < 11; // First 11 are speaking, rest are writing
        let textToEvaluate = answer;

        // For speaking answers, we need to transcribe the audio first
        if (isSpoken) {
          try {
            // Download the audio file from S3
            const audioData = await this.downloadAudioFromS3(answer);

            // Transcribe the audio using Whisper
            const transcription = await this.transcribeAudio(audioData);
            transcriptions.push(transcription);

            // Use the transcription for evaluation
            textToEvaluate = transcription;
          } catch (error) {
            console.error(`Error processing audio for question ${i + 1}:`, error);
            transcriptions.push('Error transcribing audio');
            // If transcription fails, we'll use a placeholder
            textToEvaluate = 'Audio transcription failed';
          }
        }

        // Get the question text to provide context for evaluation
        const question = test.questions[i];

        // Create prompt based on question type and include the question text
        const prompt = this.createEvaluationPrompt(textToEvaluate, isSpoken, i + 1, question.text, question.passage);

        // Call Hugging Face API with retry logic
        const response = await this.callHuggingFaceAPIWithRetry(prompt, this.llmModel);

        // Parse the response
        const { evaluation, sampleAnswer, score } = this.parseResponse(response);

        evaluations.push(evaluation);
        sampleAnswers.push(sampleAnswer);
        scores.push(score);
      }

      return { evaluations, sampleAnswers, scores, transcriptions };
    } catch (error) {
      console.error('Error evaluating SW Test:', error);
      throw error;
    }
  }

  private async downloadAudioFromS3(audioUrl: string): Promise<Buffer> {
    try {
      const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error downloading audio from S3:', error);
      throw error;
    }
  }

  private async transcribeAudio(audioData: Buffer): Promise<string> {
    try {
      // Create form data with the audio file
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('file', audioData, {
        filename: 'audio.mp3',
        contentType: 'audio/mp3',
      });

      // Call Whisper API
      const response = await axios.post(`${this.baseUrl}${this.sttModel}`, formData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.text || '';
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }

  private async callHuggingFaceAPI(prompt: string, model: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}${model}`,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.generated_text || '';
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      throw error;
    }
  }

  private async callHuggingFaceAPIWithRetry(prompt: string, model: string, maxRetries = 3): Promise<string> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await this.callHuggingFaceAPI(prompt, model);
      } catch (error: any) {
        retries++;
        if (retries >= maxRetries) {
          throw error;
        }

        // Exponential backoff
        const delay = 1000 * Math.pow(2, retries);
        console.log(`Retry ${retries}/${maxRetries} after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error('Maximum retries exceeded');
  }

  private createEvaluationPrompt(
    answer: string,
    isSpoken: boolean,
    questionNumber: number,
    questionText: string,
    passage?: string
  ): string {
    const taskType = isSpoken ? 'Speaking' : 'Writing';

    return `You are an expert TOEIC ${taskType} evaluator with years of experience.
You will evaluate the following TOEIC ${taskType} response for question #${questionNumber}.

Question: ${questionText}
${passage ? `Passage: ${passage}` : ''}

${isSpoken ? 'This is a transcription of a spoken response:' : 'This is a written response:'}
"${answer}"

Please evaluate this response based on TOEIC ${taskType} criteria and provide:
1. A detailed evaluation (100-150 words) focusing on:
   - For Speaking: pronunciation, intonation, fluency, vocabulary, grammar, and content completeness
   - For Writing: grammar, vocabulary, organization, development, and task completion
2. A sample improved response that would score higher
3. A score on a scale of 0-5, where:
   0 = No response or incomprehensible
   1 = Demonstrates minimal proficiency
   2 = Demonstrates limited proficiency
   3 = Demonstrates fair proficiency
   4 = Demonstrates good proficiency
   5 = Demonstrates excellent proficiency

Format your response exactly as follows:
EVALUATION: [Your detailed evaluation here]
SAMPLE_ANSWER: [Your sample improved response here]
SCORE: [Single number between 0-5]`;
  }

  private parseResponse(response: string): { evaluation: string; sampleAnswer: string; score: number } {
    try {
      // Extract evaluation
      const evaluationMatch = response.match(/EVALUATION:(.*?)(?=SAMPLE_ANSWER:|$)/s);
      const evaluation = evaluationMatch ? evaluationMatch[1].trim() : '';

      // Extract sample answer
      const sampleMatch = response.match(/SAMPLE_ANSWER:(.*?)(?=SCORE:|$)/s);
      const sampleAnswer = sampleMatch ? sampleMatch[1].trim() : '';

      // Extract score
      const scoreMatch = response.match(/SCORE:\s*(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

      return { evaluation, sampleAnswer, score };
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      return { evaluation: 'Error evaluating response', sampleAnswer: '', score: 0 };
    }
  }
}

const huggingFaceServiceInstance = new HuggingFaceService();
export default huggingFaceServiceInstance;

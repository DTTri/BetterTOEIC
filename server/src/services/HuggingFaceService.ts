import axios from 'axios';
import dotenv from 'dotenv';
import { SWTest } from '~/models';

dotenv.config();

interface CacheEntry {
  timestamp: number;
  data: string;
}

class HuggingFaceService {
  private apiKey: string;
  private baseUrl: string;
  private llmModel: string;
  private sttModel: string;
  private fallbackLlmModel: string;
  private responseCache: Map<string, CacheEntry>;
  private cacheTTL: number; // time to live in milliseconds

  constructor() {
    this.apiKey = process.env.HUGGING_FACE_API_KEY || '';
    this.baseUrl = 'https://api-inference.huggingface.co/models/';
    this.llmModel = process.env.LLM_MODEL || 'google/flan-t5-xxl';
    this.fallbackLlmModel = 'google/flan-t5-xxl';
    this.sttModel = 'openai/whisper-large-v3';
    this.responseCache = new Map<string, CacheEntry>();
    this.cacheTTL = 24 * 60 * 60 * 1000;
  }

  async evaluateSWTest(
    test: SWTest,
    answers: string[]
  ): Promise<{
    evaluations: string[];
    sampleAnswers: string[];
    scores: number[];
  }> {
    try {
      const evaluations: string[] = new Array(answers.length);
      const sampleAnswers: string[] = new Array(answers.length);
      const scores: number[] = new Array(answers.length);
      const transcriptions: string[] = new Array(11);

      const speakingAnswers = answers.slice(0, 11);
      const transcriptionPromises = speakingAnswers.map(async (audioUrl, index) => {
        try {
          const audioData = await this.downloadAudioFromS3(audioUrl);
          const transcription = await this.transcribeAudio(audioData);
          return { index, transcription, success: true };
        } catch (error) {
          console.error(`Error processing audio for question ${index + 1}`);
          return { index, transcription: 'Error transcribing audio', success: false };
        }
      });
      const transcriptionResults = await Promise.all(transcriptionPromises);
      transcriptionResults.forEach((result) => {
        transcriptions[result.index] = result.transcription;
      });

      const evaluationData = answers.map((answer, index) => {
        const isSpoken = index < 11;
        const question = test.questions[index];
        let textToEvaluate = answer;

        if (isSpoken) {
          const transcriptionResult = transcriptionResults.find((r) => r.index === index);
          textToEvaluate = transcriptionResult?.transcription || 'Audio transcription failed';
        }

        return {
          index,
          textToEvaluate,
          isSpoken,
          questionNumber: index + 1,
          questionText: question.text,
          passage: question.passage,
        };
      });

      const BATCH_SIZE = 5;
      const batches = [];

      for (let i = 0; i < evaluationData.length; i += BATCH_SIZE) {
        batches.push(evaluationData.slice(i, i + BATCH_SIZE));
      }

      for (const batch of batches) {
        const batchPromises = batch.map(async (data) => {
          try {
            const prompt = data.isSpoken
              ? this.createSpeakingEvaluationPrompt(
                  data.textToEvaluate,
                  data.questionNumber,
                  data.questionText,
                  data.passage
                )
              : this.createWritingEvaluationPrompt(
                  data.textToEvaluate,
                  data.questionNumber,
                  data.questionText,
                  data.passage
                );

            const response = await this.callHuggingFaceAPIWithRetry(prompt, this.llmModel);
            const { evaluation, sampleAnswer, score } = this.parseResponse(response);

            return {
              index: data.index,
              evaluation,
              sampleAnswer,
              score,
            };
          } catch (error) {
            console.error(`Error evaluating question ${data.questionNumber}`);
            return {
              index: data.index,
              evaluation: 'Error evaluating response',
              sampleAnswer: 'Unable to generate sample answer due to evaluation error',
              score: 0,
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);

        batchResults.forEach((result) => {
          evaluations[result.index] = result.evaluation;
          sampleAnswers[result.index] = result.sampleAnswer;
          scores[result.index] = result.score;
        });
      }

      return { evaluations, sampleAnswers, scores };
    } catch (error) {
      console.error('Error evaluating SW Test:');
      throw error;
    }
  }

  private async downloadAudioFromS3(audioUrl: string): Promise<Buffer> {
    try {
      const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error downloading audio from S3:');
      throw error;
    }
  }

  private async transcribeAudio(audioData: Buffer): Promise<string> {
    try {
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('file', audioData, {
        filename: 'audio.mp3',
        contentType: 'audio/mp3',
      });

      const response = await axios.post(`${this.baseUrl}${this.sttModel}`, formData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.text || '';
    } catch (error) {
      console.error('Error transcribing audio:');
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
    } catch (error: any) {
      if (error.response && error.response.status === 402) {
        console.error('Hugging Face API payment required error:', error.response.data.error);
        return this.generateFallbackResponse(prompt);
      }
      console.error('Error calling Hugging Face API:');
      throw error;
    }
  }

  private generateFallbackResponse(prompt: string): string {
    const isSpoken = prompt.includes('TOEIC Speaking evaluator');
    const questionMatch = prompt.match(/question #(\d+)/);
    const questionNumber = questionMatch ? parseInt(questionMatch[1]) : 0;

    return `EVALUATION: Due to high demand, our evaluation service is temporarily unavailable. Your ${isSpoken ? 'speaking' : 'writing'} response for question ${questionNumber} has been recorded and will be evaluated when the service is restored. In the meantime, please continue with the remaining questions.

SAMPLE_ANSWER: A sample answer cannot be provided at this time. Please refer to the TOEIC ${isSpoken ? 'Speaking' : 'Writing'} guidelines for examples of high-scoring responses.

SCORE: 3`;
  }

  private async callHuggingFaceAPIWithRetry(prompt: string, model: string, maxRetries = 3): Promise<string> {
    const cacheKey = this.generateCacheKey(prompt, model);

    const cachedResponse = this.getCachedResponse(cacheKey);
    if (cachedResponse) {
      console.log('Using cached response');
      return cachedResponse;
    }

    let retries = 0;
    let lastError: any = null;

    while (retries < maxRetries) {
      try {
        const response = await this.callHuggingFaceAPI(prompt, model);
        this.cacheResponse(cacheKey, response);
        return response;
      } catch (error: any) {
        lastError = error;
        retries++;

        if (retries >= maxRetries && model === this.llmModel && !(error.response && error.response.status === 402)) {
          console.log(
            `Trying fallback model ${this.fallbackLlmModel} after ${maxRetries} failed attempts with primary model`
          );

          try {
            const fallbackResponse = await this.callHuggingFaceAPI(prompt, this.fallbackLlmModel);

            this.cacheResponse(cacheKey, fallbackResponse);

            return fallbackResponse;
          } catch (fallbackError) {
            console.error('Fallback model also failed:', fallbackError);
          }
        }

        if (retries >= maxRetries) {
          console.error('All API attempts failed, using generated fallback response');
          const fallbackResponse = this.generateFallbackResponse(prompt);
          return fallbackResponse;
        }

        const delay = 1000 * Math.pow(2, retries);
        console.log(`Retry ${retries}/${maxRetries} after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // this should never be reached due to the fallback response above
    throw new Error('Maximum retries exceeded');
  }

  private generateCacheKey(prompt: string, model: string): string {
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      const char = prompt.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // convert to 32bit integer
    }
    return `${model}_${hash}`;
  }

  private getCachedResponse(cacheKey: string): string | null {
    const cached = this.responseCache.get(cacheKey);
    if (cached) {
      const now = Date.now();
      if (now - cached.timestamp < this.cacheTTL) {
        return cached.data;
      } else {
        this.responseCache.delete(cacheKey);
      }
    }
    return null;
  }

  private cacheResponse(cacheKey: string, response: string): void {
    this.responseCache.set(cacheKey, {
      timestamp: Date.now(),
      data: response,
    });
  }

  private createSpeakingEvaluationPrompt(
    answer: string,
    questionNumber: number,
    questionText: string,
    passage?: string
  ): string {
    return `You are an expert TOEIC Speaking evaluator with years of experience.
You will evaluate the following TOEIC Speaking response for question #${questionNumber}.

Question: ${questionText}
${passage ? `Passage: ${passage}` : ''}

This is a transcription of a spoken response:
"${answer}"

Please evaluate this response based on TOEIC Speaking criteria and provide:
1. A detailed evaluation (100-150 words) focusing on:
   - Pronunciation: clarity, stress, intonation patterns
   - Fluency: smoothness, pace, natural flow of speech
   - Grammar: accuracy of grammatical structures
   - Vocabulary: appropriateness and range of vocabulary
   - Content completeness: addressing all parts of the question
   - Coherence: logical organization and development of ideas

2. A sample improved response that would score higher (what a high-scoring response would sound like)

3. A score on a scale of 0-5, where:
   0 = No response or incomprehensible
   1 = Demonstrates minimal proficiency (major pronunciation issues, very limited vocabulary)
   2 = Demonstrates limited proficiency (frequent errors, hesitations disrupt communication)
   3 = Demonstrates fair proficiency (some errors but generally understandable)
   4 = Demonstrates good proficiency (minor errors, good fluency and pronunciation)
   5 = Demonstrates excellent proficiency (near-native fluency, very few errors)

Format your response exactly as follows:
EVALUATION: [Your detailed evaluation here]
SAMPLE_ANSWER: [Your sample improved response here]
SCORE: [Single number between 0-5]`;
  }

  private createWritingEvaluationPrompt(
    answer: string,
    questionNumber: number,
    questionText: string,
    passage?: string
  ): string {
    return `You are an expert TOEIC Writing evaluator with years of experience.
You will evaluate the following TOEIC Writing response for question #${questionNumber}.

Question: ${questionText}
${passage ? `Passage: ${passage}` : ''}

This is a written response:
"${answer}"

Please evaluate this response based on TOEIC Writing criteria and provide:
1. A detailed evaluation (100-150 words) focusing on:
   - Grammar: accuracy and variety of grammatical structures
   - Vocabulary: appropriateness, range, and precision of word choice
   - Organization: logical structure, coherence, and use of transitions
   - Development: elaboration of ideas, use of examples and details
   - Task completion: addressing all parts of the prompt
   - Mechanics: spelling, punctuation, and capitalization

2. A sample improved response that would score higher

3. A score on a scale of 0-5, where:
   0 = No response or incomprehensible
   1 = Demonstrates minimal proficiency (major grammatical errors, very limited vocabulary)
   2 = Demonstrates limited proficiency (frequent errors, inadequate development)
   3 = Demonstrates fair proficiency (some errors but generally clear)
   4 = Demonstrates good proficiency (minor errors, good organization and development)
   5 = Demonstrates excellent proficiency (very few errors, sophisticated language use)

Format your response exactly as follows:
EVALUATION: [Your detailed evaluation here]
SAMPLE_ANSWER: [Your sample improved response here]
SCORE: [Single number between 0-5]`;
  }

  private parseResponse(response: string): { evaluation: string; sampleAnswer: string; score: number } {
    try {
      const evaluationMatch = response.match(/EVALUATION:(.*?)(?=SAMPLE_ANSWER:|$)/s);
      const evaluation = evaluationMatch ? evaluationMatch[1].trim() : '';

      const sampleMatch = response.match(/SAMPLE_ANSWER:(.*?)(?=SCORE:|$)/s);
      const sampleAnswer = sampleMatch ? sampleMatch[1].trim() : '';

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

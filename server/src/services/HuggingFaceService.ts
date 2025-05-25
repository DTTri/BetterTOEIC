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
  private huggingFaceBaseUrl: string;
  private openaiBaseUrl: string;
  private llmModel: string;
  private sttModel: string;
  private multimodalModel: string;
  private fallbackLlmModel: string;
  private responseCache: Map<string, CacheEntry>;
  private cacheTTL: number;
  private openaiApiKey: string;

  constructor() {
    this.apiKey = process.env.HUGGING_FACE_API_KEY || '';
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.huggingFaceBaseUrl = 'https://api-inference.huggingface.co/models/';
    this.openaiBaseUrl = 'https://api.openai.com/v1/';
    this.llmModel = process.env.LLM_MODEL || 'microsoft/phi-2';
    this.fallbackLlmModel = process.env.FALLBACK_LLM_MODEL || 'google/flan-t5-large';
    this.sttModel = process.env.STT_MODEL || 'openai/whisper-small';
    this.multimodalModel = process.env.MULTIMODAL_MODEL || 'gpt-4o-mini';
    this.responseCache = new Map<string, CacheEntry>();
    this.cacheTTL = 24 * 60 * 60 * 1000;

    // Log configuration for debugging
    console.log('HuggingFaceService initialized with:');
    console.log(`- Multimodal Model: ${this.multimodalModel}`);
    console.log(`- OpenAI API Key available: ${this.openaiApiKey ? 'Yes' : 'No'}`);
    console.log(`- OpenAI Base URL: ${this.openaiBaseUrl}`);
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

      const questionImages: Map<number, Buffer[]> = new Map();
      const imageDownloadPromises: Promise<void>[] = [];

      for (const question of test.questions) {
        if (question.image && question.image.length > 0) {
          const questionNumber = question.question_number;
          const imagePromises = question.image.map(async (imageUrl) => {
            try {
              console.log(`Downloading image for question ${questionNumber}: ${imageUrl}`);
              const imageData = await this.downloadImageFromS3(imageUrl);

              if (!questionImages.has(questionNumber)) {
                questionImages.set(questionNumber, []);
              }

              const images = questionImages.get(questionNumber);
              if (images) {
                images.push(imageData);
              }

              console.log(`Successfully downloaded image for question ${questionNumber}: ${imageData.length} bytes`);
            } catch (error: any) {
              console.error(
                `Error downloading image for question ${questionNumber}: ${error.message || 'Unknown error'}`
              );
            }
          });

          imageDownloadPromises.push(...imagePromises);
        }
      }

      if (imageDownloadPromises.length > 0) {
        console.log(`Downloading ${imageDownloadPromises.length} images...`);
        await Promise.all(imageDownloadPromises);
        console.log('All images downloaded successfully');
      }

      const speakingAnswers = answers.slice(0, 11);
      const transcriptionPromises = speakingAnswers.map(async (audioUrl, index) => {
        try {
          if (!audioUrl || audioUrl === 'null' || audioUrl === 'undefined') {
            console.warn(`No audio URL provided for question ${index + 1}`);
            return {
              index,
              transcription: '[No audio response provided]',
              success: false,
            };
          }

          let audioData: Buffer;
          if (Buffer.isBuffer(audioUrl)) {
            console.log(`Processing audio buffer for question ${index + 1}: ${audioUrl.length} bytes`);
            audioData = audioUrl;
          } else {
            console.log(
              `Processing audio for question ${index + 1}: ${typeof audioUrl === 'string' ? audioUrl.substring(0, 100) + '...' : 'non-string type'}`
            );

            try {
              audioData = await this.downloadAudioFromS3(audioUrl);
            } catch (downloadError: any) {
              console.error(`Error downloading audio for question ${index + 1}: ${downloadError.message}`);

              if (typeof audioUrl === 'string' && audioUrl.includes('s3.amazonaws.com')) {
                const urlMatch = audioUrl.match(/(https?:\/\/[^\s]+)/);
                if (urlMatch) {
                  const extractedUrl = urlMatch[0];
                  console.log(`Retrying with extracted URL: ${extractedUrl}`);
                  audioData = await this.downloadAudioFromS3(extractedUrl);
                } else {
                  throw new Error('Could not extract valid URL from string');
                }
              } else {
                throw downloadError;
              }
            }
          }

          if (!audioData || audioData.length === 0) {
            console.warn(`Empty audio data for question ${index + 1}`);
            return {
              index,
              transcription: '[Empty audio file]',
              success: false,
            };
          }

          console.log(
            `Audio data for question ${index + 1}: ${audioData.length} bytes, first 16 bytes: ${Buffer.from(audioData.buffer, audioData.byteOffset, Math.min(16, audioData.length)).toString('hex')}`
          );

          const transcription = await this.transcribeAudio(audioData);

          if (!transcription || transcription.trim() === '') {
            console.warn(`Empty transcription result for question ${index + 1}`);
            return {
              index,
              transcription: '[No speech detected in audio]',
              success: false,
            };
          }

          return { index, transcription, success: true };
        } catch (error: any) {
          console.error(`Error processing audio for question ${index + 1}: ${error.message || 'Unknown error'}`);

          let errorMessage = 'Error transcribing audio';
          if (error.response && error.response.status) {
            errorMessage += ` (Status: ${error.response.status})`;

            if (error.response.status === 402) {
              errorMessage += ' - API usage limit reached';
            }
          }

          return {
            index,
            transcription: errorMessage,
            success: false,
          };
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
        const questionNumber = index + 1;

        const imageBuffers = questionImages.get(questionNumber) || [];

        if (isSpoken) {
          const transcriptionResult = transcriptionResults.find((r) => r.index === index);
          textToEvaluate = transcriptionResult?.transcription || 'Audio transcription failed';
        }

        return {
          index,
          textToEvaluate,
          isSpoken,
          questionNumber,
          questionText: question.text,
          passage: question.passage,
          imageBuffers: imageBuffers.length > 0 ? imageBuffers : undefined,
          questionAudio: question.question_audio,
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
            let responseText;

            if (data.imageBuffers && data.imageBuffers.length > 0) {
              responseText = await this.evaluateWithMultimodalModel(
                data.textToEvaluate,
                data.questionNumber,
                data.questionText,
                data.passage,
                data.imageBuffers,
                data.isSpoken,
                data.questionAudio
              );
            } else {
              let prompt;

              if (data.questionNumber === 1 || data.questionNumber === 2) {
                prompt = this.createReadAloudEvaluationPrompt(
                  data.textToEvaluate,
                  data.questionNumber,
                  data.questionText
                );
              } else if (data.isSpoken) {
                prompt = this.createSpeakingEvaluationPrompt(
                  data.textToEvaluate,
                  data.questionNumber,
                  data.questionText,
                  data.passage
                );
              } else {
                prompt = this.createWritingEvaluationPrompt(
                  data.textToEvaluate,
                  data.questionNumber,
                  data.questionText,
                  data.passage
                );
              }

              responseText = await this.callHuggingFaceAPIWithRetry(prompt, this.llmModel);
            }
            const { evaluation, sampleAnswer, score } = this.parseResponse(responseText);

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

          if (result.index === 0 || result.index === 1) {
            sampleAnswers[result.index] = test.questions[result.index].text;
            console.log(`Using original text as sample answer for read-aloud question ${result.index + 1}`);
          } else {
            sampleAnswers[result.index] = result.sampleAnswer;
          }

          scores[result.index] = result.score;
        });
      }

      return { evaluations, sampleAnswers, scores };
    } catch (error) {
      console.error('Error evaluating SW Test:');
      throw error;
    }
  }

  private async downloadFromS3(url: string, fileType: 'audio' | 'image'): Promise<Buffer> {
    try {
      if (!url.startsWith('http')) {
        if (Buffer.isBuffer(url)) {
          console.log(`Input is already a Buffer, returning as is`);
          return url;
        }

        if (typeof url === 'string' && url.includes('s3.amazonaws.com')) {
          const urlMatch = url.match(/(https?:\/\/[^\s]+)/);
          if (urlMatch) {
            url = urlMatch[0];
            console.log(`Extracted URL from string: ${url}`);
          } else {
            console.error('Could not extract URL from string');
            throw new Error(`Invalid ${fileType} URL format`);
          }
        } else {
          console.error('Input is not a valid URL or Buffer');
          throw new Error(`Invalid ${fileType} URL format`);
        }
      }

      console.log(`Downloading ${fileType} from: ${url}`);

      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 10000, // 10s
      });

      if (!response.data || response.data.length === 0) {
        throw new Error(`Empty response received from S3 for ${fileType}`);
      }

      const buffer = Buffer.from(response.data, 'binary');
      console.log(`Successfully downloaded ${fileType}: ${buffer.length} bytes`);
      return buffer;
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Error downloading ${fileType} from S3 (Status ${error.response.status}):`,
          error.response.statusText || 'Unknown error'
        );
      } else if (error.request) {
        console.error(`Error downloading ${fileType} from S3: No response received (timeout or CORS issue)`);
      } else {
        console.error(`Error downloading ${fileType} from S3:`, error.message || 'Unknown error');
      }

      throw error;
    }
  }

  private async downloadAudioFromS3(audioUrl: string): Promise<Buffer> {
    return this.downloadFromS3(audioUrl, 'audio');
  }

  private async downloadImageFromS3(imageUrl: string): Promise<Buffer> {
    return this.downloadFromS3(imageUrl, 'image');
  }

  private async transcribeAudio(audioData: Buffer): Promise<string> {
    const sttModels = [
      this.sttModel, // Primary model
      'openai/whisper-base', // Fallback 1
      'facebook/wav2vec2-base-960h', // Fallback 2
    ];

    for (const model of sttModels) {
      try {
        console.log(`Attempting to transcribe audio with model: ${model}`);
        const FormData = require('form-data');
        const formData = new FormData();
        const isWebM = this.detectWebMFormat(audioData);

        formData.append('file', audioData, {
          filename: isWebM ? 'audio.webm' : 'audio.mp3',
          contentType: isWebM ? 'audio/webm' : 'audio/mp3',
        });

        const response = await axios.post(`${this.huggingFaceBaseUrl}${model}`, formData, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        const transcription = response.data.text || response.data.generated_text || '';
        if (transcription) {
          console.log(`Successfully transcribed with model: ${model}`);
          return transcription;
        }
      } catch (error: any) {
        if (error.response && error.response.status === 402) {
          console.warn(`Payment required for model ${model}, trying next fallback...`);
        } else {
          console.error(`Error processing audio with model ${model}: ${error.message || 'Unknown error'}`);
        }
      }
    }

    // tried all Hungging Face models, try OpenAI as a last resort
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey || openaiApiKey === '123') {
        console.warn('OpenAI API key not available or is a placeholder');
        return '[OpenAI transcription unavailable - API key not configured]';
      }

      console.log('Attempting to transcribe with OpenAI Whisper API');

      if (!audioData || audioData.length === 0) {
        console.error('OpenAI transcription failed: Empty audio data');
        return '[Empty audio data]';
      }

      const audioSizeMB = audioData.length / (1024 * 1024);
      if (audioSizeMB > 25) {
        console.error(`OpenAI transcription failed: Audio file too large (${audioSizeMB.toFixed(2)}MB > 25MB limit)`);
        return '[Audio file too large for transcription]';
      }

      const FormData = require('form-data');
      const formData = new FormData();
      const isWebM = this.detectWebMFormat(audioData);

      formData.append('file', audioData, {
        filename: isWebM ? 'audio.webm' : 'audio.mp3',
        contentType: isWebM ? 'audio/webm' : 'audio/mp3',
      });

      formData.append('model', 'whisper-1');
      formData.append('response_format', 'json');

      formData.append('language', 'en'); // language
      formData.append('temperature', '0.0'); // for more deterministic results

      console.log('OpenAI Whisper API request details:', {
        url: 'https://api.openai.com/v1/audio/transcriptions',
        fileSize: `${audioSizeMB.toFixed(2)}MB`,
        model: 'whisper-1',
        parameters: { response_format: 'json', language: 'en', temperature: '0.0' },
      });

      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30s
      });

      if (response.data && response.data.text) {
        console.log('Successfully transcribed with OpenAI Whisper API');
        return response.data.text;
      } else {
        console.warn('OpenAI returned unexpected response format:', JSON.stringify(response.data).substring(0, 200));
        return '[Unexpected response format from OpenAI]';
      }
    } catch (openaiError: any) {
      if (openaiError.response) {
        const status = openaiError.response.status;
        const data = openaiError.response.data;

        const errorMessage = data?.error?.message || JSON.stringify(data).substring(0, 200) || 'Unknown error';

        console.error(`OpenAI transcription failed (Status ${status}): ${errorMessage}`);

        if (status === 400) {
          return '[OpenAI transcription failed: Bad request - The audio file may be corrupted or in an unsupported format]';
        } else if (status === 401) {
          return '[OpenAI transcription failed: Authentication error - Check API key]';
        } else if (status === 429) {
          return '[OpenAI transcription failed: Rate limit exceeded]';
        } else {
          return `[OpenAI transcription failed: ${errorMessage}]`;
        }
      } else if (openaiError.request) {
        console.error('OpenAI transcription failed: No response received (timeout or network issue)');
        return '[OpenAI transcription failed: No response received]';
      } else {
        console.error('OpenAI transcription failed:', openaiError.message || 'Unknown error');
        return '[OpenAI transcription failed: Request setup error]';
      }
    }
  }

  private async callHuggingFaceAPI(prompt: string, model: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.huggingFaceBaseUrl}${model}`,
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
      throw error;
    }
  }

  // for questions that have images
  private async evaluateWithMultimodalModel(
    answer: string,
    questionNumber: number,
    questionText: string,
    passage?: string,
    imageBuffers?: Buffer[],
    isSpoken: boolean = false,
    questionAudio?: string
  ): Promise<string> {
    // For questions 1 and 2
    const isReadAloudQuestion = questionNumber === 1 || questionNumber === 2;
    let messageContent: any[] = [];

    try {
      if (!this.openaiApiKey || this.openaiApiKey === '123') {
        console.warn('OpenAI API key not available or is a placeholder');
        return this.generateFallbackMultimodalResponse(answer, questionNumber, isSpoken);
      }
      const content: any[] = [];

      content.push({
        type: 'text',
        text: this.createMultimodalSystemPrompt(isSpoken),
      });

      let questionContext = `You are evaluating a ${isSpoken ? 'speaking' : 'writing'} response for TOEIC question #${questionNumber}.\n\n`;
      questionContext += `Question: ${questionText}\n`;

      if (passage) {
        questionContext += `Context: ${passage}\n`;
      }

      if (questionAudio) {
        questionContext += `This question includes audio instructions that the test-taker listened to.\n`;
      }

      content.push({
        type: 'text',
        text: questionContext,
      });

      if (imageBuffers && imageBuffers.length > 0) {
        for (const imageBuffer of imageBuffers) {
          const base64Image = imageBuffer.toString('base64');
          content.push({
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          });
        }

        content.push({
          type: 'text',
          text: 'The above image(s) were shown to the test-taker as part of the question.',
        });
      }

      content.push({
        type: 'text',
        text: `Test-taker's ${isSpoken ? 'transcribed speaking' : 'writing'} response:\n"${answer}"\n\nPlease evaluate this response based on TOEIC criteria.`,
      });

      if (isReadAloudQuestion) {
        content.push({
          type: 'text',
          text: this.createReadAloudEvaluationInstructions(),
        });
      } else {
        content.push({
          type: 'text',
          text: this.createMultimodalEvaluationInstructions(isSpoken),
        });
      }

      console.log(`Sending multimodal evaluation request to OpenAI for question ${questionNumber}`);
      console.log(`Using model: ${this.multimodalModel}`);
      console.log(`API endpoint: ${this.openaiBaseUrl}chat/completions`);

      const requestBody = {
        model: this.multimodalModel,
        messages: [
          {
            role: 'user',
            content: content,
          },
        ],
        max_tokens: 1000,
        temperature: 0.2,
      };

      console.log(`Request body (content items): ${content.length} items`);

      messageContent = content;

      const response = await axios.post(`${this.openaiBaseUrl}chat/completions`, requestBody, {
        headers: {
          Authorization: `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.choices && response.data.choices[0]) {
        console.log(`Successfully received multimodal evaluation for question ${questionNumber}`);
        return response.data.choices[0].message.content;
      } else {
        console.warn('OpenAI API returned unexpected response format');
        return this.generateFallbackMultimodalResponse(answer, questionNumber, isSpoken);
      }
    } catch (error: any) {
      console.error(`Error with multimodal evaluation for question ${questionNumber}:`);

      if (error.response) {
        console.error(`Status: ${error.response.status}`);
        console.error(`Status Text: ${error.response.statusText}`);
        console.error(`Response Data:`, JSON.stringify(error.response.data, null, 2));

        if (error.response.status === 404) {
          console.error(`Model '${this.multimodalModel}' not found. Trying fallback models...`);

          // Try fallback models
          const fallbackModels = ['gpt-4o-mini', 'gpt-4-turbo', 'gpt-4'];
          for (const fallbackModel of fallbackModels) {
            if (fallbackModel !== this.multimodalModel) {
              try {
                console.log(`Trying fallback multimodal model: ${fallbackModel}`);

                const fallbackRequestBody = {
                  model: fallbackModel,
                  messages: [
                    {
                      role: 'user',
                      content: messageContent,
                    },
                  ],
                  max_tokens: 1000,
                  temperature: 0.2,
                };

                const fallbackResponse = await axios.post(
                  `${this.openaiBaseUrl}chat/completions`,
                  fallbackRequestBody,
                  {
                    headers: {
                      Authorization: `Bearer ${this.openaiApiKey}`,
                      'Content-Type': 'application/json',
                    },
                  }
                );

                if (fallbackResponse.data && fallbackResponse.data.choices && fallbackResponse.data.choices[0]) {
                  console.log(`Successfully received multimodal evaluation using fallback model: ${fallbackModel}`);
                  return fallbackResponse.data.choices[0].message.content;
                }
              } catch (fallbackError: any) {
                console.error(
                  `Fallback model ${fallbackModel} also failed:`,
                  fallbackError.response?.status || fallbackError.message
                );
              }
            }
          }
        } else if (error.response.status === 401) {
          console.error('Authentication failed. Check your OpenAI API key.');
        } else if (error.response.status === 429) {
          console.error('Rate limit exceeded. Please try again later.');
        }
      } else if (error.request) {
        console.error('No response received from OpenAI API');
        console.error('Request details:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

      return this.generateFallbackMultimodalResponse(answer, questionNumber, isSpoken);
    }
  }

  private createMultimodalSystemPrompt(isSpoken: boolean): string {
    if (isSpoken) {
      return `You are an expert TOEIC Speaking evaluator with years of experience. You will evaluate a transcribed speaking response for a TOEIC test question that may include images.`;
    } else {
      return `You are an expert TOEIC Writing evaluator with years of experience. You will evaluate a written response for a TOEIC test question that may include images.`;
    }
  }
  private createMultimodalEvaluationInstructions(isSpoken: boolean): string {
    let instructions = `Please provide your evaluation in the following format:\n\n`;

    if (isSpoken) {
      instructions += `EVALUATION: [Provide a detailed evaluation (100-150 words) focusing on pronunciation, fluency, grammar, vocabulary, content completeness, coherence, and how well the response addresses any images shown.]\n\n`;
    } else {
      instructions += `EVALUATION: [Provide a detailed evaluation (100-150 words) focusing on grammar, vocabulary, organization, development, task completion, mechanics, and how well the response addresses any images shown.]\n\n`;
    }

    instructions += `SAMPLE_ANSWER: [Provide a sample improved response that would score higher.]\n\n`;
    instructions += `SCORE: [Provide a single number between 0-5, where:
0 = No response or incomprehensible
1 = Demonstrates minimal proficiency
2 = Demonstrates limited proficiency
3 = Demonstrates fair proficiency
4 = Demonstrates good proficiency
5 = Demonstrates excellent proficiency]`;

    return instructions;
  }

  // for questions 1 and 2
  private createReadAloudEvaluationInstructions(): string {
    return `Please provide your evaluation in the following format:\n\n
EVALUATION: [Provide a detailed evaluation (100-150 words) focusing on pronunciation, intonation, stress, rhythm, and clarity. Evaluate how accurately the test-taker read the text without adding or omitting words.]\n\n
SAMPLE_ANSWER: [DO NOT PROVIDE A SAMPLE ANSWER. The sample answer for read-aloud questions is always the original text that was provided to the test-taker.]\n\n
SCORE: [Provide a single number between 0-5, where:
0 = No response or incomprehensible
1 = Demonstrates minimal proficiency (major pronunciation issues, many words mispronounced)
2 = Demonstrates limited proficiency (frequent errors, difficult to understand)
3 = Demonstrates fair proficiency (some errors but generally understandable)
4 = Demonstrates good proficiency (minor errors, good pronunciation)
5 = Demonstrates excellent proficiency (near-native pronunciation, very few errors)]`;
  }

  // fallback for multimodal failed cases
  private generateFallbackMultimodalResponse(_answer: string, questionNumber: number, isSpoken: boolean): string {
    return `EVALUATION: Due to technical limitations, we couldn't provide a detailed evaluation of your ${isSpoken ? 'speaking' : 'writing'} response for question ${questionNumber}. Your response has been recorded and will be evaluated by our team.

SAMPLE_ANSWER: A comprehensive sample answer would typically address all aspects of the question, including any images shown, with clear organization, appropriate vocabulary, and grammatical accuracy.

SCORE: 3`;
  }

  private async callOpenAIAPI(prompt: string): Promise<string> {
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey || openaiApiKey === '123') {
        console.log('OpenAI API key not available or is a placeholder');
        throw new Error('OpenAI API key not properly configured');
      }

      console.log('Calling OpenAI API as fallback...');
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are an expert TOEIC evaluator.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content || '';
    } catch (error: any) {
      console.error('Error calling OpenAI API:', error.message);
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

    while (retries < maxRetries) {
      try {
        const response = await this.callHuggingFaceAPI(prompt, model);
        this.cacheResponse(cacheKey, response);
        return response;
      } catch (error: any) {
        retries++;
        console.error('Error with primary model:', error.message || 'Unknown error');

        if (retries >= maxRetries && model === this.llmModel) {
          console.log(
            `Trying fallback model ${this.fallbackLlmModel} after ${maxRetries} failed attempts with primary model`
          );

          try {
            const fallbackResponse = await this.callHuggingFaceAPI(prompt, this.fallbackLlmModel);
            this.cacheResponse(cacheKey, fallbackResponse);
            return fallbackResponse;
          } catch (fallbackError: any) {
            console.error('Fallback model also failed:', fallbackError.message || 'Unknown error');

            try {
              console.log('Both Hugging Face models failed, trying OpenAI...');
              const openaiResponse = await this.callOpenAIAPI(prompt);
              this.cacheResponse(cacheKey, openaiResponse);
              return openaiResponse;
            } catch (openaiError: any) {
              console.error('OpenAI fallback also failed:', openaiError.message || 'Unknown error');
            }
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

  private createReadAloudEvaluationPrompt(answer: string, questionNumber: number, questionText: string): string {
    return `You are an expert TOEIC Speaking evaluator with years of experience.
You will evaluate the following TOEIC Speaking response for question #${questionNumber}, which is a READ ALOUD question.

Original text that the test-taker was asked to read aloud:
"${questionText}"

This is a transcription of the test-taker's spoken response:
"${answer}"

Please evaluate this response based on TOEIC Speaking criteria for read-aloud tasks and provide:
1. A detailed evaluation (100-150 words) focusing on:
   - Pronunciation: clarity, stress, intonation patterns
   - Rhythm and pacing: appropriate speed and natural flow
   - Accuracy: reading the text as written without adding or omitting words
   - Clarity: overall intelligibility of the speech

2. DO NOT provide a sample answer - for read-aloud questions, the sample answer is always the original text.

3. A score on a scale of 0-5, where:
   0 = No response or incomprehensible
   1 = Demonstrates minimal proficiency (major pronunciation issues, many words mispronounced)
   2 = Demonstrates limited proficiency (frequent errors, difficult to understand)
   3 = Demonstrates fair proficiency (some errors but generally understandable)
   4 = Demonstrates good proficiency (minor errors, good pronunciation)
   5 = Demonstrates excellent proficiency (near-native pronunciation, very few errors)

Format your response exactly as follows:
EVALUATION: [Your detailed evaluation here]
SAMPLE_ANSWER: ${questionText}
SCORE: [Single number between 0-5]`;
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
      console.log(`Response preview: ${response.substring(0, 100)}...`);

      const evaluationMatch = response.match(/EVALUATION:(.*?)(?=SAMPLE_ANSWER:|$)/s);
      const evaluation = evaluationMatch ? evaluationMatch[1].trim() : '';

      const sampleMatch = response.match(/SAMPLE_ANSWER:(.*?)(?=SCORE:|$)/s);
      const sampleAnswer = sampleMatch ? sampleMatch[1].trim() : '';

      const scoreMatch = response.match(/SCORE:\s*(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

      if (!evaluation) {
        const possibleEvaluation = this.extractEvaluationContent(response);
        if (possibleEvaluation) {
          return {
            evaluation: possibleEvaluation.evaluation,
            sampleAnswer: possibleEvaluation.sampleAnswer,
            score: possibleEvaluation.score,
          };
        }
      }

      return { evaluation, sampleAnswer, score };
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      return { evaluation: 'Error evaluating response', sampleAnswer: '', score: 0 };
    }
  }

  private detectWebMFormat(audioData: Buffer): boolean {
    if (audioData.length < 4) {
      return false;
    }

    if (audioData[0] === 0x1a && audioData[1] === 0x45 && audioData[2] === 0xdf && audioData[3] === 0xa3) {
      console.log('Detected WebM format audio');
      return true;
    }

    const headerStr = Buffer.from(audioData.buffer, audioData.byteOffset, Math.min(50, audioData.length)).toString(
      'hex'
    );
    if (headerStr.includes('1a45dfa3') || headerStr.includes('webm')) {
      console.log('Detected WebM format audio (alternative signature)');
      return true;
    }

    console.log(
      'Audio format header bytes:',
      Buffer.from(audioData.buffer, audioData.byteOffset, Math.min(16, audioData.length)).toString('hex')
    );

    return false;
  }

  private extractEvaluationContent(text: string): { evaluation: string; sampleAnswer: string; score: number } | null {
    try {
      let evaluation = '';
      let sampleAnswer = '';
      let score = 0;

      const evaluationKeywords = ['pronunciation', 'fluency', 'grammar', 'vocabulary', 'coherence', 'organization'];
      const sampleKeywords = ['sample', 'example', 'better response', 'improved answer'];

      const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0);

      for (const paragraph of paragraphs) {
        const lowerPara = paragraph.toLowerCase();
        const keywordCount = evaluationKeywords.filter((kw) => lowerPara.includes(kw)).length;

        if (keywordCount >= 2 && paragraph.length > 50) {
          evaluation = paragraph.trim();
          break;
        }
      }

      for (const paragraph of paragraphs) {
        const lowerPara = paragraph.toLowerCase();
        const hasSampleKeyword = sampleKeywords.some((kw) => lowerPara.includes(kw));

        if ((hasSampleKeyword || lowerPara.includes('answer')) && paragraph.length > 30 && paragraph !== evaluation) {
          sampleAnswer = paragraph.trim();
          break;
        }
      }

      if (!sampleAnswer) {
        const nonEvalParagraphs = paragraphs.filter((p) => p !== evaluation);
        if (nonEvalParagraphs.length > 0) {
          sampleAnswer = nonEvalParagraphs.reduce((a, b) => (a.length > b.length ? a : b)).trim();
        }
      }

      const scoreRegex = /(\d)[\/\s]*5|score:?\s*(\d)|rating:?\s*(\d)|grade:?\s*(\d)/i;
      const scoreMatch = text.match(scoreRegex);
      if (scoreMatch) {
        const extractedScore = parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3] || scoreMatch[4], 10);
        if (extractedScore >= 0 && extractedScore <= 5) {
          score = extractedScore;
        }
      }

      if (score === 0) {
        const positiveWords = ['excellent', 'good', 'great', 'well', 'clear', 'fluent', 'appropriate'];
        const negativeWords = ['poor', 'limited', 'incorrect', 'error', 'mistake', 'unclear', 'difficult'];

        const positiveCount = positiveWords.filter((word) => text.toLowerCase().includes(word)).length;
        const negativeCount = negativeWords.filter((word) => text.toLowerCase().includes(word)).length;

        if (positiveCount > negativeCount * 2) {
          score = 4;
        } else if (positiveCount > negativeCount) {
          score = 3;
        } else if (negativeCount > positiveCount * 2) {
          score = 1;
        } else {
          score = 2;
        }
      }

      if (evaluation || sampleAnswer) {
        return { evaluation, sampleAnswer, score };
      }

      return null;
    } catch (error) {
      console.error('Error in flexible parsing:', error);
      return null;
    }
  }
}

const huggingFaceServiceInstance = new HuggingFaceService();
export default huggingFaceServiceInstance;

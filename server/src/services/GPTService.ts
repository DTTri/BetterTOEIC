import { ChatMessage, GPTResponse } from '~/models/Chat';
import OpenAI from 'openai';
import redisServiceInstance from './RedisService';

class GPTService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  async generateResponse(userId: string, message: string, languageCode: string, context: ChatMessage[] = []): Promise<GPTResponse> {
    try {
      const messages = [
        { role: 'system', content: 'You are an English teacher helping students prepare for the TOEIC exam. Please answer the following question briefly and clearly in no more than 150 words. Focus only on what\'s relevant and avoid unnecessary explanations. Use simple vocabulary and avoid advanced grammar structures.' },
      ];

      if (context && context.length > 0) {
        context.forEach(msg => {
          console.log('context: ' + msg.content);
          messages.push({
            role: msg.role === 'bot' ? 'assistant' : 'user',
            content: msg.content
          });
        });
      }

      messages.push({ role: 'user', content: message + '. Answer in ' + `${languageCode == 'en' ? 'English' : 'Vietnamese'} ` });
      await redisServiceInstance.addMessageToContext(userId, { role: 'user', content: message, created_at: new Date().toISOString() });
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages as any[],
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
      if(content){
        await redisServiceInstance.addMessageToContext(userId, { role: 'bot', content: content, created_at: new Date().toISOString() });
      }

      return { content };
    } catch (error: any) {
      console.error('Error generating GPT response:', error);
      return {
        content: 'Sorry, an error occurred while processing your request.',
        error: error.message || 'UNKNOWN_ERROR',
      };
    }
  }
}

export const gptService = new GPTService();

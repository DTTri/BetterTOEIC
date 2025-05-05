import OpenAI from 'openai';
import { GPTResponse } from '~/models/Chat';

class GPTService {
  private openai: OpenAI;
  private readonly MAX_TOKENS = 150; // Limit response length

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  async generateResponse(message: string): Promise<GPTResponse> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an English teacher helping students prepare for the TOEIC exam. Please answer the following question briefly and clearly in no more than 150 words. Focus only on what's relevant and avoid unnecessary explanations. Use simple vocabulary and avoid advanced grammar structures."
          },
          { role: "user", content: message }
        ],
        model: "gpt-4o-mini",
        max_tokens: this.MAX_TOKENS,
        temperature: 0.7, // Add some variability but keep responses focused
        presence_penalty: 0.6, // Encourage diverse responses
        frequency_penalty: 0.6, // Discourage repetition
      });

      const content = completion.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response generated');
      }

      return { content };
    } catch (error: any) {     
      return {
        content: 'Sorry, an error occurred while processing your request.',
        error: error.message || 'UNKNOWN_ERROR'
      };
    }
  }
}

export const gptService = new GPTService();

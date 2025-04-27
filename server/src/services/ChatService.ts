import { dialogflowService } from './DialogflowService';
import { gptService } from './GPTService';
import { ChatHistory, ChatMessage } from '~/models/Chat';
import { collections } from '../config/connectDB';
import { ObjectId } from 'mongodb';

class ChatService {
  async handleMessage(message: string, languageCode: string, userId?: string): Promise<ChatMessage> {
    try {
      // Thử với Dialogflow trước
      const dialogflowResponse = await dialogflowService.detectIntent(
        userId || 'guest',
        message,
        languageCode
      );

      let content = '';
    
      if (dialogflowResponse.matched) {
        const params = dialogflowResponse.parameters;
        if (params?.url) {
          content = `${params.responseText} ${params.url}`;
        } else {
          content = dialogflowResponse.response;
        }
      }
      else {
        const gptResponse = await gptService.generateResponse(message);
        content = gptResponse.content;
      }

      const responseMessage: ChatMessage = {
        role: 'bot',
        content: content || '',
        created_at: new Date().toISOString(),
      };

      if(userId) {
        await this.saveConversation(userId, message, content);
      }

      return responseMessage;
    } catch (error) {
      console.error('Error in handleMessage:', error);
      const errorMessage = 'Sorry, an error occurred. Please try again later.';
      
      return {
        role: 'bot',
        content: errorMessage,
        created_at: new Date().toISOString(),
      };
    }
  }

  private async saveConversation(userId: string, userMessage: string, botResponse: string) {
    try {
      const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });
      if (conversation) {
        conversation.chats.push({
          role: 'user',
          content: userMessage,
          created_at: new Date().toISOString(),
        });
        conversation.chats.push({
          role: 'bot',
          content: botResponse,
          created_at: new Date().toISOString(),
        });
        await collections.conversations?.updateOne(
          { userId: new ObjectId(userId) },
          { $set: conversation }
        );
      }
      else {
        await collections.conversations?.insertOne({
          userId: new ObjectId(userId),
          chats: [
            {
              role: 'user',
              content: userMessage,
              created_at: new Date().toISOString(),
            },
            {
              role: 'bot',
              content: botResponse,
              created_at: new Date().toISOString(),
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  async getChatHistory(userId: string): Promise<ChatHistory | null> {
    const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });
    if (conversation) {
      return {
        userId: conversation.userId.toString(),
        chats: conversation.chats,
      } as ChatHistory;
    }
    else {
      return {
        userId: userId,
        chats: [],
      } as ChatHistory;
    }
  }
}

export const chatService = new ChatService();


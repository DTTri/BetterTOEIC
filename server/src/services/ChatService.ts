import { dialogflowService } from './DialogflowService';
import { gptService } from './GPTService';
import { ChatHistory, ChatMessage } from '~/models/Chat';
import { collections } from '../config/connectDB';
import { ObjectId } from 'mongodb';

class ChatService {
  async handleMessage(message: string, languageCode: string, userId?: string): Promise<ChatMessage> {
    try {
      const dialogflowResponse = await dialogflowService.detectIntent(
        userId || 'guest',
        message,
        languageCode
      );

      let content = '';

      console.log("dialogflowResponse" + dialogflowResponse.parameters);
    
      if (dialogflowResponse.matched) {
        const params = dialogflowResponse.parameters;
        const fullResponse = dialogflowResponse.response + ' ' || '';
        content = fullResponse + params?.responseText + (params?.url ? ` ${params.url}` : '');
      }
      else {
        const gptResponse = await gptService.generateResponse(message);
        content = gptResponse.content;
      }

      console.log("content" + content);

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

  async getChatHistory(userId: string, page: number = 1, limit: number = 10): Promise<ChatHistory | null> {
    try {
      const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });
      
      if (conversation) {
        const totalMessages = conversation.chats.length;
        const totalPages = Math.ceil(totalMessages / limit);
        
        // Sort chats by created_at in descending order
        const sortedChats = [...conversation.chats].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        const paginatedChats = sortedChats.slice((page - 1) * limit, page * limit);
        
        const orderedChats = page === 1 ? paginatedChats.reverse() : paginatedChats;
        
        return {
          userId: conversation.userId.toString(),
          chats: orderedChats,
          pagination: {
            currentPage: page,
            totalPages,
            totalMessages,
            hasMore: page < totalPages
          }
        } as ChatHistory;
      }
      else {
        return {
          userId: userId,
          chats: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalMessages: 0,
            hasMore: false
          }
        } as ChatHistory;
      }
    } catch (error) {
      console.error('Error getting chat history:', error);
      return null;
    }
  }
}

export const chatService = new ChatService();



import { dialogflowService } from './DialogflowService';
import { gptService } from './GPTService';
import { ChatHistory, ChatMessage } from '~/models/Chat';
import { collections } from '../config/connectDB';
import { ObjectId } from 'mongodb';
import redisServiceInstance from './RedisService';

const MAX_CHAT_MESSAGES = 200;
const REDIS_CONTEXT_SIZE = 5; // Number of recent messages to keep as context

class ChatService {
  async handleMessage(message: string, languageCode: string, userId?: string): Promise<ChatMessage> {
    try {
      const dialogflowResponse = await dialogflowService.detectIntent(userId || 'guest', message, languageCode);

      let content = '';
      console.log('dialogflowResponse' + dialogflowResponse.matched);

      if (dialogflowResponse.matched) {
        const params = dialogflowResponse.parameters;
        const fullResponse = dialogflowResponse.response + ' ' || '';
        content = fullResponse + params?.responseText + (params?.url ? ` ${params.url}` : '');
      } else if(userId) {
        const recentContext = userId ? await redisServiceInstance.getRecentChatContext(userId, REDIS_CONTEXT_SIZE) : [];
        
        const gptResponse = await gptService.generateResponse(userId, message, languageCode, recentContext || []);
        content = gptResponse.content;
      }
      else {
        content = 'I am sorry, You must login to use this feature.';
      }

      console.log('content' + content);

      const responseMessage: ChatMessage = {
        role: 'bot',
        content: content || '',
        created_at: new Date().toISOString(),
      };

      if (userId) {
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

  private async storeMessageInRedisContext(userId: string, role: string, content: string): Promise<void> {
    try {
      const message = {
        role,
        content,
        created_at: new Date().toISOString(),
      };
      await redisServiceInstance.addMessageToContext(userId, message as ChatMessage);
    } catch (error) {
      console.error('Error storing message in Redis context:', error);
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
        await collections.conversations?.updateOne({ userId: new ObjectId(userId) }, { $set: conversation });
      } else {
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
        const sortedChats = [...conversation.chats].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const totalMessages = sortedChats.length;
        const totalPages = Math.ceil(totalMessages / limit);

        let startIndex, endIndex;

        if (page === 1) {
          startIndex = Math.max(0, totalMessages - limit);
          endIndex = totalMessages;
        } else {
          endIndex = Math.max(0, totalMessages - (page - 1) * limit);
          startIndex = Math.max(0, endIndex - limit);
        }

        const paginatedChats = sortedChats.slice(startIndex, endIndex);

        return {
          userId: conversation.userId.toString(),
          chats: paginatedChats,
          pagination: {
            currentPage: page,
            totalPages,
            totalMessages,
            hasMore: page < totalPages,
          },
        } as ChatHistory;
      } else {
        return {
          userId: userId,
          chats: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalMessages: 0,
            hasMore: false,
          },
        } as ChatHistory;
      }
    } catch (error) {
      console.error('Error getting chat history:', error);
      return null;
    }
  }
}

export const chatService = new ChatService();

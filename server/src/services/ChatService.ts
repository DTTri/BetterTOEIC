import { dialogflowService } from './DialogflowService';
import { gptService } from './GPTService';
import { ChatHistory, ChatHistoryResponse, ChatMessage } from '~/models/Chat';
import { collections } from '../config/connectDB';
import { ObjectId } from 'mongodb';
import redisServiceInstance from './RedisService';
import s3ServiceInstance from './S3Service';

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

  // private async storeMessageInRedisContext(userId: string, role: string, content: string): Promise<void> {
  //   try {
  //     const message = {
  //       role,
  //       content,
  //       created_at: new Date().toISOString(),
  //     };
  //     await redisServiceInstance.addMessageToContext(userId, message as ChatMessage);
  //   } catch (error) {
  //     console.error('Error storing message in Redis context:', error);
  //   }
  // }

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
        
        // Cập nhật conversation trong MongoDB
        await collections.conversations?.updateOne(
          { userId: new ObjectId(userId) }, 
          { 
            $set: { 
              chats: conversation.chats,
              updated_at: new Date().toISOString() 
            } 
          }
        );
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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          archives: []
        });
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  private sortedChats(conversation: ChatHistory): ChatMessage[] {
    return [...conversation.chats].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }

  async getChatHistory(userId: string, page: number = 1, limit: number = 10): Promise<ChatHistory | null> {
    try {
      const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });

      if(!conversation){
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
        } as ChatHistoryResponse;
    } catch (error) {
      console.error('Error getting chat history:', error);
      return null;
    }
    //Idea: get chat from mongodb and get older chat from s3 archive
    // try {
    //   const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });

    //   if (!conversation) {
    //     return {
    //       userId: userId,
    //       chats: [],
    //       pagination: {
    //         currentPage: 1,
    //         totalPages: 0,
    //         totalMessages: 0,
    //         hasMore: false,
    //       },
    //       hasArchivedMessages: false,
    //     } as ChatHistory;
    //   }

    //   const sortedChats = [...conversation.chats].sort(
    //     (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    //   );

    //   const currentMessagesCount = sortedChats.length;
    //   const hasArchives = conversation.archives && conversation.archives.length > 0;
    //   const archivedMessagesCount = hasArchives
    //     ? conversation.archives.reduce((sum: any, archive: any) => sum + archive.messageCount, 0)
    //     : 0;
    //   const totalMessages = currentMessagesCount + (includeArchived ? archivedMessagesCount : 0);
    //   const totalPages = Math.ceil(totalMessages / limit);

    //   let startIndex, endIndex;

    //   const currentPageStartPosition = (page - 1) * limit;
    //   const isCurrentPageInMongoDB = currentPageStartPosition >= (includeArchived ? archivedMessagesCount : 0);

    //   if (!includeArchived || !hasArchives || isCurrentPageInMongoDB) {
    //     // If the current page is in MongoDB
    //     if (page === 1) {
    //       startIndex = Math.max(0, currentMessagesCount - limit);
    //       endIndex = currentMessagesCount;
    //     } else if (isCurrentPageInMongoDB) {
    //       const adjustedPage = includeArchived ? page - Math.ceil(archivedMessagesCount / limit) : page;
    //       endIndex = Math.max(0, currentMessagesCount - (adjustedPage - 1) * limit);
    //       startIndex = Math.max(0, endIndex - limit);
    //     } else {
    //       endIndex = Math.max(0, currentMessagesCount - (page - 1) * limit);
    //       startIndex = Math.max(0, endIndex - limit);
    //     }

    //     const paginatedChats = sortedChats.slice(startIndex, endIndex);

    //     return {
    //       userId: conversation.userId.toString(),
    //       chats: paginatedChats,
    //       pagination: {
    //         currentPage: page,
    //         totalPages,
    //         totalMessages,
    //         hasMore: page < totalPages,
    //       },
    //       hasArchivedMessages: hasArchives,
    //     } as ChatHistory;
    //   }

    //   const sortedArchives = [...conversation.archives].sort(
    //     (a, b) => new Date(a.firstMessageDate).getTime() - new Date(b.firstMessageDate).getTime()
    //   );

    //   const archiveStartPosition = currentPageStartPosition;
    //   const archiveEndPosition = Math.min(archiveStartPosition + limit, archivedMessagesCount);

    //   let currentPosition = 0;
    //   let targetArchive = null;
    //   let archiveStartIndex = 0;

    //   for (const archive of sortedArchives) {
    //     const nextPosition = currentPosition + archive.messageCount;

    //     if (archiveStartPosition < nextPosition) {
    //       targetArchive = archive;
    //       archiveStartIndex = archiveStartPosition - currentPosition;
    //       break;
    //     }

    //     currentPosition = nextPosition;
    //   }

    //   if (!targetArchive) {
    //     return this.getChatHistory(userId, page, limit, false);
    //   }

    //   const archiveData = await s3ServiceInstance.getChatArchive(targetArchive.archiveKey);

    //   if (!archiveData || !archiveData.messages) {
    //     return this.getChatHistory(userId, page, limit, false);
    //   }

    //   const archiveEndIndex = Math.min(archiveStartIndex + limit, targetArchive.messageCount);
    //   const messagesFromArchive = archiveData.messages.slice(archiveStartIndex, archiveEndIndex);

    //   let resultMessages = [...messagesFromArchive];
    //   let remainingCount = limit - messagesFromArchive.length;

    //   if (remainingCount > 0) {
    //     let nextArchiveIndex = sortedArchives.indexOf(targetArchive) + 1;

    //     while (remainingCount > 0 && nextArchiveIndex < sortedArchives.length) {
    //       const nextArchive = sortedArchives[nextArchiveIndex];
    //       try {
    //         const nextArchiveData = await s3ServiceInstance.getChatArchive(nextArchive.archiveKey);

    //         if (nextArchiveData && nextArchiveData.messages) {
    //           const messagesNeeded = Math.min(remainingCount, nextArchive.messageCount);
    //           const nextMessages = nextArchiveData.messages.slice(0, messagesNeeded);

    //           resultMessages = [...resultMessages, ...nextMessages];
    //           remainingCount -= nextMessages.length;
    //         }
    //       } catch (error) {
    //         console.error(`Error retrieving archive ${nextArchive.archiveId}:`, error);
    //       }

    //       nextArchiveIndex++;
    //     }

    //     if (remainingCount > 0) {
    //       const mongoMessages = sortedChats.slice(0, remainingCount);
    //       resultMessages = [...resultMessages, ...mongoMessages];
    //     }
    //   }

    //   return {
    //     userId: conversation.userId.toString(),
    //     chats: resultMessages,
    //     pagination: {
    //       currentPage: page,
    //       totalPages,
    //       totalMessages,
    //       hasMore: page < totalPages,
    //     },
    //     hasArchivedMessages: true,
    //   } as ChatHistory;
    // } catch (error) {
    //   console.error('Error getting chat history:', error);
    //   return null;
    // }
  }
}

export const chatService = new ChatService();



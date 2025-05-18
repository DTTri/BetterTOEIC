import { dialogflowService } from './DialogflowService';
import { gptService } from './GPTService';
import { ChatArchive, ChatHistory, ChatHistoryResponse, ChatMessage } from '~/models/Chat';
import { collections } from '../config/connectDB';
import { ObjectId } from 'mongodb';
import redisServiceInstance from './RedisService';
import s3ServiceInstance from './S3Service';
import { v4 as uuidv4 } from 'uuid';

const REDIS_CONTEXT_SIZE = 5; // Number of recent messages to keep as context
const MAX_CHAT_MESSAGES = 200; //Number of messages to keep in MongoDB

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

        if(conversation.chats.length % 100 == 0 && conversation.chats.length > MAX_CHAT_MESSAGES){
          const messagesToArchiveCount = conversation.chats.length - MAX_CHAT_MESSAGES;
          const messagesToArchive = conversation.chats.slice(0, messagesToArchiveCount);
          const archiveId = uuidv4();
          const archiveKey = await s3ServiceInstance.uploadChatArchive(userId, archiveId, messagesToArchive);
          
          if (!conversation.archives) {
            conversation.archives = [];
          }

          conversation.archives.push({
            archiveId: archiveId,
            archiveKey: archiveKey,
            messageCount: messagesToArchive.length,
            firstMessageDate: messagesToArchive[0].created_at,
            lastMessageDate: messagesToArchive[messagesToArchive.length - 1].created_at,
            createdAt: new Date().toISOString()
          } as ChatArchive);

          const updatedChats = conversation.chats.slice(messagesToArchiveCount);
          conversation.chats = updatedChats;
        }
        
        // Update the conversation in the database
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
    // try {
    //   const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });

    //   if(!conversation){
    //     return {
    //       userId: userId,
    //       chats: [],
    //       pagination: {
    //         currentPage: 1,
    //         totalPages: 0,
    //         totalMessages: 0,
    //         hasMore: false,
    //       },
    //     } as ChatHistory;
    //   }
    //     const sortedChats = [...conversation.chats].sort(
    //       (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    //     );

    //     const totalMessages = sortedChats.length;
    //     const totalPages = Math.ceil(totalMessages / limit);

    //     let startIndex, endIndex;

    //     if (page === 1) {
    //       startIndex = Math.max(0, totalMessages - limit);
    //       endIndex = totalMessages;
    //     } else {
    //       endIndex = Math.max(0, totalMessages - (page - 1) * limit);
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
    //     } as ChatHistoryResponse;
    // } catch (error) {
    //   console.error('Error getting chat history:', error);
    //   return null;
    // }

    //Idea: get chat from mongodb and get older chat from s3 archive
    try {
      const conversation = await collections.conversations?.findOne({ userId: new ObjectId(userId) });

      if (!conversation) {
        return {
          userId: userId,
          chats: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalMessages: 0,
            hasMore: false,
          },
        } as ChatHistoryResponse;
      }

      const sortedMongoChats = [...conversation.chats].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const currentMessagesCount = sortedMongoChats.length;
      const hasArchives = conversation.archives && conversation.archives.length > 0;
      const archivedMessagesCount = hasArchives
        ? conversation.archives.reduce((sum: any, archive: any) => sum + archive.messageCount, 0)
        : 0;
      const totalMessages = currentMessagesCount + archivedMessagesCount;
      const totalPages = totalMessages > 0 ? Math.ceil(totalMessages / limit) : 0;
      if(page < 1|| (page > totalPages && totalPages > 0) || totalMessages === 0){
        return {
          userId: conversation.userId.toString(),
          chats: [],
          pagination: {
            currentPage: page,
            totalPages,
            totalMessages,
            hasMore: false,
          },
        } as ChatHistoryResponse;
      }

      let messagesToSkipFromNewestEnd = (page - 1) * limit;
      let messagesToTakeForPage = limit;
      const resultMessages: ChatMessage[] = [];

      // Try fetching from MongoDB (newest portion)
      if (messagesToSkipFromNewestEnd < currentMessagesCount) {
        const takeFromMongo = Math.min(messagesToTakeForPage, currentMessagesCount - messagesToSkipFromNewestEnd);
        const mongoStartIndex = currentMessagesCount - messagesToSkipFromNewestEnd - takeFromMongo;
        const mongoEndIndex = currentMessagesCount - messagesToSkipFromNewestEnd;
        resultMessages.push(...sortedMongoChats.slice(mongoStartIndex, mongoEndIndex));
        messagesToTakeForPage -= takeFromMongo;
      }
      messagesToSkipFromNewestEnd = Math.max(0, messagesToSkipFromNewestEnd - currentMessagesCount);

      //If still need messages, fetch from S3 archives (from newest S3 archives to older ones)
      if (messagesToTakeForPage > 0 && hasArchives) {
        const sortedArchives = [...conversation.archives].sort(
          (a, b) => new Date(b.firstMessageDate).getTime() - new Date(a.firstMessageDate).getTime()
        ); // Sort S3 archives: newest first

        for (const archive of sortedArchives) {
          if (messagesToTakeForPage <= 0) break;

          if (messagesToSkipFromNewestEnd < archive.messageCount) {
            const takeFromThisArchive = Math.min(messagesToTakeForPage, archive.messageCount - messagesToSkipFromNewestEnd);
            try {
              const archiveData = await s3ServiceInstance.getChatArchive(archive.archiveKey);
              if (archiveData && archiveData.messages) {
                // Messages in archive are assumed to be oldest to newest
                const s3Messages = archiveData.messages;
                const s3StartIndex = archive.messageCount - messagesToSkipFromNewestEnd - takeFromThisArchive;
                const s3EndIndex = archive.messageCount - messagesToSkipFromNewestEnd;
                const fetchedS3 = s3Messages.slice(s3StartIndex, s3EndIndex);
                resultMessages.unshift(...fetchedS3); // Prepend S3 messages as they are older
                messagesToTakeForPage -= fetchedS3.length;
              } else {
                console.error(`Empty or invalid data in archive ${archive.archiveId}`);
              }
            } catch (error) {
              console.error(`Error retrieving archive ${archive.archiveId}:`, error);
              // Skip this archive and adjust skip count as if it was processed (or partially)
            }
            messagesToSkipFromNewestEnd = 0; // All skips within this archive are handled
          } else {
            messagesToSkipFromNewestEnd -= archive.messageCount;
          }
        }
      }

      return {
        userId: conversation.userId.toString(),
        chats: resultMessages,
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
  }
}

export const chatService = new ChatService();



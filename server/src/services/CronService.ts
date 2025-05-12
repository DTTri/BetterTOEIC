import cron from 'node-cron';
import { collections } from '../config/connectDB';
import s3ServiceInstance from './S3Service';
import { v4 as uuidv4 } from 'uuid';
import { ChatArchive } from '~/models/Chat';

const MAX_CHAT_MESSAGES = 200; // Số tin nhắn tối đa giữ trong MongoDB

class CronService {
  private isRunning: boolean = false;

  constructor() {
    // Run at 3am every day
    cron.schedule('0 3 * * *', () => {
      this.archiveOldChatMessages();
    });
    
    console.log('CronService initialized');
  }

  private async archiveOldChatMessages() {
    if (this.isRunning) return;
    
    try {
      this.isRunning = true;
      console.log('Starting scheduled chat archiving job');
      
      // Find all conversations that have more than MAX_CHAT_MESSAGES messages
      const conversations = await collections.conversations?.find({
         chats: { $exists: true, $not: { $size: { $lte: MAX_CHAT_MESSAGES } } }
      }).toArray();
      
      if (!conversations || conversations.length === 0) {
        console.log('No conversations marked for archiving');
        return;
      }
            
      for (const conversation of conversations) {
        try {
          const userId = conversation.userId.toString();
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
          
          await collections.conversations?.updateOne(
            { _id: conversation._id },
            { 
              $set: { 
                chats: updatedChats,
                archives: conversation.archives,
              } 
            }
          );
          
          console.log(`Successfully archived ${messagesToArchive.length} messages for user ${userId}`);
        } catch (error) {
          console.error(`Error archiving messages for user ${conversation.userId}:`, error);
          
          await collections.conversations?.updateOne(
            { _id: conversation._id },
            { $set: { needsArchiving: true } }
          );
        }
      }
      
      console.log('Completed scheduled chat archiving job');
    } catch (error) {
      console.error('Error in scheduled chat archiving job:', error);
    } finally {
      this.isRunning = false;
    }
  }
}

const cronService = new CronService();
export default cronService;
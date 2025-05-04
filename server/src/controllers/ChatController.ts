import { Request, Response } from 'express';
import { chatService } from '../services/ChatService';
import { collections } from '~/config/connectDB';
import { ObjectId } from 'mongodb';

class ChatController {
  async handleMessage(req: Request, res: Response): Promise<void> { 
    try {
      const userId = req.query.userId as string | undefined;
      const { message, languageCode } = req.body;
      
      const response = await chatService.handleMessage(
        message,
        languageCode || 'en',
        userId
      );

      res.json({
        EC: 0,
        EM: 'Success',
        DT: response,
      });
    }
    catch(error: any) {
      console.error('Chat controller error:', error);
      res.status(500).json({
        EC: 1,
        EM: error.message
      });
    }
  }

  async getChatHistory(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      if (!userId) {
        res.status(400).json({
          EC: 1,
          EM: 'User ID is required',
        });
        return;
      }

      const findUser = await collections.users?.findOne({ _id: new ObjectId(userId) });
      if(!findUser){
        res.status(400).json({
          EC: 1,
          EM: 'User not found',
        });
        return;
      }

      const history = await chatService.getChatHistory(userId, page, limit);

      res.json({
        EC: 0,
        EM: 'Success',
        DT: history,
      });
    } catch (error: any) {
      res.status(500).json({
        EC: 1,
        EM: error.message || 'Internal server error',
      });
    }
  }
}

export const chatControllerInstance = new ChatController(); 
import { vocabServiceInstance } from '~/services';
import { vocabMiddlewareInstance } from '~/middlewares';
import { VocabTopic, Vocab, VocabHistory, VocabsSaved } from '~/models';
import { CreateVocabTopicDTO, CompleteVocabDTO, SaveVocabDTO } from '~/models/DTOs';

import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
class VocabController {
  async createVocabTopic(req: Request, res: Response) {
    try {
      const createdVocabTopicDTO: CreateVocabTopicDTO = req.body;
      const topicId = new ObjectId();
      const newVocabTopic: VocabTopic = {
        ...createdVocabTopicDTO,
        vocabs: createdVocabTopicDTO.vocabs.map((vocab) => ({
          ...vocab,
          _id: new ObjectId(),
          topicId: topicId.toString(),
        })),
        _id: topicId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await vocabServiceInstance.createVocabTopic(newVocabTopic);
      if (result) {
        res.status(201).json({
          EM: 'Vocab topic created successfully',
          EC: 0,
          DT: newVocabTopic,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create vocab topic',
          EC: 3,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 4,
      });
    }
  }
  async updateVocabTopic(req: Request, res: Response) {
    try {
      const topicId = req.params.topicId;
      // req.body : CreateVocabTopicDTO
      const updatedVocabTopic: VocabTopic = {
        ...req.body,
        vocabs: req.body.vocabs.map((vocab: any) => ({ ...vocab, _id: new ObjectId() })),
      };
      const result = await vocabServiceInstance.updateVocabTopic(topicId, updatedVocabTopic);
      if (result) {
        res.status(200).json({
          EM: 'Vocab topic updated successfully',
          EC: 0,
          DT: updatedVocabTopic,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to update vocab topic',
          EC: 3,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 4,
      });
    }
  }
  async deleteVocabTopic(req: Request, res: Response) {
    try {
      const topicId = req.params.topicId;
      const result = await vocabServiceInstance.deleteVocabTopic(topicId);
      if (result) {
        res.status(200).json({
          EM: 'Vocab topic deleted successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to delete vocab topic',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }
  async getAllVocabTopics(req: Request, res: Response) {
    try {
      const vocabTopics = await vocabServiceInstance.getAllVocabTopics();
      if (vocabTopics) {
        res.status(200).json({
          EM: 'Vocab topics fetched successfully',
          EC: 0,
          DT: vocabTopics.map((vocabTopic) => ({ ...vocabTopic, _id: vocabTopic._id.toString() })),
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch vocab topics',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }
  async getVocabTopicById(req: Request, res: Response) {
    try {
      const topicId = req.params.topicId;
      const vocabTopic = await vocabServiceInstance.getVocabTopicById(topicId);
      if (vocabTopic) {
        res.status(200).json({
          EM: 'Vocab topic fetched successfully',
          EC: 0,
          DT: { ...vocabTopic, _id: vocabTopic._id.toString() },
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch vocab topic',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }
  async completeVocabTopic(req: Request, res: Response) {
    try {
      const completedVocabDTO: CompleteVocabDTO = req.body;
      const result = await vocabServiceInstance.updateVocabHistory(req.params.userId, completedVocabDTO);
      if (result) {
        res.status(200).json({
          EM: 'Vocab topic completed successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to complete vocab topic',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }
  async getVocabHistory(req: Request, res: Response) {
    try {
      const vocabHistory = await vocabServiceInstance.getVocabHistory(req.params.userId);
      if (vocabHistory) {
        res.status(200).json({
          EM: 'Vocab history fetched successfully',
          EC: 0,
          DT: vocabHistory,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch vocab history',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }

  async saveVocab(req: Request, res: Response) {
    try {
      const savedVocab: SaveVocabDTO = req.body;
      const result = await vocabServiceInstance.updateVocabsSaved(req.params.userId, savedVocab);
      if (result) {
        res.status(200).json({
          EM: 'Vocab saved successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to save vocab',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }
  async getVocabsSaved(req: Request, res: Response) {
    try {
      const vocabsSaved = await vocabServiceInstance.getVocabsSaved(req.params.userId);
      if (vocabsSaved) {
        res.status(200).json({
          EM: 'Vocabs saved fetched successfully',
          EC: 0,
          DT: vocabsSaved.vocabs,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch vocabs saved',
          EC: 2,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 3,
      });
    }
  }
}
const vocabControllerInstance = new VocabController();
export default vocabControllerInstance;

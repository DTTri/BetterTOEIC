import { roadmapServiceInstance } from '~/services';
import { roadmapMiddlewareInstance } from '~/middlewares';
import { CreateRoadmapExerciseDTO, CreatePersonalRoadmapDTO, CompleteRoadmapExerciseDTO } from '~/models/DTOs';
import { RoadmapExercise, RoadmapHistory, CompletedRoadmapExercise } from '~/models';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
class RoadmapController {
  async createRoadmapExercise(req: Request, res: Response) {
    try {
      const newRoadmapExercise: RoadmapExercise = {
        ...req.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        _id: new ObjectId(),
      };
      const result = await roadmapServiceInstance.createRoadmapExercise(newRoadmapExercise);
      if (result) {
        res.status(201).json({
          EM: 'Roadmap exercise created successfully',
          EC: 0,
          DT: newRoadmapExercise,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create roadmap exercise',
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
  async deleteRoadmapExercise(req: Request, res: Response) {
    try {
      const roadmapExerciseId = req.params.roadmapExerciseId;
      const result = await roadmapServiceInstance.deleteRoadmapExercise(roadmapExerciseId);
      if (result) {
        res.status(200).json({
          EM: 'Roadmap exercise deleted successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to delete roadmap exercise',
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
  async getAllRoadmapExercises(req: Request, res: Response) {
    try {
      const roadmapExercises = await roadmapServiceInstance.getAllRoadmapExercises();
      if (roadmapExercises) {
        res.status(200).json({
          EM: 'Roadmap exercises fetched successfully',
          EC: 0,
          DT: roadmapExercises.map((roadmapExercise) => ({ ...roadmapExercise, _id: roadmapExercise._id?.toString() })),
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch roadmap exercises',
          EC: 1,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }
  async getRoadmapExerciseById(req: Request, res: Response) {
    try {
      const roadmapExerciseId = req.params.roadmapExerciseId;
      const roadmapExercise = await roadmapServiceInstance.getRoadmapExerciseById(roadmapExerciseId);
      if (roadmapExercise) {
        res.status(200).json({
          EM: 'Roadmap exercise fetched successfully',
          EC: 0,
          DT: { ...roadmapExercise, _id: roadmapExercise._id?.toString() },
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch roadmap exercise',
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
  async getRoadmapExercisesByPhase(req: Request, res: Response) {
    try {
      const phase = parseInt(req.params.phase);
      const roadmapExercises = await roadmapServiceInstance.getRoadmapExercisesByPhase(phase);
      if (roadmapExercises) {
        res.status(200).json({
          EM: 'Roadmap exercises fetched successfully',
          EC: 0,
          DT: roadmapExercises.map((roadmapExercise) => ({ ...roadmapExercise, _id: roadmapExercise._id?.toString() })),
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch roadmap exercises',
          EC: 1,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }
  async completeRoadmapExercise(req: Request, res: Response) {
    try {
      const completeRoadmapExerciseDTO: CompleteRoadmapExerciseDTO = req.body;
      const roadmapExercise = (await roadmapServiceInstance.getRoadmapExerciseById(
        completeRoadmapExerciseDTO.roadmapExerciseId
      )) as RoadmapExercise;
      if (!roadmapExercise) {
        res.status(400).json({
          EM: 'Roadmap exercise not found',
          EC: 2,
        });
        return;
      }
      if (completeRoadmapExerciseDTO.choices.length !== roadmapExercise.questions.length) {
        res.status(400).json({
          EM: 'Number of choices is not equal to the number of questions',
          EC: 3,
        });
        return;
      }
      const totalCorrectAnswers = roadmapExercise.questions.reduce((total, question, index) => {
        return question.correct_choice === completeRoadmapExerciseDTO.choices[index] ? total + 1 : total;
      }, 0);
      const { phase, part, chapter } = roadmapExercise;
      const completedRoadmapExercise: CompletedRoadmapExercise = {
        ...completeRoadmapExerciseDTO,
        totalCorrectAnswers,
        phase,
        part,
        chapter,
        attempted_at: new Date().toISOString(),
      };
      const result = await roadmapServiceInstance.updateRoadmapHistory(req.params.userId, completedRoadmapExercise);
      if (result) {
        res.status(200).json({
          EM: 'Roadmap exercise result saved successfully',
          EC: 0,
          DT: completedRoadmapExercise,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to complete roadmap exercise, user roadmap history not found',
          EC: 4,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 5,
        DT: req.params.userId,
      });
    }
  }
  async createPersonalRoadmap(req: Request, res: Response) {
    try {
      const newPersonalRoadmap: CreatePersonalRoadmapDTO = req.body;
      const result = await roadmapServiceInstance.createPersonalRoadmap(newPersonalRoadmap);
      if (result) {
        res.status(201).json({
          EM: 'Personal roadmap created successfully',
          EC: 0,
          DT: result,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create personal roadmap',
          EC: 1,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }
  async getRoadmapHistory(req: Request, res: Response) {
    try {
      const roadmapHistory = await roadmapServiceInstance.getRoadmapHistory(req.params.userId);
      if (roadmapHistory) {
        res.status(200).json({
          EM: 'Roadmap history fetched successfully',
          EC: 0,
          DT: roadmapHistory,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to fetch roadmap history',
          EC: 1,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 2,
      });
    }
  }
}

const roadmapControllerInstance = new RoadmapController();

export default roadmapControllerInstance;

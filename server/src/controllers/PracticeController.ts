import { practiceServiceInstance } from '~/services';
import { Request, Response } from 'express';
import { CreatePracticeTestDTO, CompletePracticeTestDTO, CompletePracticeLessonDTO } from '~/models/DTOs';
import { PracticeTest, PracticeLesson, CompletedPracticeTest, CompletedPracticeLesson } from '~/models';
import { ObjectId } from 'mongodb';
class PracticeController {
  async createPracticeTest(req: Request, res: Response): Promise<void> {
    const createPracticeTestDTO = req.body as CreatePracticeTestDTO;
    const practiceTest: PracticeTest = {
      ...createPracticeTestDTO,
      _id: new ObjectId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    try {
      const result = await practiceServiceInstance.createPracticeTest(practiceTest);
      if (result) {
        res.status(201).json({
          EM: 'Practice test created successfully',
          EC: 0,
          DT: practiceTest,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create practice test',
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
  async deletePracticeTest(req: Request, res: Response): Promise<void> {
    const practiceTestId = req.params.practiceTestId;
    try {
      const result = await practiceServiceInstance.deletePracticeTest(practiceTestId);
      if (result) {
        res.status(200).json({
          EM: 'Practice test deleted successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to delete practice test',
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
  async getAllPracticeTests(req: Request, res: Response): Promise<void> {
    try {
      const practiceTests = await practiceServiceInstance.getAllPracticeTests();
      if (practiceTests) {
        res.status(200).json({
          EM: 'Practice tests retrieved successfully',
          EC: 0,
          DT: practiceTests,
        });
      } else {
        res.status(404).json({
          EM: 'No practice tests found',
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
  async getPracticeTestById(req: Request, res: Response): Promise<void> {
    const practiceTestId = req.params.practiceTestId;
    try {
      const practiceTest = await practiceServiceInstance.getPracticeTestById(practiceTestId);
      if (practiceTest) {
        res.status(200).json({
          EM: 'Practice test retrieved successfully',
          EC: 0,
          DT: practiceTest,
        });
      } else {
        res.status(404).json({
          EM: 'Practice test not found',
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
  async getPracticeTestsByPart(req: Request, res: Response): Promise<void> {
    const part = parseInt(req.params.part);
    try {
      const practiceTests = await practiceServiceInstance.getPracticeTestsByPart(part);
      if (practiceTests) {
        res.status(200).json({
          EM: 'Practice tests retrieved successfully',
          EC: 0,
          DT: practiceTests,
        });
      } else {
        res.status(404).json({
          EM: 'No practice tests found',
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

  async createPracticeLesson(req: Request, res: Response): Promise<void> {
    const practiceLesson: PracticeLesson = {
      ...req.body,
      _id: new ObjectId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    try {
      const result = await practiceServiceInstance.createPracticeLesson(practiceLesson);
      if (result) {
        res.status(201).json({
          EM: 'Practice lesson created successfully',
          EC: 0,
          DT: practiceLesson,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to create practice lesson',
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

  async deletePracticeLesson(req: Request, res: Response): Promise<void> {
    const practiceLessonId = req.params.practiceLessonId;
    try {
      const result = await practiceServiceInstance.deletePracticeLesson(practiceLessonId);
      if (result) {
        res.status(200).json({
          EM: 'Practice lesson deleted successfully',
          EC: 0,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to delete practice lesson',
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
  async getAllPracticeLessons(req: Request, res: Response): Promise<void> {
    try {
      const practiceLessons = await practiceServiceInstance.getAllPracticeLessons();
      if (practiceLessons) {
        res.status(200).json({
          EM: 'Practice lessons retrieved successfully',
          EC: 0,
          DT: practiceLessons,
        });
      } else {
        res.status(404).json({
          EM: 'No practice lessons found',
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
  async getPracticeLessonById(req: Request, res: Response): Promise<void> {
    const practiceLessonId = req.params.practiceLessonId;
    try {
      const practiceLesson = await practiceServiceInstance.getPracticeLessonById(practiceLessonId);
      if (practiceLesson) {
        res.status(200).json({
          EM: 'Practice lesson retrieved successfully',
          EC: 0,
          DT: practiceLesson,
        });
      } else {
        res.status(404).json({
          EM: 'Practice lesson not found',
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
  async getPracticeLessonsByPart(req: Request, res: Response): Promise<void> {
    const part = parseInt(req.params.part);
    try {
      const practiceLessons = await practiceServiceInstance.getPracticeLessonsByPart(part);
      if (practiceLessons) {
        res.status(200).json({
          EM: 'Practice lessons retrieved successfully',
          EC: 0,
          DT: practiceLessons,
        });
      } else {
        res.status(404).json({
          EM: 'No practice lessons found',
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
  async completePracticeTest(req: Request, res: Response): Promise<void> {
    const completePracticeTestDTO = req.body as CompletePracticeTestDTO;
    const practiceTest = (await practiceServiceInstance.getPracticeTestById(
      completePracticeTestDTO.practiceTestId
    )) as PracticeTest;
    if (!practiceTest) {
      res.status(400).json({
        EM: 'Practice test not found',
        EC: 2,
      });
      return;
    }
    if (completePracticeTestDTO.choices.length !== practiceTest.questions.length) {
      res.status(400).json({
        EM: 'Number of choices is not equal to the number of questions',
        EC: 3,
      });
      return;
    }
    const totalCorrectAnswers = practiceTest.questions.reduce((total, question, index) => {
      if (question.correct_choice === completePracticeTestDTO.choices[index]) {
        return total + 1;
      }
      return total;
    }, 0);
    const part = practiceTest.part;
    const completedPracticeTest: CompletedPracticeTest = {
      ...completePracticeTestDTO,
      part,
      totalCorrectAnswers,
      attempted_at: new Date().toISOString(),
    };
    try {
      const result = await practiceServiceInstance.updatePracticeTestHistory(req.params.userId, completedPracticeTest);
      if (result) {
        res.status(200).json({
          EM: 'Practice test result saved successfully',
          EC: 0,
          DT: completedPracticeTest,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to complete practice test',
          EC: 4,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        EM: err.message,
        EC: 5,
      });
    }
  }
  async getPracticeTestHistory(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    try {
      const practiceTestHistory = await practiceServiceInstance.getPracticeTestHistory(userId);
      if (practiceTestHistory) {
        res.status(200).json({
          EM: 'Practice test history retrieved successfully',
          EC: 0,
          DT: practiceTestHistory.completedPracticeTests,
        });
      } else {
        res.status(400).json({
          EM: 'Practice test history not found',
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
  async completePracticeLesson(req: Request, res: Response): Promise<void> {
    const completePracticeLessonDTO = req.body as CompletePracticeLessonDTO;
    const practiceLesson = (await practiceServiceInstance.getPracticeLessonById(
      completePracticeLessonDTO.practiceLessonId
    )) as PracticeLesson;
    if (!practiceLesson) {
      res.status(400).json({
        EM: 'Practice lesson not found',
        EC: 2,
      });
      return;
    }

    const part = practiceLesson.part;
    const completedPracticeLesson: CompletedPracticeLesson = {
      ...completePracticeLessonDTO,
      part,
      attempted_at: new Date().toISOString(),
    };
    try {
      const result = await practiceServiceInstance.updatePracticeLessonHistory(
        req.params.userId,
        completedPracticeLesson
      );
      if (result) {
        res.status(200).json({
          EM: 'Practice lesson result saved successfully',
          EC: 0,
          DT: completedPracticeLesson,
        });
      } else {
        res.status(400).json({
          EM: 'Failed to complete practice lesson',
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

  async getPracticeLessonHistory(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    try {
      const practiceLessonHistory = await practiceServiceInstance.getPracticeLessonHistory(userId);
      if (practiceLessonHistory) {
        res.status(200).json({
          EM: 'Practice lesson history retrieved successfully',
          EC: 0,
          DT: practiceLessonHistory.completedPracticeLessons,
        });
      } else {
        res.status(404).json({
          EM: 'Practice lesson history not found',
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

const practiceControllerInstance = new PracticeController();

export default practiceControllerInstance;

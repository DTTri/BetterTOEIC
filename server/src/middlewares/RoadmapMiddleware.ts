import { CreateRoadmapExerciseDTO, CreatePersonalRoadmapDTO, CompleteRoadmapExerciseDTO } from '~/models/DTOs';
import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { start } from 'repl';
import { roadmapServiceInstance } from '~/services';
class RoadmapMiddleware {
  async createRoadmapExercise(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      phase: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: 'Phase is required',
      },
      part: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: 'Part is required',
      },
      chapter: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: 'Chapter is required',
      },
      created_by: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Created by is required',
      },
      questions: {
        isArray: true,
        errorMessage: 'Questions is required',
      },
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        EM:
          'Validation errors: ' +
          errors
            .array()
            .map((error) => error.msg)
            .join(', '),
        EC: 1,
        DT: errors.array(),
      });
      return;
    }
    const findExistedRoadmapChapter = roadmapServiceInstance.getRoadmapChapter(
      req.body.phase,
      req.body.part,
      req.body.chapter
    );
    if (!findExistedRoadmapChapter) {
      res.status(400).json({
        EM: 'Roadmap chapter existed',
        EC: 1,
      });
      return;
    }
    const newRoadmapExercise: CreateRoadmapExerciseDTO = req.body as CreateRoadmapExerciseDTO;
    if (
      newRoadmapExercise.phase < 1 ||
      newRoadmapExercise.phase > 4 ||
      newRoadmapExercise.part < 1 ||
      newRoadmapExercise.part > 7 ||
      newRoadmapExercise.chapter < 1
    ) {
      res.status(400).json({
        EM: 'Invalid phase, part or chapter',
        EC: 1,
      });
      return;
    }
    if (
      newRoadmapExercise.part < 5 &&
      (newRoadmapExercise.main_audio === null || newRoadmapExercise.main_audio === '')
    ) {
      res.status(400).json({
        EM: 'Main audio is required',
        EC: 1,
      });
      return;
    }
    next();
  }
  async completeRoadmapExercise(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      roadmapExerciseId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Roadmap Exercise Id is required',
      },
      choices: {
        isArray: true,
        errorMessage: 'Choices is required',
      },
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        EM:
          'Validation errors: ' +
          errors
            .array()
            .map((error) => error.msg)
            .join(', '),
        EC: 1,
        DT: errors.array(),
      });
      return;
    }
    next();
  }

  async createPersonalRoadmap(req: Request, res: Response, next: NextFunction) {
    await checkSchema({
      userId: {
        isString: true,
        notEmpty: true,
        errorMessage: 'User ID is required',
      },
      start_level: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: 'Start level is required',
      },
      target_level: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: 'Target level is required',
      },
      current_level: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: 'Current level is required',
      },
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        EM:
          'Validation errors: ' +
          errors
            .array()
            .map((error) => error.msg)
            .join(', '),
        EC: 1,
        DT: errors.array(),
      });
      return;
    }
    const newPersonalRoadmap: CreatePersonalRoadmapDTO = req.body as CreatePersonalRoadmapDTO;
    if (
      newPersonalRoadmap.start_level >= newPersonalRoadmap.target_level ||
      newPersonalRoadmap.current_level > newPersonalRoadmap.target_level ||
      newPersonalRoadmap.current_level < newPersonalRoadmap.start_level
    ) {
      res.status(400).json({
        EM: 'Invalid levels',
        EC: 1,
      });
      return;
    }
    next();
  }
}
const roadmapMiddlewareInstance = new RoadmapMiddleware();
export default roadmapMiddlewareInstance;

import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { CompletedRoadmapExercise, RoadmapExercise, RoadmapHistory } from '~/models';
import { CreatePersonalRoadmapDTO } from '~/models/DTOs';

class RoadmapService {
  async createRoadmapExercise(roadmapExercise: RoadmapExercise): Promise<boolean> {
    const result = await collections.roadmapExercises?.insertOne(roadmapExercise);
    return result ? true : false;
  }
  async deleteRoadmapExercise(roadmapExerciseId: string): Promise<boolean> {
    const result = await collections.roadmapExercises?.deleteOne({ _id: new ObjectId(roadmapExerciseId) });
    return result ? true : false;
  }
  async getAllRoadmapExercises(): Promise<RoadmapExercise[] | null> {
    const result = await collections.roadmapExercises?.find().toArray();
    if (result) {
      return result as RoadmapExercise[];
    }
    return null;
  }
  async getRoadmapExerciseById(roadmapExerciseId: string): Promise<RoadmapExercise | null> {
    const result = await collections.roadmapExercises?.findOne({ _id: new ObjectId(roadmapExerciseId) });
    if (result) {
      return result as RoadmapExercise;
    }
    return null;
  }
  async getRoadmapExercisesByPhase(phase: number): Promise<RoadmapExercise[] | null> {
    const result = await collections.roadmapExercises?.find({ phase }).toArray();
    if (result) {
      return result as RoadmapExercise[];
    }
    return null;
  }
  async getRoadmapChapter(phase: number, part: number, chapter: number): Promise<RoadmapExercise | null> {
    const result = await collections.roadmapExercises?.findOne({ phase, part, chapter });
    if (result) {
      return result as RoadmapExercise;
    }
    return null;
  }
  async updateRoadmapHistory(userId: string, completedRoadmapExercise: CompletedRoadmapExercise): Promise<boolean> {
    const getUserRoadmapHistoryResult = await collections.roadmapHistories?.findOne({ _id: new ObjectId(userId) });
    const userRoadmapHistory = getUserRoadmapHistoryResult as RoadmapHistory;
    if (userRoadmapHistory) {
      userRoadmapHistory.completedRoadmapExercises.push(completedRoadmapExercise);
      const result = await collections.roadmapHistories?.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            completedRoadmapExercises: userRoadmapHistory.completedRoadmapExercises,
            updated_at: new Date().toISOString(),
          },
        }
      );
      return result ? true : false;
    }
    return false;
  }
  async getRoadmapHistory(userId: string): Promise<RoadmapHistory | null> {
    const result = await collections.roadmapHistories?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as RoadmapHistory;
    }
    return null;
  }
  async createPersonalRoadmap(personalRoadmap: CreatePersonalRoadmapDTO): Promise<RoadmapHistory | null> {
    const roadmapHistory: RoadmapHistory = (await collections.roadmapHistories?.findOne({
      _id: new ObjectId(personalRoadmap.userId),
    })) as RoadmapHistory;
    if (roadmapHistory) {
      const result = await collections.roadmapHistories?.updateOne(
        { _id: new ObjectId(personalRoadmap.userId) },
        {
          $set: {
            start_level: personalRoadmap.start_level,
            target_level: personalRoadmap.target_level,
            current_level: personalRoadmap.current_level,
            updated_at: new Date().toISOString(),
          },
        }
      );
      if (result) {
        return {
          ...roadmapHistory,
          start_level: personalRoadmap.start_level,
          target_level: personalRoadmap.target_level,
          current_level: personalRoadmap.current_level,
          updated_at: new Date().toISOString(),
        };
      }
      return null;
    } else {
      const newRoadmapHistory: RoadmapHistory = {
        _id: new ObjectId(personalRoadmap.userId),
        start_level: personalRoadmap.start_level,
        target_level: personalRoadmap.target_level,
        current_level: personalRoadmap.current_level,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completedRoadmapExercises: [],
      };
      const result = await collections.roadmapHistories?.insertOne(newRoadmapHistory);
      if (result) {
        return newRoadmapHistory;
      }
      return null;
    }
  }
  async updateUserCurrentLevel(userId: string): Promise<boolean> {
    const getUserRoadmapHistoryResult = await collections.roadmapHistories?.findOne({ _id: new ObjectId(userId) });
    const userRoadmapHistory = getUserRoadmapHistoryResult as RoadmapHistory;
    if (userRoadmapHistory) {
      const result = await collections.roadmapHistories?.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            current_level: userRoadmapHistory.current_level + 1,
            updated_at: new Date().toISOString(),
          },
        }
      );
      return result ? true : false;
    }
    return false;
  }
  async deleteRoadmapHistory(userId: string): Promise<boolean> {
    const result = await collections.roadmapHistories?.deleteOne({ _id: new ObjectId(userId) });
    return result ? true : false;
  }
}

const roadmapServiceInstance = new RoadmapService();
export default roadmapServiceInstance;

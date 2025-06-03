import { ObjectId } from 'mongodb';

export type SWTestMetadata = {
  testId: string;
  attemptId: string; // Unique identifier for this specific attempt
  contentKey: string; // S3 key for full content
  scores: number[];
  totalScore: number;
  averageScore: number;
  attempted_at: string;
};

export type SWTestHistoryPartition = {
  _id?: ObjectId;
  userId: ObjectId;
  year: number;
  month: number;
  tests: SWTestMetadata[];
  created_at: string;
  updated_at: string;
};

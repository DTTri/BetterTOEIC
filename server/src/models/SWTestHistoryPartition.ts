import { ObjectId } from 'mongodb';

export type SWTestMetadata = {
  testId: string;
  contentKey: string; // S3 key for full content
  scores: number[];
  totalScore: number;
  averageScore: number;
  attempted_at: string;
  completed_at: string;
  duration: number; // in seconds
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

import { ObjectId } from 'mongodb';

type TestsSaved = {
  _id: ObjectId;
  created_at: string;
  updated_at: string;
  savedTests: {
    testId: string;
    saved_at: string;
  }[];
};

export default TestsSaved;

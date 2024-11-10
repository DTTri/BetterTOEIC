import { ObjectId } from 'mongodb';

type TestSaved = {
  _id: ObjectId;
  created_at: string;
  updated_at: string;
  savedTests: [
    {
      testId: string;
      saved_at: string;
    },
  ];
};

export default TestSaved;

import { ObjectId } from 'mongodb';

type VocabHistory = {
  _id: ObjectId;
  topics: {
    topicId: string;
    completedVocabs: string[];
  }[];
  created_at: string;
  updated_at: string;
};
export default VocabHistory;

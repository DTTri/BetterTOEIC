import { ObjectId } from 'mongodb';

type VocabsSaved = {
  _id: ObjectId; //userId
  vocabs: string[];
};
export default VocabsSaved;

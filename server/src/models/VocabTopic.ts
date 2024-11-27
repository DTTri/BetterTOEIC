import { ObjectId } from 'mongodb';
import Vocab from './Vocab';

type VocabTopic = {
  _id: ObjectId;
  name: string;
  image: string;
  vocabs: Vocab[];
  created_at: string;
  updated_at: string;
};
export default VocabTopic;

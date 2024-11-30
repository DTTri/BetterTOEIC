import { ObjectId } from 'mongodb';

type Vocab = {
  _id: ObjectId;
  topicId: string;
  word: string;
  meaning_en: string;
  meaning_vi: string;
  image: string;
  audio: string;
  example: string;
  spelling: string;
  type: string;
};
export default Vocab;

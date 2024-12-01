import { ObjectId } from 'mongodb';
import Vocab from './Vocab';
type VocabsSaved = {
  _id: ObjectId; //userId
  // vocabs is an array of {...Vocab, topicName}
  vocabs: [
    {
      _id: string;
      topicId: string;
      topicName: string;
      word: string;
      meaning_en: string;
      meaning_vi: string;
      image: string;
      audio: string;
      example: string;
      type: string;
      spelling: string;
    },
  ];
  updated_at: string;
  created_at: string;
};
export default VocabsSaved;

import Vocab from "./Vocab";
type VocabByTopic = {
  _id: string;
  topic_name: string;
  vocabs: Vocab[];
  image_background: string;
  created_at: string;
  updated_at: string;
};

export default VocabByTopic;

type SavedVocab = {
  _id: string;
  topicId: string;
  topicName: string;
  word: string;
  meaning_en: string;
  meaning_vi: string;
  image: string;
  audio: string;
  example: string;
  spelling: string;
  type: string;
  isSaving: boolean;
};
export default SavedVocab;

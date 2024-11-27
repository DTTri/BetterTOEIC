type CreateVocabTopicDTO = {
  name: string;
  image: string;
  vocabs: {
    word: string;
    meaning_en: string;
    meaning_vi: string;
    image: string;
    audio: string;
    example: string;
  }[];
};
export default CreateVocabTopicDTO;

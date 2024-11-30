
 type CreateVocabByTopicDTO = {
    name: string;
    image: string;
    vocabs: {
        word: string;
        meaning_en: string;
        meaning_vi: string;
        image: string;
        audio: string;
        example: string;
        spelling: string;
        type: string;
    }[];
}

export default CreateVocabByTopicDTO;

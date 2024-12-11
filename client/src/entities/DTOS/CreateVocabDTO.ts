
type CreateVocabDTO = {
    word: string;
    meaning_en: string;
    meaning_vi: string;
    example: string;
    audio: File;
    image: File;
    spelling: string;
    type: string;
}

export default CreateVocabDTO;
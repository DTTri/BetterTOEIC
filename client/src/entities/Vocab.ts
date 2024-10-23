type Vocab = {
    _id: string;
    word: string;
    meaning_en: string;
    meaing_vn: string;
    image_word: string;
    audio_word: string;
    topic_id: string;
    created_at: string;
    updated_at: string;
    ex_sentence?: string;
    ipa_spelling?: string;
}

export default Vocab;
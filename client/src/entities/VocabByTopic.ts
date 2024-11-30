import Vocab from "./Vocab";

type VocabByTopic = {
    _id: string;
    name: string;
    vocabs: Vocab[];
    image: string;
    created_at: string;
    updated_at: string;
}

export default VocabByTopic;
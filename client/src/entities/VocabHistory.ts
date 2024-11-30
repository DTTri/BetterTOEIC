export type CompletedVocabs = {
    topicId: string;
    completedVocabs: string[];
}

type VocabHistory = {
    _id: string; //user id
    topics: CompletedVocabs[];
    created_at: string;
    updated_at: string;
}
export default VocabHistory;
import { signify } from "react-signify";
import { SavedVocab, VocabByTopic } from "@/entities";
import { CompletedVocabs } from "@/entities/VocabHistory";
const sVocab = signify({
  vocabTopics: [] as VocabByTopic[],
  vocabsSaved: [] as SavedVocab[],
  vocabHistory: [] as CompletedVocabs[],
});
export default sVocab;

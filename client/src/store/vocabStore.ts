import { signify } from "react-signify";
import { SavedVocab, VocabByTopic } from "@/entities";
const sVocab = signify({
  vocabTopics: [] as VocabByTopic[],
  vocabsSaved: [] as SavedVocab[],
});
export default sVocab;

import { FlashCard, QuestionPalette } from "@/components";
import Vocab from "@/entities/Vocab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftBarVocab from "@/components/vocab/LeftBarVocab";
import { sUser, sVocab } from "@/store";
import LoadingProgress from "@/components/LoadingProgress";
import vocabService from "@/services/vocabService";

export default function VocabLearingPage() {
  const { id } = useParams();
  const userId = sUser.use((state) => state.info._id);

  const vocabTopic = sVocab
    .use((cur) => cur.vocabTopics)
    .find((vocab) => vocab._id === id);
  const [vocabs, setVocabs] = useState<Vocab[]>(vocabTopic?.vocabs || []);

  const vocabHistory = sVocab.use((cur) => cur.vocabHistory);
  const [completedVocabs, setCompletedVocabs] = useState<string[]>([]);

  const [selectedVocab, setSelectedVocab] = useState<Vocab>();
  const [curVocabQuestionNumber, setCurVocabQuestionNumber] = useState(0);

  useEffect(() => {
    if (vocabTopic) {
      setSelectedVocab(vocabs[0]);
      setVocabs(vocabTopic?.vocabs);
    }
  }, [vocabTopic]);

  useEffect(() => {
    if (vocabHistory) {
      setCompletedVocabs(
        vocabHistory.find((history) => history.topicId === id)
          ?.completedVocabs || []
      );
    }
  }, [vocabHistory]);

  console.log(vocabHistory);
  const handleOnQuestionNumberChange = (questionNumber: number) => {
    setCurVocabQuestionNumber(questionNumber);
    setSelectedVocab(vocabs[questionNumber]);
  };

  const handleOnRememberedChange = async (index: number) => {
    try {
      const response = await vocabService.completeVocabTopic(userId, {
        topicId: vocabTopic?._id,
        vocabId: vocabs[index]._id,
      });
      if (response.EC === 0) {
        setCompletedVocabs([...completedVocabs, vocabs[index]._id]);
        console.log("Change remembered status successfully");
      } else {
        console.log("Error when changing remembered status", response.EM);
      }
    } catch (error) {
      console.log("Error when changing remembered status", error);
    }
  };

  //Mark items that are not loaded yet
  if (vocabs.length === 0 || !vocabTopic || !userId || !vocabHistory) {
    return <LoadingProgress />;
  }

  return (
      <div className="w-full h-screen flex flex-row items-stretch">
        <LeftBarVocab VocabLists={sVocab.value.vocabTopics} />
        <div className="w-full flex flex-col gap-4 py-4 px-6">
          <FlashCard
            topicName={vocabTopic.name}
            vocabNumber={curVocabQuestionNumber}
            onVocabRemember={handleOnRememberedChange}
            vocab={selectedVocab || vocabs[0]}
          />
          <QuestionPalette
            numberOfQuestions={vocabs.length}
            onQuestionSelectedChange={handleOnQuestionNumberChange}
            vocabs={vocabs}
            completedVocabs={completedVocabs}
            curQuestionNumber={curVocabQuestionNumber}
          />
        </div>
      </div>
  );
}

import { FlashCard, QuestionPalette } from "@/components";
import Vocab from "@/entities/Vocab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftBarVocab from "@/components/vocab/LeftBarVocab";
import { sVocab } from "@/store";
import LoadingProgress from "@/components/LoadingProgress";

export default function VocabLearingPage() {
  const { id } = useParams();

  const vocabs = sVocab.use((cur) => cur.vocabTopics).find((vocab) => vocab._id === id)?.vocabs || [];

  const [selectedVocab, setSelectedVocab] = useState<Vocab>();
  const [isRemembered, setIsRemembered] = useState<boolean[]>(Array(vocabs.length).fill(false));
  const [curVocabQuestionNumber, setCurVocabQuestionNumber] = useState(0);

  useEffect(() => {
    if (vocabs.length > 0) {
      setSelectedVocab(vocabs[0]);
    }
  }, [vocabs]);

  const handleOnQuestionNumberChange = (questionNumber: number) => {
    setCurVocabQuestionNumber(questionNumber);
    setSelectedVocab(vocabs[questionNumber]);
  };

  const handleOnRememberedChange = (index: number) => {
    setIsRemembered((prev) => {
      const newIsRemembered = [...prev];
      newIsRemembered[index] = !prev[index];
      return newIsRemembered;
    });
  };

  if (vocabs.length === 0) {
    return <LoadingProgress/>;
  }

  return (
    <div className="">
      <div className="flex flex-row items-stretch">
        <LeftBarVocab VocabLists={sVocab.value.vocabTopics} />
        <div className="w-full flex flex-col gap-4 p-6">
          <FlashCard vocabNumber={curVocabQuestionNumber} onVocabRemember={handleOnRememberedChange} vocab={selectedVocab || vocabs[0]} />
          <QuestionPalette
            numberOfQuestions={vocabs.length}
            onQuestionSelectedChange={handleOnQuestionNumberChange}
            isRemembered={isRemembered}
            curQuestionNumber={curVocabQuestionNumber}
          />
        </div>
      </div>
    </div>
  );
}
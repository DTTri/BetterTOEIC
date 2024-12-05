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

  const vocabTopic = sVocab.use((cur) => cur.vocabTopics).find((vocab) => vocab._id === id);
  const [vocabs, setVocabs] = useState<Vocab[]>(vocabTopic?.vocabs || []);

  const [selectedVocab, setSelectedVocab] = useState<Vocab>();
  const [isRemembered, setIsRemembered] = useState<boolean[]>(Array(vocabs.length).fill(false));
  const [curVocabQuestionNumber, setCurVocabQuestionNumber] = useState(0);

  useEffect(() => {
    if (vocabTopic) {
      setSelectedVocab(vocabs[0]);
      setVocabs(vocabTopic?.vocabs);
    }
  }, [vocabTopic]);

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

  const handleOnSubmit = async () => {
    if(isRemembered.length !== vocabs.length) {
      alert("Please remember all the vocabularies before submitting");
      return;
    }
    try {
      const vocabIds: string[] = vocabs.map((vocab) => (vocab._id));
      const completedVocabTopic = {
        topicId: vocabTopic?._id,
        vocabId: vocabIds,
      }
      const response = await vocabService.completeVocabTopic(userId, completedVocabTopic);
      if(response.EC === 0) {
        alert("Submit vocab successfully");
      }
      else{
        console.log("Submit vocab failed" + response.EM);
      }
    } catch (error) {
      console.log("Error when submitting vocab", error);
    }
  }

  //Mark items that are not loaded yet
  if (vocabs.length === 0 || !vocabTopic || !userId) {
    return <LoadingProgress/>;
  }

  return (
    <div className="">
      <div className="flex flex-row items-stretch">
        <LeftBarVocab VocabLists={sVocab.value.vocabTopics} />
        <div className="w-full flex flex-col gap-4 py-4 px-6">
          <FlashCard topicName={vocabTopic.name} vocabNumber={curVocabQuestionNumber} onVocabRemember={handleOnRememberedChange} vocab={selectedVocab || vocabs[0]} />
          <QuestionPalette
            onSubmit={handleOnSubmit}
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
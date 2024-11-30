import { CircularProgress } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import VocabByTopic from "@/entities/VocabByTopic";
import { sVocab } from "@/store";

export default function VocabByTopicCard({vocabByTopic, onCardClick} : {vocabByTopic: VocabByTopic, onCardClick: (id: string) => void}) {
  const isLearned = sVocab.use((cur) => cur.vocabHistory)
  .find((vocab) => vocab.topicId === vocabByTopic._id);

  console.log(vocabByTopic + "vocabByTopic");
  console.log(isLearned);
  
  return (
    <div className="max-w-[305px] w-full max-h-[230px] h-full round-[20px] mb-6 mx-auto bg-[#fff] rounded-[20px] overflow-hidden cursor-pointer"
          onClick={() => onCardClick(vocabByTopic._id)}>
      <div className="img w-full h-[73%] rounded-[20px] ">
        <img
          className="w-full h-full object-cover object-center"
          src={vocabByTopic.image}
          alt=""
        />
      </div>
      <div className="w-full h-[25%] flex flex-row items-center justify-center px-4 py-6">
        <h3 className="text-[#000] text-[27px] font-bold flex-1">{vocabByTopic.name}</h3>
        { 
          isLearned && <DoneIcon className="text-[#00C853] text-4xl" />
        }
      </div>
    </div>
  );
}

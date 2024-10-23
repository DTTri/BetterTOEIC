import { CircularProgress } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import VocabByTopic from "@/entities/VocabByTopic";

export default function VocabByTopicCard({vocabByTopic, onCardClick} : {vocabByTopic: VocabByTopic, onCardClick: (id: string) => void}) {
  return (
    <div className="max-w-[305px] w-full max-h-[230px] h-full round-[20px] mx-auto bg-[#fff] rounded-[20px] overflow-hidden cursor-pointer"
          onClick={() => onCardClick(vocabByTopic._id)}>
      <div className="img w-full h-[73%] rounded-[20px] ">
        <img
          className="w-full h-full object-cover object-center"
          src={vocabByTopic.image_background}
          alt=""
        />
      </div>
      <div className="w-full h-[25%] flex flex-row items-center justify-center px-4 py-6">
        <h3 className="text-[#000] text-[27px] font-bold flex-1">{vocabByTopic.topic_name}</h3>
        { 50 <= 100 ? 
            <span className="font-normal text-[11px] text-[#ffffff] px-[3px] py-[5px] flex items-center justify-center aspect-square bg-[#00205C] rounded-full">
            {50}%
          </span> : 
          <DoneIcon className="" />    
        }
      </div>
    </div>
  );
}

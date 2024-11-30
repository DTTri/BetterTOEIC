import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SaveIcon from "@mui/icons-material/Save";
import ReactCardFlip from "react-card-flip";
import Vocab from "@/entities/Vocab";

const Flashcard = ({
  vocab,
  vocabNumber,
  onVocabRemember,
}: {
  vocab: Vocab;
  vocabNumber: number;
  onVocabRemember: (vocabNumber: number) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [vocab]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      {/* Front */}
      <div className="rounded-[20px] h-[500px] bg-[#fff] overflow-hidden cursor-pointer p-6">
        <div className="buttons w-full flex flex-row items-center justify-between mb-4">
          <VolumeUpIcon fontSize="large" />
          <SaveIcon fontSize="large" />
        </div>
        <div className="img mx-auto max-w-[320px] max-h-[250px] rounded-[20px] mb-4">
          <img
            className="w-full h-full object-cover object-center"
            src={vocab.image}
            alt=""
          />
        </div>

        <div className="word flex flex-col justify-center mb-4">
          <h4 className="text-center text-3xl font-semibold text-[#202224]">
            {vocab.word}
          </h4>
          <p className="IPA text-center text-xl font-normal text-[rgba(32, 34, 36, 0.70)]">
            {vocab.spelling}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <Button
            variant="contained"
            color="primary"
            className=""
            onClick={handleClick}
          >
            Nhấn để xem giải thích
          </Button>
        </div>
      </div>

      <div className="rounded-[20px] h-[500px] bg-[#fff] overflow-hidden cursor-pointer p-8">
        <div className="buttons h-[8%] w-full flex flex-row items-center justify-between mb-4">
          <VolumeUpIcon fontSize="large" />
          <SaveIcon fontSize="large" />
        </div>
        <div className="word flex h-[70%] flex-col justify-center mb-6">
          <h4 className="text-center text-[28px] font-semibold text-[#202224]">
            {vocab.meaning_en}
          </h4>
          <p className="IPA text-center text-[20px] font-normal text-[rgba(32, 34, 36, 0.80)]">
            {vocab.example}
          </p>
        </div>

        <div className="w-full h-[10%] flex justify-center items-center gap-5">
          <Button variant="contained" color="primary" onClick={handleClick}>
            Quay lại
          </Button>
          <Button onClick={() => onVocabRemember(vocabNumber)} variant="contained" color="primary">
            Đã nhớ
          </Button>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;

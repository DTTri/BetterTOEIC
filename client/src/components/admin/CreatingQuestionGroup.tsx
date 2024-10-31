import { useState } from "react";
import CreatingQuestion from "./CreatingQuestion";
import { Button } from "@mui/material";
export default function CreatingQuestionGroup({
  part,
  questionNumberFrom,
}: {
  part: number;
  questionNumberFrom: number;
}) {
  const [questions, setQuestions] = useState<number[]>([questionNumberFrom]);
  const [images, setImages] = useState<string[]>([]);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const deleteQuestion = (questionNumber: number) => {
    setQuestions(questions.filter((qn) => qn !== questionNumber));
  };
  return (
    <div className="w-full flex flex-col gap-2">
      {part === 7 ? (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              const urls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
              );
              setImages(urls);
            }
          }}
        />
      ) : null}
      {part === 6 || part === 7 ? (
        <textarea
          placeholder="Type question group's paragraph here"
          onChange={(e) => {
            setParagraphs(e.target.value.split("\n\n"));
            //split paragraphs by double line breaks -> should let admin know that they need to type double line breaks to separate paragraphs
          }}
        />
      ) : null}
      <div className="flex justify-between">
        <CreatingQuestion
          part={part}
          questionNumber={questionNumberFrom}
          questionGroupNumber={questionNumberFrom}
          images={images}
          paragraphs={paragraphs}
        />
      </div>
      {questions.slice(1).map((questionNumber, index) => (
        <div className="flex justify-between items-start">
          <div className="w-2/3">
            <CreatingQuestion
              key={index}
              part={part}
              questionNumber={questionNumberFrom + index + 1}
              questionGroupNumber={questionNumberFrom}
            />
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#F44336" }}
            onClick={() => deleteQuestion(questionNumber)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Button
        variant="contained"
        style={{
          backgroundColor: "#4CAF50",
          width: "fit-content",
        }}
        onClick={() => {
          setQuestions([...questions, questions[questions.length - 1] + 1]);
        }}
      >
        Add question
      </Button>
    </div>
  );
}

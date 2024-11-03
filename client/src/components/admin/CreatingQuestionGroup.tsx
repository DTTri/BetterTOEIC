import { useState } from "react";
import CreatingQuestion from "./CreatingQuestion";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function CreatingQuestionGroup({
  part,
  questionNumberFrom,
  onNewQuestionCreated,
  onQuestionDeleted,
}: {
  part: number;
  questionNumberFrom: number;
  onNewQuestionCreated: () => void;
  onQuestionDeleted: () => void;
}) {
  const [questions, setQuestions] = useState<{ id: string; number: number }[]>([
    { id: uuidv4(), number: questionNumberFrom },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: uuidv4(), number: questionNumberFrom + questions.length },
    ]);
    onNewQuestionCreated();
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
    onQuestionDeleted();
  };

  return (
    <div className="w-full flex flex-col gap-2 py-2 border-b-2 border-black">
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
      {questions.slice(1).map((question, index) => (
        <div key={question.id} className="flex justify-between items-start">
          <div className="w-2/3">
            <CreatingQuestion
              part={part}
              questionNumber={index + questionNumberFrom + 1}
              questionGroupNumber={questionNumberFrom}
            />
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#F44336" }}
            onClick={() => deleteQuestion(question.id)}
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
        onClick={addQuestion}
      >
        Add question
      </Button>
    </div>
  );
}

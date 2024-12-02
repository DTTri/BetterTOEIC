import { useState, useEffect } from "react";
import CreatingQuestion from "./CreatingQuestion";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Question } from "@/entities";

export default function CreatingQuestionGroup({
  part,
  questionNumberFrom,
  onQuestionsCreated,
  triggerSave,
  onNewQuestionCreated,
  onQuestionDeleted,
}: {
  part: number;
  questionNumberFrom: number;
  onQuestionsCreated: (questions: Question[]) => void;
  triggerSave: boolean;
  onNewQuestionCreated: () => void;
  onQuestionDeleted: () => void;
}) {
  const [questions, setQuestions] = useState<{ id: string; number: number }[]>([
    { id: uuidv4(), number: questionNumberFrom },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [createdQuestions, setCreatedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (triggerSave) {
      onQuestionsCreated(createdQuestions);
    } else {
      onQuestionsCreated([]);
    }
  }, [triggerSave, createdQuestions]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: uuidv4(), number: questionNumberFrom + questions.length },
    ]);
    setCreatedQuestions([]);

    onNewQuestionCreated();
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
    setCreatedQuestions([]);

    onQuestionDeleted();
  };

  const handleQuestionCreated = (question: Question) => {
    //console.log("Question created:", question);
    setCreatedQuestions((prev) => [...prev, question]);
  };

  return (
    <div className="w-full flex flex-col gap-2 py-2 border-b border-gray-400">
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
          onQuestionCreated={handleQuestionCreated}
          triggerSave={triggerSave}
        />
      </div>
      {questions.slice(1).map((question, index) => (
        <div key={question.id} className="relative">
          <div className="w-full">
            <CreatingQuestion
              part={part}
              questionNumber={index + questionNumberFrom + 1}
              questionGroupNumber={questionNumberFrom}
              onQuestionCreated={handleQuestionCreated}
              triggerSave={triggerSave}
            />
          </div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#F44336",
              position: "absolute",
              top: 0,
              right: 0,
            }}
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

import { useState, useEffect } from "react";
import CreatingQuestion from "./CreatingQuestion";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Question } from "@/entities";
import { sNewTest } from "@/store";
import theme from "@/theme";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
export default function CreatingQuestionGroup({
  part,
  questionNumberFrom,
  onQuestionsCreated,
  onNewQuestionCreated,
  onQuestionDeleted,
}: {
  part: number;
  questionNumberFrom: number;
  onQuestionsCreated: (questions: Question[]) => void;
  onNewQuestionCreated: () => void;
  onQuestionDeleted: () => void;
}) {
  const [questions, setQuestions] = useState<{ id: string; number: number }[]>([
    { id: uuidv4(), number: questionNumberFrom },
  ]);
  const [images, setImages] = useState<File[]>([]);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [createdQuestions, setCreatedQuestions] = useState<Question[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const isAllBlocked = sNewTest.use((v) => v.isSaved);
  useEffect(() => {
    onQuestionsCreated(createdQuestions);
    console.log("Questions created:", createdQuestions);
  }, [isChanged]);

  useEffect(() => {
    if (!isAllBlocked) {
      setCreatedQuestions([]);
    }
  }, [isAllBlocked]);

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
    createdQuestions.forEach((createdQuestion, index) => {
      if (createdQuestion.question_number === question.question_number) {
        createdQuestions[index] = question;
        setIsChanged(!isChanged);
        return;
      }
    });
    createdQuestions.push(question);
    setIsChanged(!isChanged);
  };
  const handleFileInputClick = () => {
    document
      .getElementById(questionNumberFrom + "-question-group-file-input")
      ?.click();
  };
  return (
    <div className="w-3/4 flex flex-col gap-2 py-2">
      {part === 7 ? (
        <div className="flex">
          <input
            id={`${questionNumberFrom}-question-group-file-input`}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setImages(Array.from(e.target.files));
              }
            }}
            style={{ display: "none" }}
            disabled={isAllBlocked}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileInputClick}
            disabled={isAllBlocked}
            startIcon={<AddPhotoAlternateIcon />}
            style={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            Add image file
          </Button>
          <p className="ml-2">{images.length} images selected</p>
        </div>
      ) : null}
      {part === 6 || part === 7 ? (
        <textarea
          placeholder="Type question group's paragraph here"
          onChange={(e) => {
            setParagraphs(e.target.value.split("\n\n"));
          }}
          className="border border-black rounded-sm shadow-md p-1 w-2/3
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          rows={4}
          disabled={isAllBlocked}
        />
      ) : null}
      <div className="flex justify-between gap-4">
        <CreatingQuestion
          part={part}
          questionNumber={questionNumberFrom}
          questionGroupNumber={questionNumberFrom}
          images={images}
          paragraphs={paragraphs}
          onQuestionCreated={handleQuestionCreated}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "transparent",
            textTransform: "none",
            height: "fit-content",
            color: "transparent",
          }}
          disabled={true}
        >
          Delete
        </Button>
      </div>
      {questions.slice(1).map((question, index) => (
        <div key={question.id} className="relative">
          <div className="w-full flex justify-between gap-4">
            <CreatingQuestion
              part={part}
              questionNumber={index + questionNumberFrom + 1}
              questionGroupNumber={questionNumberFrom}
              onQuestionCreated={handleQuestionCreated}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: theme.palette.error.main,
                textTransform: "none",
                height: "fit-content",
              }}
              onClick={() => deleteQuestion(question.id)}
              disabled={isAllBlocked}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="contained"
        style={{
          backgroundColor: "#4CAF50",
          width: "fit-content",
          textTransform: "none",
        }}
        onClick={addQuestion}
        disabled={isAllBlocked}
        endIcon={<ArrowDownwardIcon />}
      >
        Add Question
      </Button>
    </div>
  );
}

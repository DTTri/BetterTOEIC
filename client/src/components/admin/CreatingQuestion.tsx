import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Question } from "@/entities";

export default function CreatingQuestion({
  part,
  questionNumber,
  questionGroupNumber,
  images,
  paragraphs,
  onQuestionCreated,
  triggerSave,
}: {
  part: number;
  questionNumber: number;
  questionGroupNumber?: number;
  images?: string[];
  paragraphs?: string[];
  onQuestionCreated: (question: Question) => void;
  triggerSave: boolean;
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [correctOption, setCorrectOption] = useState(1);
  const [text, setText] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [explanation, setExplanation] = useState("");
  const [image, setImage] = useState<string | null>(null); // for part 1
  const handleMarkCorrect = (option: number) => {
    setCorrectOption(option);
  };

  useEffect(() => {
    if (triggerSave) {
      saveQuestion();
    }
  }, [triggerSave, questionNumber]);

  const saveQuestion = () => {
    const newQuestion: Question = {
      text,
      images,
      passages: paragraphs,
      choices,
      correct_choice: correctOption,
      explanation,
      part,
      question_number: questionNumber,
      question_group_number: questionGroupNumber || 0,
    };
    onQuestionCreated(newQuestion);
  };

  return (
    <form className="w-full flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <p className="text-xl font-medium">Question {questionNumber}:</p>
        {part === 1 ? (
          <input
            disabled={!isEditing}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(URL.createObjectURL(file));
              }
            }}
            multiple={false}
          />
        ) : (part > 2 && part < 6) || part === 7 ? (
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
        ) : null}
      </div>
      <div className="options-container w-1/2 flex flex-col gap-2 pl-2">
        <div className="option flex items-center gap-2">
          <p>a.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[0] = e.target.value;
              setChoices(newChoices);
            }}
          />
          {correctOption !== 1 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(1)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
        <div className="option flex items-center gap-2">
          <p>b.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[1] = e.target.value;
              setChoices(newChoices);
            }}
          />
          {correctOption !== 2 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(2)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
        <div className="option flex items-center gap-2">
          <p>c.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[2] = e.target.value;
              setChoices(newChoices);
            }}
          />
          {correctOption !== 3 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(3)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
        <div className="option flex items-center gap-2">
          <p>d.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[3] = e.target.value;
              setChoices(newChoices);
            }}
          />
          {correctOption !== 4 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(4)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
      </div>
      <textarea
        disabled={!isEditing}
        className="w-full border border-gray-400 p-2 rounded-lg"
        placeholder="Explanation"
        onChange={(e) => setExplanation(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          width: "fit-content",
        }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(!isEditing);
          if (!isEditing) {
            saveQuestion();
          }
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </form>
  );
}

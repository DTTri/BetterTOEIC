import { Button } from "@mui/material";
import { useEffect, useState } from "react";
// use global state to store if user click the Save all questions button, if it's true, then call onQuestionCreated for all questions
export default function CreatingQuestion({
  part,
  questionNumber,
  questionGroupNumber,
  images,
  paragraphs,
  onQuestionCreated,
}: {
  part: number;
  questionNumber: number;
  questionGroupNumber?: number;
  //for question group: if this is the first question of questionGroup, store images and paragraphs[] to this question
  images?: string[];
  paragraphs?: string[];
  onQuestionCreated: () => void; // parameter is the question object (havent implemented yet)
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [correctOption, setCorrectOption] = useState(1);

  const handleMarkCorrect = (option: number) => {
    setCorrectOption(option);
  };

  useEffect(() => {
    if (!isEditing) {
      // Save the question to the global state
      // if(part === 6 or 7 && questionNumber === questionGroupNumber) newQuestion.images = images; newQuestion.paragraphs = paragraphs;
    }
  }, [isEditing]);
  return (
    <form className="w-full flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <p className="text-xl font-medium">Question {questionNumber}:</p>
        {part === 1 ? (
          <input disabled={!isEditing} type="file" accept="image/*" />
        ) : (part > 2 && part < 6) || part === 7 ? (
          <input disabled={!isEditing} type="text" />
        ) : null}
      </div>
      <div className="options-container w-1/2 flex flex-col gap-2 pl-2">
        <div className="option flex items-center gap-2">
          <p>a.</p>
          <input disabled={!isEditing} type="text" />
          {correctOption !== 1 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(1)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
        <div className="option flex items-center gap-2">
          <p>b.</p>
          <input disabled={!isEditing} type="text" />
          {correctOption !== 2 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(2)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
        <div className="option flex items-center gap-2">
          <p>c.</p>
          <input disabled={!isEditing} type="text" />
          {correctOption !== 3 ? (
            <button className="ml-2" onClick={() => handleMarkCorrect(3)}>
              Marked as Correct
            </button>
          ) : null}
        </div>
        <div className="option flex items-center gap-2">
          <p>d.</p>
          <input disabled={!isEditing} type="text" />
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
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </form>
  );
}

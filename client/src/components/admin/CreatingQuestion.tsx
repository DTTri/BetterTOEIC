import { Question } from "@/entities";
import { sNewTest } from "@/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import theme from "@/theme";
import * as motion from "motion/react-client";

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
  images?: File[];
  paragraphs?: string[];
  onQuestionCreated: (question: Question) => void;
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [correctOption, setCorrectOption] = useState(1);
  const [text, setText] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [explanation, setExplanation] = useState("");
  const [image, setImage] = useState<File | null>(null); // for part 1
  const handleMarkCorrect = (option: number) => {
    setCorrectOption(option);
  };

  const isAllBlocked = sNewTest.use((v) => v.isSaved);
  useEffect(() => {
    setIsEditing(true);
    if (isAllBlocked) {
      setIsEditing(false);
    }
  }, [isAllBlocked]);

  useEffect(() => {
    console.log("isAllBlocked", isAllBlocked);
    if (!isEditing) {
      const newQuestion: Question = {
        text,
        imageFiles: part === 1 ? (image ? [image] : undefined) : images,
        passages: paragraphs,
        choices,
        correct_choice: correctOption,
        explanation,
        part,
        question_number: questionNumber,
        question_group_number: questionGroupNumber || 0,
      };
      console.log("Question created:", newQuestion);
      onQuestionCreated(newQuestion);
    } else {
      sNewTest.set((v) => (v.value.isSaved = false));
    }
  }, [isEditing]);
  const handleFileInputClick = () => {
    document.getElementById(questionNumber + "-question-file-input")?.click();
  };
  return (
    <motion.form
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.2, bounce: 0.25 },
      }}
      className="w-full flex flex-col gap-2 "
    >
      <div className="flex w-3/4 gap-4 items-center relative">
        <p className="text-xl font-medium">Question {questionNumber}:</p>
        {part === 1 ? (
          <div className="flex">
            <input
              id={`${questionNumber}-question-file-input`}
              disabled={!isEditing}
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setImage(file);
                }
              }}
              multiple={false}
              style={{ display: "none" }}
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
            <p className="ml-2">{image?.name}</p>
          </div>
        ) : (part > 2 && part < 6) || part === 7 ? (
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => setText(e.target.value)}
            className="border-2 border-black rounded-sm shadow-md p-2 flex-1
          focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        ) : null}
      </div>
      <div className="options-container flex flex-col gap-2 pl-2">
        <div
          className={`option flex items-center gap-2 py-1 ${
            correctOption === 1 ? "bg-Green" : ""
          }`}
        >
          <p>a.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[0] = e.target.value;
              setChoices(newChoices);
            }}
            className="border border-black rounded-sm shadow-md p-1 basis-1/2
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          />
          {correctOption !== 1 && isEditing ? (
            <Button
              style={{
                marginLeft: "4px",
                textTransform: "none",
                fontSize: "0.8rem",
                backgroundColor: theme.palette.success.main,
                color: "green",
                paddingBlock: "0.25rem",
                paddingInline: "0.6rem",
              }}
              // hover effect
              variant="contained"
              onClick={() => handleMarkCorrect(1)}
            >
              Mark as Correct
            </Button>
          ) : null}
        </div>
        <div
          className={`option flex items-center gap-2 py-1 ${
            correctOption === 2 ? "bg-Green" : ""
          }`}
        >
          <p>b.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[1] = e.target.value;
              setChoices(newChoices);
            }}
            className="border border-black rounded-sm shadow-md p-1 basis-1/2
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          />
          {correctOption !== 2 && isEditing ? (
            <Button
              style={{
                marginLeft: "4px",
                textTransform: "none",
                fontSize: "0.8rem",
                backgroundColor: theme.palette.success.main,
                color: "green",
                paddingBlock: "0.25rem",
                paddingInline: "0.6rem",
              }}
              // hover effect
              variant="contained"
              onClick={() => handleMarkCorrect(2)}
            >
              Mark as Correct
            </Button>
          ) : null}
        </div>
        <div
          className={`option flex items-center gap-2 py-1 ${
            correctOption === 3 ? "bg-Green" : ""
          }`}
        >
          <p>c.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[2] = e.target.value;
              setChoices(newChoices);
            }}
            className="border border-black rounded-sm shadow-md p-1 basis-1/2
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          />
          {correctOption !== 3 && isEditing ? (
            <Button
              style={{
                marginLeft: "4px",
                textTransform: "none",
                fontSize: "0.8rem",
                backgroundColor: theme.palette.success.main,
                color: "green",
                paddingBlock: "0.25rem",
                paddingInline: "0.6rem",
              }}
              // hover effect
              variant="contained"
              onClick={() => handleMarkCorrect(3)}
            >
              Mark as Correct
            </Button>
          ) : null}
        </div>
        <div
          className={`option flex items-center gap-2 py-1 ${
            correctOption === 4 ? "bg-Green" : ""
          }`}
        >
          <p>d.</p>
          <input
            disabled={!isEditing}
            type="text"
            onChange={(e) => {
              const newChoices = choices;
              newChoices[3] = e.target.value;
              setChoices(newChoices);
            }}
            className="border border-black rounded-sm shadow-md p-1 basis-1/2
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          />
          {correctOption !== 4 && isEditing ? (
            <Button
              style={{
                marginLeft: "4px",
                textTransform: "none",
                fontSize: "0.8rem",
                backgroundColor: theme.palette.success.main,
                color: "green",
                paddingBlock: "0.25rem",
                paddingInline: "0.6rem",
              }}
              variant="contained"
              onClick={() => handleMarkCorrect(4)}
            >
              Mark as Correct
            </Button>
          ) : null}
        </div>
      </div>
      <textarea
        disabled={!isEditing}
        className=" border border-black rounded-sm shadow-md p-1
          focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
        placeholder="Explanation"
        onChange={(e) => setExplanation(e.target.value)}
        rows={3}
      />
      <Button
        variant="contained"
        color="secondary"
        style={{
          width: "fit-content",
          textTransform: "none",
        }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setIsEditing(!isEditing);
        }}
        disabled={isAllBlocked}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </motion.form>
  );
}

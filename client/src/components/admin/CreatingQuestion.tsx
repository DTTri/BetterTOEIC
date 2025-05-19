import { Question } from "@/entities";
import { sNewTest } from "@/store";
import {
  Button,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageIcon from "@mui/icons-material/Image";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

export default function CreatingQuestion({
  part,
  questionNumber,
  questionGroupNumber,
  images,
  paragraphs,
  onQuestionCreated,
  onDelete,
}: {
  part: number;
  questionNumber: number;
  questionGroupNumber?: number;
  images?: File[];
  paragraphs?: string[];
  onQuestionCreated: (question: Question) => void;
  onDelete?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [correctOption, setCorrectOption] = useState(1);
  const [text, setText] = useState("");
  const [choices, setChoices] = useState<string[]>(["", "", "", ""]);
  const [explanation, setExplanation] = useState("");
  const [image, setImage] = useState<File | null>(null);

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
      onQuestionCreated(newQuestion);
    } else {
      sNewTest.set((v) => (v.value.isSaved = false));
    }
  }, [isEditing]);

  const handleFileInputClick = () => {
    document.getElementById(questionNumber + "-question-file-input")?.click();
  };

  const getPartColor = (part: number) => {
    const colors = {
      1: "#2196F3",
      2: "#4CAF50",
      3: "#FF9800",
      4: "#9C27B0",
      5: "#E91E63",
      6: "#3F51B5",
      7: "#00BCD4",
    };
    return colors[part as keyof typeof colors] || "#2196F3";
  };

  const partColor = getPartColor(part);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", stiffness: 100, damping: 15 },
      }}
      className="w-full"
    >
      <Paper
        elevation={2}
        className="p-4 mb-4 relative overflow-hidden"
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-2px)",
          },
        }}
      >
        <Tooltip title="Delete question">
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={onDelete}
            disabled={isAllBlocked}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              bgcolor: alpha("#f44336", 0.1),
              "&:hover": {
                bgcolor: alpha("#f44336", 0.2),
              },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </IconButton>
        </Tooltip>

        <div className="mb-4">
          <h6 className="text-xl font-semibold mb-2 flex items-center">
            <span className="mr-2">Question {questionNumber}</span>
            {!isEditing && (
              <Chip
                size="small"
                label="Saved"
                color="success"
                icon={<CheckCircleIcon />}
                variant="outlined"
              />
            )}
          </h6>

          {part === 1 ? (
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-sm text-gray-600">Image for this question:</p>
              <div className="flex items-center gap-2">
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
                  variant="outlined"
                  onClick={handleFileInputClick}
                  disabled={!isEditing}
                  startIcon={<AddPhotoAlternateIcon />}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Select Image
                </Button>
                {image ? (
                  <Chip
                    icon={<ImageIcon />}
                    label={image.name}
                    variant="outlined"
                    color="primary"
                    onDelete={isEditing ? () => setImage(null) : undefined}
                  />
                ) : (
                  <p className="italic text-sm text-gray-600">
                    No image selected
                  </p>
                )}
              </div>
            </div>
          ) : (part > 2 && part < 6) || part === 7 ? (
            <TextField
              disabled={!isEditing}
              label="Question Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              className="mb-4"
              placeholder="Enter the question text here"
              required
            />
          ) : null}
        </div>

        <div className="options-container mb-4">
          <p className="text-base mb-2">Answer Options</p>
          <RadioGroup
            value={correctOption}
            onChange={(e) => handleMarkCorrect(parseInt(e.target.value))}
          >
            {["A", "B", "C", "D"].map((option, index) => (
              <Paper
                key={index}
                elevation={1}
                className="mb-2 p-2"
                sx={{
                  bgcolor:
                    correctOption === index + 1
                      ? alpha(partColor, 0.1)
                      : "background.paper",
                  borderLeft:
                    correctOption === index + 1
                      ? `3px solid ${partColor}`
                      : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="flex items-center gap-2">
                  <FormControlLabel
                    value={index + 1}
                    control={
                      <Radio
                        disabled={!isEditing}
                        color="primary"
                        sx={{
                          color:
                            correctOption === index + 1 ? partColor : undefined,
                        }}
                      />
                    }
                    label={`Option ${option}`}
                    sx={{ minWidth: "120px" }}
                  />
                  <TextField
                    disabled={!isEditing}
                    value={choices[index] || ""}
                    onChange={(e) => {
                      const newChoices = [...choices];
                      newChoices[index] = e.target.value;
                      setChoices(newChoices);
                    }}
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder={`Enter option ${option}`}
                    className="transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </Paper>
            ))}
          </RadioGroup>
        </div>

        <div className="explanation-container mb-4">
          <TextField
            disabled={!isEditing}
            label="Explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            placeholder="Provide an explanation for the correct answer"
            className="transition-all duration-300 hover:shadow-md"
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="contained"
            color={isEditing ? "primary" : "secondary"}
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
            disabled={isAllBlocked}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              bgcolor: isEditing ? partColor : undefined,
              "&:hover": {
                bgcolor: isEditing ? alpha(partColor, 0.8) : undefined,
              },
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </Paper>
    </motion.div>
  );
}

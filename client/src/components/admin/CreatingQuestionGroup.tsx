import { useState, useEffect } from "react";
import CreatingQuestion from "./CreatingQuestion";
import { Button, Paper, TextField, Chip, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Question } from "@/entities";
import { sNewTest } from "@/store";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

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

  const getPartTitle = (part: number) => {
    const titles = {
      1: "Photographs",
      2: "Question-Response",
      3: "Conversations",
      4: "Short Talks",
      5: "Incomplete Sentences",
      6: "Text Completion",
      7: "Reading Comprehension",
    };
    return titles[part as keyof typeof titles] || "";
  };

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
      {(part === 6 || part === 7) && (
        <Paper
          elevation={3}
          className="p-4 mb-6"
          sx={{
            borderLeft: `4px solid ${partColor}`,
            bgcolor: alpha(partColor, 0.05),
          }}
        >
          <h6 className="text-lg font-medium mb-3 flex items-center">
            <TextSnippetIcon className="mr-2" />
            Shared Text for Part {part}: {getPartTitle(part)}
          </h6>

          <TextField
            label="Passage Text"
            placeholder="Type question group's paragraph here. Use double line breaks to separate paragraphs."
            onChange={(e) => {
              setParagraphs(e.target.value.split("\n\n"));
            }}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            disabled={isAllBlocked}
            className="mb-2"
          />

          <p className="mt-1 text-sm text-gray-600">
            {paragraphs.length > 0 && paragraphs[0] !== ""
              ? `${paragraphs.length} paragraph(s) detected`
              : "No paragraphs added yet"}
          </p>
        </Paper>
      )}

      {part === 7 && (
        <Paper
          elevation={3}
          className="p-4 mb-6"
          sx={{
            borderLeft: `4px solid ${partColor}`,
            bgcolor: alpha(partColor, 0.05),
          }}
        >
          <h6
            className="text-lg font-medium mb-3 flex items-center"
            color={partColor}
          >
            <ImageIcon className="mr-2" />
            Shared Images for Part 7: Reading Comprehension
          </h6>

          <div className="flex flex-wrap items-center gap-3 mb-3">
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
              variant="outlined"
              onClick={handleFileInputClick}
              disabled={isAllBlocked}
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ borderRadius: 2 }}
            >
              Select Images
            </Button>

            {images.length > 0 ? (
              <Box className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                  <Chip
                    key={index}
                    icon={<ImageIcon />}
                    label={img.name}
                    variant="outlined"
                    color="primary"
                    onDelete={
                      !isAllBlocked
                        ? () => {
                            const newImages = [...images];
                            newImages.splice(index, 1);
                            setImages(newImages);
                          }
                        : undefined
                    }
                  />
                ))}
              </Box>
            ) : (
              <p className="italic text-sm text-gray-600">No images selected</p>
            )}
          </div>
        </Paper>
      )}

      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={question.id} className="relative">
            <CreatingQuestion
              part={part}
              questionNumber={index + questionNumberFrom}
              questionGroupNumber={questionNumberFrom}
              images={images}
              paragraphs={paragraphs}
              onQuestionCreated={handleQuestionCreated}
              onDelete={() => deleteQuestion(question.id)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          onClick={addQuestion}
          disabled={isAllBlocked}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            borderRadius: 28,
            px: 3,
            py: 1,
            bgcolor: partColor,
            "&:hover": {
              bgcolor: alpha(partColor, 0.8),
            },
          }}
        >
          Add Question
        </Button>
      </div>
    </motion.div>
  );
}

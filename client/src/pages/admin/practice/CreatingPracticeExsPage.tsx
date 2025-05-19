import { CreatingQuestionGroup } from "@/components";
import { Question } from "@/entities";
import CreatePracticeTestDTO from "@/entities/DTOS/CreatePracticeTestDTO";
import http from "@/services/http";
import practiceService from "@/services/practiceService";
import { sNewTest } from "@/store";
import {
  Button,
  Paper,
  Chip,
  Tooltip,
  IconButton,
  alpha,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import { toast } from "react-toastify";

export default function CreatingPracticeExsPage() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const nav = useNavigate();
  const [part, setPart] = useState<number>(1);
  const [mainAudio, setMainAudio] = useState<File | null>(null);
  const [questionGroups, setQuestionGroups] = useState<
    { id: string; number: number }[]
  >([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);
  const deleteQuestionGroup = (id: string) => {
    setQuestionGroups(
      questionGroups.filter((questionGroup) => questionGroup.id !== id)
    );
  };
  const [questions, setQuestions] = useState<Question[]>([]);
  const isAllBlocked = sNewTest.use((v) => v.isSaved);
  useEffect(() => {
    if (!isAllBlocked) {
      setQuestions([]);
    }
  }, [isAllBlocked]);
  const handleQuestionsCreated = (newQuestions: Question[]) => {
    newQuestions.forEach((newQuestion) => {
      if (newQuestion.question_number > questions.length) {
        questions.push(newQuestion);
      } else {
        questions[newQuestion.question_number - 1] = newQuestion;
      }
    });
  };
  const handleChangeBlockStatus = () => {
    sNewTest.set((v) => (v.value.isSaved = !v.value.isSaved));
  };
  const uploadFile = async (file: File) => {
    try {
      const response = await http.get(
        `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
      );
      //console.log(response);
      console.log(response);
      const result = await fetch(response.presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      console.log(result);
      if (!result.ok) {
        toast("Failed to upload file", {
          type: "error",
        });

        return "";
      }
      return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
    } catch (error) {
      toast("Failed to upload file: " + error, {
        type: "error",
      });
      return "";
    }
  };

  const handleCreatePracticeTest = async () => {
    if (part < 5 && !mainAudio) {
      toast("Please upload main audio", {
        type: "error",
      });
      return;
    }
    const mainAudioUrl =
      part < 5 && mainAudio ? await uploadFile(mainAudio) : "";
    if (part < 5 && mainAudioUrl === "") {
      return;
    }
    const uploadedQuestionPromises = questions.map(async (question) => {
      let imageUrls: string[] = [];
      if (question.imageFiles) {
        imageUrls = await Promise.all(
          question.imageFiles.map(async (image) => await uploadFile(image))
        );
        imageUrls.forEach((imageUrl) => {
          if (imageUrl === "") {
            return null;
          }
        });
        question.images = imageUrls;
      }
      return question;
    });
    const uploadedQuestions = await Promise.all(uploadedQuestionPromises);
    uploadedQuestions.forEach((uploadedQuestion) => {
      if (uploadedQuestion === null) {
        return;
      }
    });
    try {
      const newPracticeTest: CreatePracticeTestDTO = {
        part: part,
        questions: uploadedQuestions,
        created_by: "admin",
        main_audio: mainAudioUrl,
      };
      console.log(newPracticeTest);
      const res = await practiceService.createPracticeTest(newPracticeTest);
      console.log(res);
      if (res.EC === 0) {
        toast("Create practice test successfully", {
          type: "success",
        });

        nav("/admin/practice");
      } else {
        toast("Failed to create practice test", {
          type: "error",
        });
      }
    } catch (err) {
      toast("Failed to create practice test: " + err, {
        type: "error",
      });
    }
  };
  const handleFileInputClick = () => {
    document.getElementById("file-input")?.click();
  };
  return (
    <div className="creating-test-container max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Create New Practice Exercise
      </h1>
      <Paper elevation={2} className="p-6 mb-8 rounded-xl shadow-lg bg-gray-50">
        <h2 className="text-xl text-gray-700 font-medium mb-4">
          Exercise Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium text-gray-700">Part:</h3>
            <TextField
              select
              value={part}
              onChange={(e) => {
                setPart(Number(e.target.value));
                setQuestions([]);
                setQuestionGroups([
                  {
                    id: uuidv4(),
                    number: 1,
                  },
                ]);
                setMainAudio(null);
              }}
              disabled={isAllBlocked}
              variant="outlined"
              fullWidth
              className="transition-all duration-300 hover:shadow-md"
            >
              <MenuItem value={1}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  Part 1: Photographs
                </div>
              </MenuItem>
              <MenuItem value={2}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  Part 2: Question-Response
                </div>
              </MenuItem>
              <MenuItem value={3}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  Part 3: Conversations
                </div>
              </MenuItem>
              <MenuItem value={4}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                  Part 4: Talks
                </div>
              </MenuItem>
              <MenuItem value={5}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  Part 5: Incomplete Sentences
                </div>
              </MenuItem>
              <MenuItem value={6}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                  Part 6: Text Completion
                </div>
              </MenuItem>
              <MenuItem value={7}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
                  Part 7: Reading Comprehension
                </div>
              </MenuItem>
            </TextField>
          </div>
        </div>

        {part < 5 && (
          <div className="mb-6">
            <h3 className="text-lg mb-2 text-gray-700 font-medium">
              Listening Audio File
            </h3>
            <div className="flex items-center gap-4">
              <input
                id="file-input"
                type="file"
                accept="audio/*"
                multiple={false}
                onChange={(e) => {
                  if (e.target.files) {
                    setMainAudio(e.target.files[0]);
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
                startIcon={<AudiotrackIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Select Audio File
              </Button>
              {mainAudio ? (
                <Chip
                  label={mainAudio.name}
                  variant="outlined"
                  color="primary"
                  className="animate-fadeIn"
                />
              ) : (
                <span className="text-sm text-gray-500 italic">
                  No file selected
                </span>
              )}
            </div>
          </div>
        )}
      </Paper>
      <div className="grid grid-cols-1 gap-8">
        {questionGroups.map((questionGroup, index) => (
          <Paper
            elevation={3}
            className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg relative"
            key={questionGroup.id}
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="mb-4 flex items-center text-blue-700 text-lg font-medium">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
                    {index + 1}
                  </div>
                  Question Group {index + 1}
                </h3>

                <CreatingQuestionGroup
                  key={questionGroup.id}
                  part={part}
                  questionNumberFrom={
                    questionGroups
                      .slice(0, index)
                      .reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) + 1
                  }
                  onNewQuestionCreated={() => {
                    setQuestionGroups([
                      ...questionGroups.slice(0, index),
                      {
                        ...questionGroups[index],
                        number: questionGroups[index].number + 1,
                      },
                      ...questionGroups.slice(index + 1),
                    ]);
                  }}
                  onQuestionDeleted={() => {
                    setQuestionGroups([
                      ...questionGroups.slice(0, index),
                      {
                        ...questionGroups[index],
                        number: questionGroups[index].number - 1,
                      },
                      ...questionGroups.slice(index + 1),
                    ]);
                  }}
                  onQuestionsCreated={handleQuestionsCreated}
                />
              </div>

              {index > 0 && (
                <IconButton
                  aria-label="delete group"
                  size="medium"
                  color="error"
                  onClick={() => {
                    deleteQuestionGroup(questionGroup.id);
                  }}
                  className="absolute top-0 right-0 min-w-0 w-10 h-10 rounded-full p-0"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 10,

                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: alpha("#f44336", 0.08),
                    },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </IconButton>
              )}
            </div>
          </Paper>
        ))}

        {(part === 3 || part === 4 || part === 6 || part === 7) && (
          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setQuestionGroups([
                  ...questionGroups,
                  {
                    id: uuidv4(),
                    number: 1,
                  },
                ]);
              }}
              className="transition-all duration-300 hover:shadow-lg px-6 py-2 rounded-full"
              endIcon={<ArrowDownwardIcon />}
            >
              Add Question Group
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Tooltip title={isAllBlocked ? "Unsave changes" : "Save all changes"}>
          <Button
            variant="contained"
            color={isAllBlocked ? "error" : "secondary"}
            onClick={handleChangeBlockStatus}
            startIcon={<SaveIcon />}
            className="transition-all duration-300 hover:shadow-lg"
            size="large"
          >
            {isAllBlocked ? "Unsave" : "Save All"}
          </Button>
        </Tooltip>
        <Tooltip title="Create exercise">
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePracticeTest}
              disabled={!isAllBlocked}
              startIcon={<CreateIcon />}
              className="transition-all duration-300 hover:shadow-lg"
              size="large"
            >
              Create Exercise
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

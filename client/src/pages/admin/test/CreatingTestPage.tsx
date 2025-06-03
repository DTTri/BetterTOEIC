import { CreatingQuestionGroup } from "@/components";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Tooltip,
  Chip,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import testService from "@/services/testService";
import { Question } from "@/entities";
import CreateTestDTO from "@/entities/DTOS/CreateTestDTO";
import { sNewTest, sUser } from "@/store";
import { useNavigate } from "react-router-dom";
import http from "@/services/http";
import { testStore } from "@/store/testStore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { toast } from "react-toastify";

export default function CreatingTestPage() {
  const nav = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [numberOfQuestionsPart1, setNumberOfQuestionsPart1] = useState(1);
  const [numberOfQuestionsPart2, setNumberOfQuestionsPart2] = useState(1);
  const [questionGroupsPart3, setQuestionGroupsPart3] = useState<
    { id: string; number: number }[]
  >([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);
  const [questionGroupsPart4, setQuestionGroupsPart4] = useState<
    { id: string; number: number }[]
  >([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);
  const [numberOfQuestionsPart5, setNumberOfQuestionsPart5] = useState(1);
  const [questionGroupsPart6, setQuestionGroupsPart6] = useState<
    { id: string; number: number }[]
  >([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);
  const [questionGroupsPart7, setQuestionGroupsPart7] = useState<
    { id: string; number: number }[]
  >([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);

  const deleteQuestionGroup = (id: string, part: number) => {
    switch (part) {
      case 3:
        setQuestionGroupsPart3(
          questionGroupsPart3.filter((questionGroup) => questionGroup.id !== id)
        );
        break;
      case 4:
        setQuestionGroupsPart4(
          questionGroupsPart4.filter((questionGroup) => questionGroup.id !== id)
        );
        break;
      case 6:
        setQuestionGroupsPart6(
          questionGroupsPart6.filter((questionGroup) => questionGroup.id !== id)
        );
        break;
      case 7:
        setQuestionGroupsPart7(
          questionGroupsPart7.filter((questionGroup) => questionGroup.id !== id)
        );
        break;
    }
  };

  const [testType, setTestType] = useState("full");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainAudio, setMainAudio] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState<Question[]>([]);

  const uploadFile = async (file: File) => {
    try {
      const response = await http.get(
        `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
      );
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

  const handleCreateTest = async () => {
    console.log(
      "Creating test: " +
        title +
        " - " +
        description +
        " - " +
        difficulty +
        " - " +
        mainAudio +
        " - " +
        testType +
        " - " +
        questions.length
    );
    if (!title || !description || !difficulty || !mainAudio) {
      toast("Please fill all fields", {
        type: "error",
      });

      return;
    }

    if (testType === "full" && questions.length < 200) {
      toast("Full test must have 200 questions", {
        type: "error",
      });

      return;
    }
    const mainAudioUrl = await uploadFile(mainAudio);
    if (!mainAudioUrl) {
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

    const newTest: CreateTestDTO = {
      title,
      description,
      main_audio: mainAudioUrl,
      isMiniTest: testType === "mini",
      created_by: sUser.value.info.name,
      difficulty: difficulty,
      questions: uploadedQuestions,
    };
    createTest(newTest);
  };

  const createTest = async (newTest: CreateTestDTO) => {
    try {
      console.log("Creating test:", newTest);
      const response = await testService.createTest(newTest);
      if (response.EC === 0) {
        toast("Test created successfully", {
          type: "success",
        });
        testStore.set((prev) => prev.value.testList.push(response.DT));
        nav("/admin/test");
      } else {
        toast("Failed to create test: " + response.EM, {
          type: "error",
        });
      }
    } catch (error) {
      toast("Failed to create test: " + error, {
        type: "error",
      });
    }
  };

  const handleFileInputClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div className="creating-test-container max-w-7xl mx-auto px-4 py-6">
      <h4 className="text-3xl font-semibold">Create New TOEIC Test</h4>
      <Paper elevation={2} className="p-6 mb-8 rounded-xl shadow-lg bg-gray-50">
        <h6 className=" text-gray-700 font-medium mb-4 text-xl">
          Test Information
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormControl fullWidth variant="outlined">
            <TextField
              id="test-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isAllBlocked}
              placeholder="Enter test title"
              variant="outlined"
              fullWidth
              required
              label="Title"
              className="transition-all duration-300 hover:shadow-md"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <TextField
              id="test-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isAllBlocked}
              placeholder="Enter test description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              label="Description"
              className="transition-all duration-300 hover:shadow-md"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={isAllBlocked}
              label="Difficulty"
              className="transition-all duration-300 hover:shadow-md"
            >
              <MenuItem value="easy">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  Easy
                </div>
              </MenuItem>
              <MenuItem value="medium">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  Medium
                </div>
              </MenuItem>
              <MenuItem value="hard">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  Hard
                </div>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="test-type-label">Test Type</InputLabel>
            <Select
              labelId="test-type-label"
              id="test-type-select"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              disabled={isAllBlocked}
              label="Test Type"
              className="transition-all duration-300 hover:shadow-md"
            >
              <MenuItem value="full">Full Test (200 questions)</MenuItem>
              <MenuItem value="mini">Mini Test</MenuItem>
            </Select>
            <FormHelperText>
              {testType === "full"
                ? "A complete TOEIC test with 200 questions"
                : "A shorter version of the TOEIC test"}
            </FormHelperText>
          </FormControl>
        </div>

        <div>
          <p className="text-lg mb-2 text-gray-700">Listening Audio File</p>
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
              <p className="text-sm text-gray-500 italic">No file selected</p>
            )}
          </div>
        </div>
      </Paper>
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-8">
          <Paper
            elevation={3}
            className="p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-blue-700">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-700 font-bold">
                1
              </div>
              Part 1: Photographs
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions 1-6: Look at the picture and listen to the four
              statements. Choose the statement that best describes the picture.
            </p>
            <div className="p-4 rounded-lg">
              <CreatingQuestionGroup
                part={1}
                questionNumberFrom={1}
                onNewQuestionCreated={() => {
                  setNumberOfQuestionsPart1(numberOfQuestionsPart1 + 1);
                }}
                onQuestionDeleted={() => {
                  setNumberOfQuestionsPart1(numberOfQuestionsPart1 - 1);
                }}
                onQuestionsCreated={handleQuestionsCreated}
              />
            </div>
          </Paper>

          <Paper
            elevation={3}
            className="p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-green-700">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 text-green-700 font-bold">
                2
              </div>
              Part 2: Question-Response
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions {numberOfQuestionsPart1 + 1}-
              {numberOfQuestionsPart1 + 25}: Listen to the question and three
              responses. Choose the response that best answers the question.
            </p>
            <div className="p-4 rounded-lg">
              <CreatingQuestionGroup
                part={2}
                questionNumberFrom={numberOfQuestionsPart1 + 1}
                onNewQuestionCreated={() => {
                  setNumberOfQuestionsPart2(numberOfQuestionsPart2 + 1);
                }}
                onQuestionDeleted={() => {
                  setNumberOfQuestionsPart2(numberOfQuestionsPart2 - 1);
                }}
                onQuestionsCreated={handleQuestionsCreated}
              />
            </div>
          </Paper>

          <Paper
            elevation={3}
            className="p-6 border-l-4 border-amber-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-amber-700">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2 text-amber-700 font-bold">
                3
              </div>
              Part 3: Conversations
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions {numberOfQuestionsPart1 + numberOfQuestionsPart2 + 1}-
              {numberOfQuestionsPart1 + numberOfQuestionsPart2 + 39}: Listen to
              a conversation and answer the questions.
            </p>
            <div className="p-4 rounded-lg mb-4">
              {questionGroupsPart3.map((questionGroup, index) => (
                <div
                  className="mb-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0 relative"
                  key={questionGroup.id}
                >
                  <Tooltip title="Delete conversation group">
                    <IconButton
                      aria-label="delete group"
                      size="medium"
                      color="error"
                      onClick={() => {
                        deleteQuestionGroup(questionGroup.id, 3);
                      }}
                      disabled={isAllBlocked}
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
                  </Tooltip>

                  <div className="flex items-center mb-3">
                    <div className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-base font-medium">
                      Conversation Group {index + 1}
                    </p>
                  </div>
                  <CreatingQuestionGroup
                    part={3}
                    questionNumberFrom={
                      numberOfQuestionsPart1 +
                      numberOfQuestionsPart2 +
                      questionGroupsPart3
                        .slice(0, index)
                        .reduce(
                          (acc, questionGroup) => acc + questionGroup.number,
                          0
                        ) +
                      1
                    }
                    onNewQuestionCreated={() => {
                      setQuestionGroupsPart3([
                        ...questionGroupsPart3.slice(0, index),
                        {
                          ...questionGroupsPart3[index],
                          number: questionGroupsPart3[index].number + 1,
                        },
                        ...questionGroupsPart3.slice(index + 1),
                      ]);
                    }}
                    onQuestionDeleted={() => {
                      setQuestionGroupsPart3([
                        ...questionGroupsPart3.slice(0, index),
                        {
                          ...questionGroupsPart3[index],
                          number: questionGroupsPart3[index].number - 1,
                        },
                        ...questionGroupsPart3.slice(index + 1),
                      ]);
                    }}
                    onQuestionsCreated={handleQuestionsCreated}
                  />
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setQuestionGroupsPart3([
                      ...questionGroupsPart3,
                      {
                        id: uuidv4(),
                        number: 1,
                      },
                    ]);
                  }}
                  disabled={isAllBlocked}
                  endIcon={<ArrowDownwardIcon />}
                  className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  Add Conversation Group
                </Button>
              </div>
            </div>
          </Paper>

          <Paper
            elevation={3}
            className="p-6 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-purple-700">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2 text-purple-700 font-bold">
                4
              </div>
              Part 4: Short Talks
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions{" "}
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                1}
              -
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                30}
              : Listen to a short talk and answer the questions.
            </p>
            <div className="p-4 rounded-lg mb-4">
              {questionGroupsPart4.map((questionGroup, index) => (
                <div
                  className="mb-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0 relative"
                  key={questionGroup.id}
                >
                  <Tooltip title="Delete short talk group">
                    <IconButton
                      aria-label="delete group"
                      size="medium"
                      color="error"
                      onClick={() => {
                        deleteQuestionGroup(questionGroup.id, 4);
                      }}
                      disabled={isAllBlocked}
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
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </IconButton>
                  </Tooltip>

                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-base font-medium">
                      Short Talk Group {index + 1}
                    </p>
                  </div>
                  <CreatingQuestionGroup
                    key={questionGroup.id}
                    part={4}
                    questionNumberFrom={
                      numberOfQuestionsPart1 +
                      numberOfQuestionsPart2 +
                      questionGroupsPart3.reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) +
                      questionGroupsPart4
                        .slice(0, index)
                        .reduce(
                          (acc, questionGroup) => acc + questionGroup.number,
                          0
                        ) +
                      1
                    }
                    onNewQuestionCreated={() => {
                      setQuestionGroupsPart4([
                        ...questionGroupsPart4.slice(0, index),
                        {
                          ...questionGroupsPart4[index],
                          number: questionGroupsPart4[index].number + 1,
                        },
                        ...questionGroupsPart4.slice(index + 1),
                      ]);
                    }}
                    onQuestionDeleted={() => {
                      setQuestionGroupsPart4([
                        ...questionGroupsPart4.slice(0, index),
                        {
                          ...questionGroupsPart4[index],
                          number: questionGroupsPart4[index].number - 1,
                        },
                        ...questionGroupsPart4.slice(index + 1),
                      ]);
                    }}
                    onQuestionsCreated={handleQuestionsCreated}
                  />
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setQuestionGroupsPart4([
                      ...questionGroupsPart4,
                      {
                        id: uuidv4(),
                        number: 1,
                      },
                    ]);
                  }}
                  disabled={isAllBlocked}
                  endIcon={<ArrowDownwardIcon />}
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  Add Short Talk Group
                </Button>
              </div>
            </div>
          </Paper>

          <Paper
            elevation={3}
            className="p-6 border-l-4 border-pink-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-pink-700">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-2 text-pink-700 font-bold">
                5
              </div>
              Part 5: Incomplete Sentences
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions{" "}
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                questionGroupsPart4.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                1}
              -
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                questionGroupsPart4.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                30}
              : Choose the word or phrase that best completes the sentence.
            </p>
            <div className="p-4 rounded-lg">
              <CreatingQuestionGroup
                part={5}
                questionNumberFrom={
                  numberOfQuestionsPart1 +
                  numberOfQuestionsPart2 +
                  questionGroupsPart3.reduce(
                    (acc, questionGroup) => acc + questionGroup.number,
                    0
                  ) +
                  questionGroupsPart4.reduce(
                    (acc, questionGroup) => acc + questionGroup.number,
                    0
                  ) +
                  1
                }
                onNewQuestionCreated={() => {
                  setNumberOfQuestionsPart5(numberOfQuestionsPart5 + 1);
                }}
                onQuestionDeleted={() => {
                  setNumberOfQuestionsPart5(numberOfQuestionsPart5 - 1);
                }}
                onQuestionsCreated={handleQuestionsCreated}
              />
            </div>
          </Paper>

          <Paper
            elevation={3}
            className="p-6 border-l-4 border-indigo-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-indigo-700">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 text-indigo-700 font-bold">
                6
              </div>
              Part 6: Text Completion
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions{" "}
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                questionGroupsPart4.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                numberOfQuestionsPart5 +
                1}
              -
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                questionGroupsPart4.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                numberOfQuestionsPart5 +
                16}
              : Read the text and fill in the blanks.
            </p>
            <div className="p-4 rounded-lg mb-4">
              {questionGroupsPart6.map((questionGroup, index) => (
                <div
                  className="mb-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0 relative"
                  key={questionGroup.id}
                >
                  <Tooltip title="Delete text completion group">
                    <IconButton
                      aria-label="delete group"
                      size="medium"
                      color="error"
                      onClick={() => {
                        deleteQuestionGroup(questionGroup.id, 6);
                      }}
                      disabled={isAllBlocked}
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
                  </Tooltip>

                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-base font-medium">
                      Text Completion Group {index + 1}
                    </p>
                  </div>
                  <CreatingQuestionGroup
                    key={questionGroup.id}
                    part={6}
                    questionNumberFrom={
                      numberOfQuestionsPart1 +
                      numberOfQuestionsPart2 +
                      questionGroupsPart3.reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) +
                      questionGroupsPart4.reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) +
                      numberOfQuestionsPart5 +
                      questionGroupsPart6
                        .slice(0, index)
                        .reduce(
                          (acc, questionGroup) => acc + questionGroup.number,
                          0
                        ) +
                      1
                    }
                    onNewQuestionCreated={() => {
                      setQuestionGroupsPart6([
                        ...questionGroupsPart6.slice(0, index),
                        {
                          ...questionGroupsPart6[index],
                          number: questionGroupsPart6[index].number + 1,
                        },
                        ...questionGroupsPart6.slice(index + 1),
                      ]);
                    }}
                    onQuestionDeleted={() => {
                      setQuestionGroupsPart6([
                        ...questionGroupsPart6.slice(0, index),
                        {
                          ...questionGroupsPart6[index],
                          number: questionGroupsPart6[index].number - 1,
                        },
                        ...questionGroupsPart6.slice(index + 1),
                      ]);
                    }}
                    onQuestionsCreated={handleQuestionsCreated}
                  />
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setQuestionGroupsPart6([
                      ...questionGroupsPart6,
                      {
                        id: uuidv4(),
                        number: 1,
                      },
                    ]);
                  }}
                  disabled={isAllBlocked}
                  endIcon={<ArrowDownwardIcon />}
                  className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                >
                  Add Text Completion Group
                </Button>
              </div>
            </div>
          </Paper>

          <Paper
            elevation={3}
            className="p-6 border-l-4 border-cyan-500 transition-all duration-300 hover:shadow-lg"
          >
            <h6 className="text-xl font-medium mb-4 flex items-center text-cyan-700">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center mr-2 text-cyan-700 font-bold">
                7
              </div>
              Part 7: Reading Comprehension
            </h6>
            <p className="text-sm mb-4 text-gray-600 italic">
              Questions{" "}
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                questionGroupsPart4.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                numberOfQuestionsPart5 +
                questionGroupsPart6.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                1}
              -
              {numberOfQuestionsPart1 +
                numberOfQuestionsPart2 +
                questionGroupsPart3.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                questionGroupsPart4.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                numberOfQuestionsPart5 +
                questionGroupsPart6.reduce(
                  (acc, questionGroup) => acc + questionGroup.number,
                  0
                ) +
                54}
              : Read the passages and answer the questions.
            </p>
            <div className="p-4 rounded-lg mb-4">
              {questionGroupsPart7.map((questionGroup, index) => (
                <div
                  className="mb-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0 relative"
                  key={questionGroup.id}
                >
                  <Tooltip title="Delete reading passage group">
                    <IconButton
                      aria-label="delete group"
                      size="medium"
                      color="error"
                      onClick={() => {
                        deleteQuestionGroup(questionGroup.id, 7);
                      }}
                      disabled={isAllBlocked}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 10,

                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: alpha("#f44336", 0.08),
                        },
                        "&.Mui-disabled": {
                          borderColor: alpha("#f44336", 0.2),
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
                  </Tooltip>

                  <div className="flex items-center mb-3">
                    <div className="bg-cyan-100 text-cyan-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-base font-medium">
                      Reading Passage Group {index + 1}
                    </p>
                  </div>
                  <CreatingQuestionGroup
                    key={questionGroup.id}
                    part={7}
                    questionNumberFrom={
                      numberOfQuestionsPart1 +
                      numberOfQuestionsPart2 +
                      questionGroupsPart3.reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) +
                      questionGroupsPart4.reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) +
                      numberOfQuestionsPart5 +
                      questionGroupsPart6.reduce(
                        (acc, questionGroup) => acc + questionGroup.number,
                        0
                      ) +
                      questionGroupsPart7
                        .slice(0, index)
                        .reduce(
                          (acc, questionGroup) => acc + questionGroup.number,
                          0
                        ) +
                      1
                    }
                    onNewQuestionCreated={() => {
                      setQuestionGroupsPart7([
                        ...questionGroupsPart7.slice(0, index),
                        {
                          ...questionGroupsPart7[index],
                          number: questionGroupsPart7[index].number + 1,
                        },
                        ...questionGroupsPart7.slice(index + 1),
                      ]);
                    }}
                    onQuestionDeleted={() => {
                      setQuestionGroupsPart7([
                        ...questionGroupsPart7.slice(0, index),
                        {
                          ...questionGroupsPart7[index],
                          number: questionGroupsPart7[index].number - 1,
                        },
                        ...questionGroupsPart7.slice(index + 1),
                      ]);
                    }}
                    onQuestionsCreated={handleQuestionsCreated}
                  />
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setQuestionGroupsPart7([
                      ...questionGroupsPart7,
                      {
                        id: uuidv4(),
                        number: 1,
                      },
                    ]);
                  }}
                  disabled={isAllBlocked}
                  endIcon={<ArrowDownwardIcon />}
                  className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
                >
                  Add Reading Passage Group
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="mx-auto flex items-center gap-4">
        <Tooltip
          title={
            isAllBlocked ? "Unsave changes" : "Save all changes to create test"
          }
        >
          <Button
            variant="contained"
            color={isAllBlocked ? "error" : "secondary"}
            onClick={handleChangeBlockStatus}
            className="mr-2"
            startIcon={<SaveIcon />}
          >
            {isAllBlocked ? "Unsave" : "Save all"}
          </Button>
        </Tooltip>
        <Tooltip title="Create test">
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTest}
              disabled={!isAllBlocked}
              startIcon={<CreateIcon />}
            >
              Create Test
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

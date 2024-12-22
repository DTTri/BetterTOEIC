import { CreatingQuestionGroup } from "@/components";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import testService from "@/services/testService";
import { Question } from "@/entities";
import CreateTestDTO from "@/entities/DTOS/CreateTestDTO";
import { sNewTest, sUser } from "@/store";
import { useNavigate } from "react-router-dom";
import http from "@/services/http";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { testStore } from "@/store/testStore";
import theme from "@/theme";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toast } from "react-toastify";
import { error } from "console";
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
    <div className="w-full h-full my-4 mr-4 rounded-xl bg-white text-black flex flex-col gap-4 p-6">
      <h2 className="text-3xl font-bold">NEW TEST</h2>
      <hr />
      <div className="w-1/2 items-start flex justify-start gap-4">
        <p className="text-2xl font-semibold basis-1/3">Title:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isAllBlocked}
          placeholder="Typing the title"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1
          focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
          "
        />
      </div>
      <div className="w-1/2 items-start flex justify-start gap-4">
        <p className="text-2xl font-semibold basis-1/3">Description:</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isAllBlocked}
          placeholder="Typing the description"
          className="border-2 border-black rounded-sm shadow-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
      <div className="w-1/2 items-start flex justify-start gap-4">
        <p className="text-2xl font-semibold basis-1/3">Difficulty:</p>
        {/* <input
          type="text"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isAllBlocked}
        /> */}
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isAllBlocked}
          value={difficulty}
          className="bg-gray-50 border border-black rounded-sm shadow-sm p-2 basis-1/3 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="w-1/2 items-start flex justify-start gap-4">
        <p className="text-2xl font-semibold basis-1/3">Type:</p>
        <select
          onChange={(e) => setTestType(e.target.value)}
          disabled={isAllBlocked}
          className="bg-gray-50 border border-black rounded-sm shadow-sm p-2 basis-1/3 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
          value={testType}
        >
          <option value="full">Full Test</option>
          <option value="mini">Mini Test</option>
        </select>
      </div>
      <div className="audio w-1/2 items-start flex justify-start gap-4 mb-4">
        <p className="text-2xl font-semibold basis-1/3">Listening Audio:</p>
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
          startIcon={<AddPhotoAlternateIcon />}
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Add audio file
        </Button>
        <p>{mainAudio?.name}</p>
      </div>
      <div className="part-1 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 1</p>
        <CreatingQuestionGroup
          part={1}
          questionNumberFrom={1}
          onNewQuestionCreated={() => {
            setNumberOfQuestionsPart1(numberOfQuestionsPart1 + 1);
            console.log("new question created");
          }}
          onQuestionDeleted={() => {
            setNumberOfQuestionsPart1(numberOfQuestionsPart1 - 1);
            console.log("question deleted");
          }}
          onQuestionsCreated={handleQuestionsCreated}
        />
      </div>
      <div className="part-2 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 2</p>
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
      <div className="part-3 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 3</p>
        {questionGroupsPart3.map((questionGroup, index) => (
          <div
            className="flex justify-start items-start border-b-2 border-gray-300"
            key={questionGroup.id}
          >
            <div className="w-5/6">
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
            <Button
              variant="contained"
              onClick={() => {
                deleteQuestionGroup(questionGroup.id, 3);
              }}
              style={{
                backgroundColor: "#F44336",
                width: "fit-content",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              disabled={isAllBlocked}
            >
              Delete Group
            </Button>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            variant="contained"
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
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: "black",
              textTransform: "none",
              width: "fit-content",
            }}
            endIcon={<ArrowDownwardIcon />}
          >
            Add Question Group
          </Button>
        </div>
      </div>
      <div className="part-4 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 4</p>
        {questionGroupsPart4.map((questionGroup, index) => (
          <div
            className="flex justify-start items-start border-b-2 border-gray-300"
            key={questionGroup.id}
          >
            <div className="w-5/6">
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
            <Button
              variant="contained"
              onClick={() => {
                deleteQuestionGroup(questionGroup.id, 4);
              }}
              style={{
                backgroundColor: "#F44336",
                width: "fit-content",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              disabled={isAllBlocked}
            >
              Delete Group
            </Button>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
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
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: "black",
              textTransform: "none",
              width: "fit-content",
            }}
            endIcon={<ArrowDownwardIcon />}
          >
            Add Question Group
          </Button>
        </div>
      </div>
      <div className="part-5 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 5</p>
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
      <div className="part-6 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 6</p>
        {questionGroupsPart6.map((questionGroup, index) => (
          <div
            className="flex justify-start items-start border-b-2 border-gray-300"
            key={questionGroup.id}
          >
            <div className="w-5/6">
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
            <Button
              variant="contained"
              onClick={() => {
                deleteQuestionGroup(questionGroup.id, 6);
              }}
              style={{
                backgroundColor: "#F44336",
                width: "fit-content",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              disabled={isAllBlocked}
            >
              Delete Group
            </Button>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
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
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: "black",
              textTransform: "none",
              width: "fit-content",
            }}
            endIcon={<ArrowDownwardIcon />}
          >
            Add Question Group
          </Button>
        </div>
      </div>
      <div className="part-7 flex flex-col gap-2">
        <p className="text-2xl font-semibold">Part 7</p>
        {questionGroupsPart7.map((questionGroup, index) => (
          <div
            className="flex justify-start items-start border-b-2 border-gray-300"
            key={questionGroup.id}
          >
            <div className="w-5/6">
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
            <Button
              variant="contained"
              onClick={() => {
                deleteQuestionGroup(questionGroup.id, 7);
              }}
              style={{
                backgroundColor: "#F44336",
                width: "fit-content",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              disabled={isAllBlocked}
            >
              Delete Group
            </Button>
          </div>
        ))}
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
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
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: "black",
              textTransform: "none",
              width: "fit-content",
            }}
            endIcon={<ArrowDownwardIcon />}
          >
            Add Question Group
          </Button>
        </div>
      </div>
      <div className="buttons-container flex justify-end gap-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleChangeBlockStatus}
        >
          {isAllBlocked ? "Unsave" : "Save all"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "fit-content",
          }}
          onClick={handleCreateTest}
          disabled={!isAllBlocked}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

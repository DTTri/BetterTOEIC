import { CreatingQuestionGroup } from "@/components";
import { Question } from "@/entities";
import { roadmapService } from "@/services";
import http from "@/services/http";
import { sNewTest } from "@/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import theme from "@/theme";
import { toast } from "react-toastify";
export default function CreatingRoadmapExsPage() {
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
  const [phase, setPhase] = useState<number>(1);
  const [part, setPart] = useState<number>(1);
  const [chapter, setChapter] = useState<number>(1);
  const [mainAudio, setMainAudio] = useState<File | null>(null);

  const [questionGroups, setQuestionGroups] = useState<
    { id: string; number: number }[]
  >([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);
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
  const deleteQuestionGroup = (id: string) => {
    setQuestionGroups(
      questionGroups.filter((questionGroup) => questionGroup.id !== id)
    );
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
  const handleCreateRoadmapEx = async () => {
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
      const newRoadmapEx = {
        phase,
        part,
        chapter,
        questions: uploadedQuestions,
        created_by: "admin",
        main_audio: mainAudioUrl,
      };
      console.log(newRoadmapEx);
      const res = await roadmapService.createRoadmapExercise(newRoadmapEx);
      console.log(res);
      if (res.EC === 0) {
        toast("Create roadmap exercise successfully", {
          type: "success",
        });
        nav("/admin/roadmap");
      } else {
        toast("Create roadmap exercise failed", {
          type: "error",
        });
      }
    } catch (err) {
      toast("Create roadmap exercise failed: " + err, {
        type: "error",
      });
    }
  };
  const handleFileInputClick = () => {
    document.getElementById("file-input")?.click();
  };
  return (
    <div className="w-full min-h-screen rounded-xl bg-white text-black flex flex-col gap-4 p-4">
      <div className="selects-container flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <p className="text-3xl font-bold">Phase:</p>
          <select
            className="bg-gray-50 border border-black rounded-sm shadow-sm p-2 w-16 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
            value={phase}
            onChange={(e) => {
              setPhase(parseInt(e.target.value));
            }}
            disabled={isAllBlocked}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-3xl font-bold">Part:</p>
          <select
            className="bg-gray-50 border border-black rounded-sm shadow-sm p-2 w-16 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
            value={part}
            onChange={(e) => {
              setPart(parseInt(e.target.value));
            }}
            disabled={isAllBlocked}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-3xl font-bold">Chapter:</p>
          <input
            type="number"
            value={chapter}
            disabled={isAllBlocked}
            onChange={(e) => {
              setChapter(parseInt(e.target.value));
            }}
            min={1}
            className="border-2 border-black rounded-sm shadow-md p-2 w-16
          focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>
      {part < 5 && (
        <div className="audio flex gap-2 items-center">
          <p className="text-2xl font-bold">Listening Audio:</p>
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
      )}

      <div className="flex flex-col gap-2">
        {questionGroups.map((questionGroup, index) => (
          <div
            className="flex justify-start items-start border-b-2 border-gray-300"
            key={questionGroup.id}
          >
            <div className="w-5/6">
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
              <Button
                variant="contained"
                onClick={() => {
                  deleteQuestionGroup(questionGroup.id);
                }}
                style={{
                  backgroundColor: theme.palette.error.main,
                  width: "fit-content",
                  fontSize: "0.8rem",
                  textTransform: "none",
                }}
                disabled={isAllBlocked}
              >
                Delete Group
              </Button>
            )}
          </div>
        ))}
        {(part === 3 || part === 4 || part === 6 || part === 7) && (
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setQuestionGroups([
                  ...questionGroups,
                  {
                    id: uuidv4(),
                    number: 1,
                  },
                ]);
              }}
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: "black",
                textTransform: "none",
                width: "fit-content",
              }}
              endIcon={<ArrowDownwardIcon />}
              disabled={isAllBlocked}
            >
              Add question group
            </Button>
          </div>
        )}
      </div>
      <div className="buttons-container flex gap-4 justify-end">
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
          onClick={handleCreateRoadmapEx}
          disabled={!isAllBlocked}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

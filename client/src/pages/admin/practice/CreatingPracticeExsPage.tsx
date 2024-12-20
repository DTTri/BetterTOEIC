import { CreatingQuestionGroup } from "@/components";
import { Question } from "@/entities";
import CreatePracticeTestDTO from "@/entities/DTOS/CreatePracticeTestDTO";
import http from "@/services/http";
import practiceService from "@/services/practiceService";
import { sNewTest } from "@/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function CreatingPracticeExsPage() {
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
        console.log("Failed to upload file to S3");
        return "";
      }
      return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
    } catch (error) {
      console.error("Error uploading file:", error);
      return "";
    }
  };

  const handleCreatePracticeTest = async () => {
    if (part < 5 && !mainAudio) {
      alert("Please upload main audio");
      return;
    }
    const mainAudioUrl =
      part < 5 && mainAudio ? await uploadFile(mainAudio) : "";
    try {
      const newPracticeTest: CreatePracticeTestDTO = {
        part: part,
        questions: questions,
        created_by: "admin",
        main_audio: mainAudioUrl,
      };
      console.log(newPracticeTest);
      const res = await practiceService.createPracticeTest(newPracticeTest);
      console.log(res);
      if (res.EC === 0) {
        nav("/admin/practice");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full min-h-screen rounded-xl bg-white text-black flex flex-col gap-4 p-4">
      <div className="select-part flex gap-2 items-center">
        <p className="text-3xl font-bold">Part:</p>
        <select
          className="p-2"
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
      {part < 5 && (
        <div className="audio flex gap-2 items-center">
          <p className="text-2xl font-bold">Listening Audio:</p>
          <input
            type="file"
            accept="audio/*"
            disabled={isAllBlocked}
            multiple={false}
            onChange={(e) => {
              if (e.target.files) {
                setMainAudio(e.target.files[0]);
              }
            }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {questionGroups.map((questionGroup, index) => (
          <div
            className="flex justify-between items-start"
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
                  backgroundColor: "#F44336",
                  width: "fit-content",
                  fontSize: "0.8rem",
                }}
              >
                Delete question group
              </Button>
            )}
          </div>
        ))}
        {(part === 3 || part === 4 || part === 6 || part === 7) && (
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
          >
            Add question group
          </Button>
        )}
      </div>
      <div className="buttons flex justify-end gap-2">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleChangeBlockStatus}
        >
          {isAllBlocked ? "Unblock" : "Block"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "fit-content",
            margin: "auto",
          }}
          disabled={!isAllBlocked}
          onClick={handleCreatePracticeTest}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

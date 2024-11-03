import { CreatingQuestionGroup } from "@/components";
import { Button } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function CreatingPracticeExsPage() {
  const [part, setPart] = useState<number>(0);
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

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="select-part flex gap-2 items-center">
        <p className="text-3xl font-bold">Part:</p>
        <select
          className="p-2"
          value={part}
          onChange={(e) => {
            setPart(parseInt(e.target.value));
          }}
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
          <input type="file" accept="audio/*" />
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
      <Button
        variant="contained"
        color="primary"
        style={{
          width: "fit-content",
          margin: "auto",
        }}
      >
        Create
      </Button>
    </div>
  );
}

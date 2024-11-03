import { CreatingQuestionGroup } from "@/components";
import { Button } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function CreatingMiniTestPage() {
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

  return (
    <div className="w-full min-h-screen rounded-xl bg-white text-black flex flex-col gap-4 p-4">
      <div className="audio flex gap-2 items-center">
        <p className="text-2xl font-bold">Listening Audio:</p>
        <input type="file" accept="audio/*" />
      </div>
      <div className="part-1 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 1</p>
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
        />
      </div>
      <div className="part-2 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 2</p>
        <CreatingQuestionGroup
          part={2}
          questionNumberFrom={numberOfQuestionsPart1 + 1}
          onNewQuestionCreated={() => {
            setNumberOfQuestionsPart2(numberOfQuestionsPart2 + 1);
          }}
          onQuestionDeleted={() => {
            setNumberOfQuestionsPart2(numberOfQuestionsPart2 - 1);
          }}
        />
      </div>
      <div className="part-3 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 3</p>
        {questionGroupsPart3.map((questionGroup, index) => (
          <div
            className="flex justify-between items-start"
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
              }}
            >
              Delete question group
            </Button>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setQuestionGroupsPart3([
              ...questionGroupsPart3,
              {
                id: uuidv4(),
                number: 1,
              },
            ]);
          }}
        >
          Add question group
        </Button>
      </div>
      <div className="part-4 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 4</p>
        {questionGroupsPart4.map((questionGroup, index) => (
          <div
            className="flex justify-between items-start"
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
              }}
            >
              Delete question group
            </Button>
          </div>
        ))}
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
        >
          Add question group
        </Button>
      </div>
      <div className="part-5 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 5</p>
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
        />
      </div>
      <div className="part-6 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 6</p>
        {questionGroupsPart6.map((questionGroup, index) => (
          <div
            className="flex justify-between items-start"
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
              }}
            >
              Delete question group
            </Button>
          </div>
        ))}
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
        >
          Add question group
        </Button>
      </div>
      <div className="part-7 flex flex-col gap-2">
        <p className="text-2xl font-bold">Part 7</p>
        {questionGroupsPart7.map((questionGroup, index) => (
          <div
            className="flex justify-between items-start"
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
              }}
            >
              Delete question group
            </Button>
          </div>
        ))}
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
        >
          Add question group
        </Button>
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

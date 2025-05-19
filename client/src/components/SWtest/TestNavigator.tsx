import { useEffect, useState } from "react";
import Part1 from "./speaking/Part1";
import Part2 from "./speaking/Part2";
import Part3 from "./speaking/Part3";
import Part4 from "./speaking/Part4";
import Part5 from "./speaking/Part5";
import Part6 from "./writing/Part6";
import Part7 from "./writing/Part7";
import Part8 from "./writing/Part8";
import { SWQuestion } from "@/entities";
import GetSWPart from "@/utils/GetSWPart";
import getSWPart from "@/utils/GetSWPart";

//type TestSection = "speaking" | "writing";

interface TestNavigatorProps {
  questions: SWQuestion[];
  onComplete: (results: {
    speakingRecordings: Blob[];
    writingAnswers: string[];
  }) => void;
}

export default function TestNavigator({
  questions,
  onComplete,
}: TestNavigatorProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [speakingRecordings, setSpeakingRecordings] = useState<Blob[]>([]);
  const [writingAnswers, setWritingAnswers] = useState<string[]>([]);
  const [currentPart, setCurrentPart] = useState(1);

  const handleNextQuestion = () => {
    if (questions[currentQuestion].question_number === 19) {
      onComplete({
        speakingRecordings,
        writingAnswers,
      });
    } else if (questions[currentQuestion].question_number === 12) {
      setCurrentQuestion((q) => q + 5);
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  };

  useEffect(() => {
    setCurrentPart(GetSWPart(questions[currentQuestion].question_number));
  }, [currentQuestion, questions]);

  const handleRecordingComplete = (recording: Blob | Blob[]) => {
    const newRecordings = [...speakingRecordings];
    if (Array.isArray(recording)) {
      newRecordings.push(...recording);
    } else {
      newRecordings.push(recording);
    }
    setSpeakingRecordings(newRecordings);
    handleNextQuestion();
  };

  const handleAnswerComplete = (answers: string | string[]) => {
    const newAnswers = [...writingAnswers];
    if (Array.isArray(answers)) {
      newAnswers.push(...answers);
    } else {
      newAnswers.push(answers);
    }
    setWritingAnswers(newAnswers);
    handleNextQuestion();
  };

  const renderCurrentPart = () => {
    switch (currentPart) {
      case 1:
        return (
          <Part1
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 2:
        return (
          <Part2
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 3:
        return (
          <Part3
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 4:
        return (
          <Part4
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 5:
        return (
          <Part5
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 6:
        return (
          <Part6
            questions={questions.filter(
              (q) => getSWPart(q.question_number) === 6
            )}
            onComplete={handleAnswerComplete}
          />
        );
      case 7:
        return (
          <Part7
            question={questions[currentQuestion]}
            onComplete={handleAnswerComplete}
          />
        );
      case 8:
        return (
          <Part8
            question={questions[currentQuestion]}
            onComplete={handleAnswerComplete}
          />
        );
    }
  };

  console.log("cur qestion" + currentQuestion);
  return (
    <div className="min-h-screen w-[80%] mx-auto bg-gray-50 py-4">{renderCurrentPart()}</div>
  );
}

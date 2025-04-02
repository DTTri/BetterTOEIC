import { useState } from "react";
import Part1 from "./speaking/Part1";
import Part2 from "./speaking/Part2";
import Part3 from "./speaking/Part3";
import Part4 from "./speaking/Part4";
import Part5 from "./speaking/Part5";
import Part6 from "./writing/Part6";
import Part7 from "./writing/Part7";
import Part8 from "./writing/Part8";
import { Question } from "@/entities";

type TestSection = "speaking" | "writing";

interface TestNavigatorProps {
  questions: Question[];
  onComplete: (results: {
    speakingRecordings: Blob[];
    writingAnswers: string[];
  }) => void;
}

export default function TestNavigator({
  questions,
  onComplete,
}: TestNavigatorProps) {
  const [currentSection, setCurrentSection] = useState<TestSection>("speaking");
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [speakingRecordings, setSpeakingRecordings] = useState<Blob[]>([]);
  const [writingAnswers, setWritingAnswers] = useState<string[]>([]);

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

  const handleNextQuestion = () => {
    if (currentSection === "speaking") {
      switch (currentPart) {
        case 1:
          if (questions[currentQuestion].question_number == 2) {
            setCurrentPart(2);
          }
          setCurrentQuestion((q) => q + 1);
          break;
        case 2:
          if (questions[currentQuestion].question_number < 4) {
            setCurrentQuestion((q) => q + 1);
          } else {
            setCurrentPart(3);
          }
          break;
        case 3:
          if (questions[currentQuestion].question_number < 7) {
            setCurrentQuestion((q) => q + 1);
          } else {
            setCurrentPart(4);
          }
          break;
        case 4:
          if (questions[currentQuestion].question_number < 10) {
            setCurrentQuestion((q) => q + 1);
          } else {
            setCurrentPart(5);
          }
          break;
        case 5:
          if (questions[currentQuestion].question_number < 11) {
            setCurrentQuestion((q) => q + 1);
          } else {
            setCurrentSection("writing");
            setCurrentPart(6);
          }
          break;
      }
    } else {
      switch (currentPart) {
        case 6:
          if (questions[currentQuestion].question_number < 16) {
            setCurrentQuestion((q) => q + 1);
          } else {
            setCurrentPart(7);
          }
          break;
        case 7:
          if (questions[currentQuestion].question_number < 18) {
            setCurrentQuestion((q) => q + 1);
          } else {
            setCurrentPart(8);
          }
          break;
        case 8:
          if (questions[currentQuestion].question_number < 19) {
            setCurrentQuestion((q) => q + 1);
          } else {
            onComplete({ speakingRecordings, writingAnswers });
          }
          break;
      }
    }
  };

  const renderCurrentPart = () => {
    if (currentSection === "speaking") {
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
      }
    } else {
      switch (currentPart) {
        case 6:
          return (
            <Part6
              questions={questions.filter((q) => q.part === 6)}
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
    }
  };

  console.log("cur qestion" + currentQuestion);
  return (
    <div className="min-h-screen bg-gray-50 py-8">{renderCurrentPart()}</div>
  );
}

import { useEffect, useState } from "react";
import Timer from "../Timer";
import AudioRecorder from "../AudioRecorder";
import { Question } from "@/entities";
interface Part3Props {
  question: Question;
  onComplete: (recordings: Blob) => void;
}

export default function Part3({ question, onComplete }: Part3Props) {
  const [stage, setStage] = useState<"direction" | "preparation" | "recording">();

  useEffect(() => {
    setStage(question.question_number === 5 ? "direction" : "preparation");
  }, [question]);

  const [isRecording, setIsRecording] = useState(false);

  // Get response time based on question number (15s for first two, 30s for last)
  const getResponseTime = (questionIndex: number) => {
    return questionIndex === 7 ? 30 : 15;
  };

  const handleDirectionEnd = () => {
    setStage("preparation");
  };

  const handlePreparationEnd = () => {
    setStage("recording");
    setIsRecording(true);
  };

  const handleRecordingEnd = () => {
    setIsRecording(false);
  };

  const handleRecordingComplete = (blob: Blob) => {
    onComplete(blob);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-red-800 text-white py-3 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">
          QUESTION {question.question_number} OF 19
        </h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage == "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 5-7: Answer the questions
            </h2>
            <h3 className="text-lg font-semibold mb-4">Direction:</h3>
            <p className="text-gray-700">
              In this part of the test, you will answer three questions. You
              will have 3 seconds to prepare for each question. For questions 5
              and 6, you will have 15 seconds to respond to each question. For
              question 7, you will have 30 seconds to respond
            </p>
            <div className="hidden">
              <Timer
                initialSeconds={10}
                onTimeEnd={handleDirectionEnd}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h4 className="text-lg font-bold mb-4">{question.text}</h4>
              <p className="text-lg leading-relaxed">
                Question: {question.passages?.[0]}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <Timer
                initialSeconds={stage == "preparation" ? 3 : getResponseTime(question.question_number)}
                onTimeEnd={stage == "preparation" ? handlePreparationEnd : handleRecordingEnd}
                isPreparation={stage === 'preparation'}
              />
            </div>

            <div className="flex justify-center">
              <AudioRecorder
                isRecording={isRecording}
                onRecordingComplete={handleRecordingComplete}
                partNumber={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

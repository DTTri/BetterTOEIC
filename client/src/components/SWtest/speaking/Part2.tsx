import { useEffect, useState } from "react";
import Timer from "../Timer";
import AudioRecorder from "../AudioRecorder";
import { Question } from "@/entities";
interface Part2Props {
  question: Question;
  onComplete: (recording: Blob) => void;
}

export default function Part2({ question, onComplete }: Part2Props) {
  const [stage, setStage] = useState<
    "direction" | "preparation" | "recording"
  >("preparation");

  useEffect(() => {
    setStage(question.question_number === 3 ? "direction" : "preparation");
  }, [question]);
  const [isRecording, setIsRecording] = useState(false);

  const handlePreparationEnd = () => {
    setStage("recording");
    setIsRecording(true);
  };

  const handleRecordingEnd = () => {
    setIsRecording(false);
  };

  const handleDirectionEnd = () => {
    setStage("preparation");
  };

  const handleRecordingComplete = (blob: Blob) => {
    onComplete(blob);
  };

  console.log("stage" + stage);
  console.log("recording" + isRecording);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#981C1E] text-white text-center w-full font-bold py-3 px-5 text-2xl rounded-t-lg">
        <h2 className="text-lg font-semibold">
          QUESTION {question.question_number} OF 19
        </h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 3-4: Describe a picture
            </h2>
            <h3 className="text-lg font-medium mb-4">Direction: In this part of the test, you will describe the picture on the
              screen. You will have 45 seconds to prepare your response. Then
              you will have 30 seconds to describe the picture.</h3>
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
            <div className="flex justify-center mb-8">
              <img
                src={question.images?.[0]}
                alt={`Question ${question.question_number}`}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="flex justify-center mb-6">
              <Timer
                initialSeconds={stage === "preparation" ? 45 : 30}
                onTimeEnd={
                  stage === "preparation"
                    ? handlePreparationEnd
                    : handleRecordingEnd
                }
                isPreparation={stage === "preparation"}
              />
            </div>

            <div className="flex justify-center">
              <AudioRecorder
                isRecording={isRecording}
                onRecordingComplete={handleRecordingComplete}
                partNumber={2}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

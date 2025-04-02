import { useEffect, useState } from "react";
import Timer from "../Timer";
import AudioRecorder from "../AudioRecorder";
import { Question } from "@/entities";

interface Part1Props {
  question: Question;
  onComplete: (recording: Blob) => void;
}

export default function Part1({ question, onComplete }: Part1Props) {
  const [stage, setStage] = useState<"direction" | "preparation" | "recording">();

  useEffect(() => {
    setStage(question.question_number === 1 ? "direction" : "preparation");
  }, [question]);

  const [isRecording, setIsRecording] = useState(false);

  const handleDirectionEnd = () => {
    setStage("preparation");
  };

  const handlePreparationEnd = () => {
    setStage("recording");
    setIsRecording(true);
  };

  const handleRecordingEnd = () => {
    console.log("recording end");
    setIsRecording(false);
  };

  const handleRecordingComplete = (blob: Blob) => {
    onComplete(blob);
  };

  console.log(stage);
  console.log(isRecording);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-red-800 text-white py-3 px-6 rounded-t-lg">
        <h2 className="text-lg font-semibold">
          QUESTION {question.question_number} OF 19
        </h2>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl block w-full text-center mb-4 font-bold">
              Question 1-2: Read aloud the text aloud.
            </h2>
            <h3 className="text-lg font-semibold mb-4 inline-block">
              Direction:
            </h3>
            <p className="text-gray-700">
              In this part of the test, you will read aloud the text on the
              screen. You will have 45 seconds to prepare. Then you will have 45
              seconds to read the text aloud.
            </p>
            <div className="hidden">
              <Timer
                initialSeconds={3}
                onTimeEnd={handleDirectionEnd}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-lg leading-relaxed">{question.text}</p>
            </div>

            <div className="flex justify-center mb-6">
              <Timer
                initialSeconds={stage === "preparation" ? 3 : 10}
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
                partNumber={1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

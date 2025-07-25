import { useEffect, useState } from "react";
import Timer from "../Timer";
import AudioRecorder from "../AudioRecorder";
import { SWQuestion } from "@/entities";
import { TimeForPart1 } from "../SWTestTime";

interface Part1Props {
  question: SWQuestion;
  onComplete: (recording: Blob) => void;
}

export default function Part1({ question, onComplete }: Part1Props) {
  const [stage, setStage] = useState<"direction" | "preparation" | "recording">(
    "preparation"
  );

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    setStage(question.question_number === 1 ? "direction" : "preparation");
  }, [question]);

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-[#981C1E] text-white text-center w-full font-bold py-3 px-5 text-2xl rounded-t-lg">
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
            <h3 className="text-lg font-medium mb-4 inline-block">
              Direction: In this part of the test, you will read aloud the text
              on the screen. You will have 45 seconds to prepare. Then you will
              have 45 seconds to read the text aloud.
            </h3>
            <p className="text-gray-700"></p>
            <div className="hidden">
              <Timer
                initialSeconds={TimeForPart1.DirectionTime || 10}
                onTimeEnd={handleDirectionEnd}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-lg leading-relaxed">{question.passage}</p>
            </div>

            <div className="flex justify-center mb-4">
              <Timer
                initialSeconds={
                  stage === "preparation"
                    ? TimeForPart1.PreparationTime || 45
                    : TimeForPart1.RecordingTime || 45
                }
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

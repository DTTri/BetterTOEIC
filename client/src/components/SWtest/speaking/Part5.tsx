import { useState } from "react";
import Timer from "../Timer";
import AudioRecorder from "../AudioRecorder";
import { Question } from "@/entities";
interface Part5Props {
  question: Question;
  onComplete: (recording: Blob) => void;
}

export default function Part5({ question, onComplete }: Part5Props) {
  const [stage, setStage] = useState<"direction" | "preparation" | "recording">(
    "direction"
  );
  const [isRecording, setIsRecording] = useState(false);

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
        {stage === "direction" ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 11: Express an opinion
            </h2>
            <h3 className="text-lg font-semibold mb-4">Direction:</h3>
            <p className="text-gray-700">
              In this part of the test, you will give your opinion about a
              specific topic. You will have 45 seconds to prepare your response.
              Then you will have 60 seconds to speak about the topic.
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
              <h4 className="text-lg font-semibold mb-4">Topic:</h4>
              <p className="text-lg leading-relaxed">{question.text}</p>
            </div>

            <div className="flex justify-center mb-6">
              <Timer
                initialSeconds={stage === "preparation" ? 45 : 60}
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
                partNumber={5}
              />
            </div>

            {stage === "preparation" && (
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h5 className="text-sm font-semibold text-blue-800 mb-2">
                  Preparation Tips:
                </h5>
                <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                  <li>Take notes if needed</li>
                  <li>
                    Structure your response with an introduction, main points,
                    and conclusion
                  </li>
                  <li>Use specific examples to support your opinion</li>
                  <li>Speak clearly and at a natural pace</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

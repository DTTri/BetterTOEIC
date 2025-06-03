import { useEffect, useState } from "react";
import Timer from "../Timer";
import AudioRecorder from "../AudioRecorder";
import { SWQuestion } from "@/entities";
import { Time89ForPart4, Time10ForPart4 } from "../SWTestTime";

interface Part4Props {
  question: SWQuestion;
  onComplete: (recordings: Blob) => void;
}

export default function Part4({ question, onComplete }: Part4Props) {
  const [stage, setStage] = useState<
    "direction" | "preparation" | "audio" | "recording"
  >("preparation");

  useEffect(() => {
    setStage(question.question_number === 8 ? "direction" : "audio");
  }, [question]);

  const [isRecording, setIsRecording] = useState(false);

  // Get response time based on question number (15s for first two, 30s for last)
  const getResponseTime = (questionIndex: number) => {
    return questionIndex === 10
      ? Time10ForPart4.RecordingTime || 30
      : Time89ForPart4.RecordingTime || 15;
  };

  const handleDirectionEnd = () => {
    setStage("audio");
  };

  const handlePreparationEnd = () => {
    setStage("recording");
    setIsRecording(true);
  };

  const handleAudioEnd = () => {
    setStage("preparation");
    console.log("Audio ended");
  };

  const handleRecordingEnd = () => {
    setIsRecording(false);
  };

  const handleRecordingComplete = (blob: Blob) => {
    onComplete(blob);
  };
  console.log("stage" + stage);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#981C1E] text-white text-center w-full font-bold py-3 px-5 text-2xl rounded-t-lg">
        <h2 className="text-lg font-semibold">
          QUESTION {question.question_number} OF 19
        </h2>
      </div>

      {stage === "audio" && (
        <audio
          src={question.question_audio}
          className="hidden"
          controls
          autoPlay
          onEnded={handleAudioEnd}
        />
      )}

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {stage === "direction" ? (
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-4 w-full text-center block">
              Question 8-10: Respond to questions using provided information
            </h2>
            <h3 className="text-lg font-medium mb-4">
              Direction: In this part of the test, you will answer three
              questions based on the information provided. You will have 45
              seconds to read the information before the questions begin. You
              will have 3 seconds to prepare for each question. For questions 8
              and 9, you will have 15 seconds to respond. For question 10, you
              will have 30 seconds to respond.
            </h3>
            <div className="hidden">
              <Timer
                initialSeconds={Time10ForPart4.DirectionTime || 10}
                onTimeEnd={handleDirectionEnd}
                isPreparation={false}
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-center mb-4">
              <img
                src={question.image?.[0]}
                alt="Schedule Information"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h4 className="text-lg font-semibold mb-4">{question.passage}</h4>
              <p className="text-lg leading-relaxed">
                Question: {question.text}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              {stage !== "audio" && (
                <Timer
                  initialSeconds={
                    stage == "preparation"
                      ? Time10ForPart4.PreparationTime || 3
                      : getResponseTime(question.question_number)
                  }
                  onTimeEnd={
                    stage == "preparation"
                      ? handlePreparationEnd
                      : handleRecordingEnd
                  }
                  isPreparation={stage === "preparation"}
                />
              )}
            </div>

            <div className="flex justify-center">
              <AudioRecorder
                isRecording={isRecording}
                onRecordingComplete={handleRecordingComplete}
                partNumber={4}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

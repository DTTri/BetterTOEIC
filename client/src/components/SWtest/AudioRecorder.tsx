import { useCallback, useEffect, useRef, useState } from "react";
import AudioVisualizer from "./AudioVisualizer";
import MicIcon from "@mui/icons-material/Mic";
import startbeep from "../../assets/Start_beep.mp3";

interface AudioRecorderProps {
  isRecording: boolean;
  onRecordingComplete: (blob: Blob) => void;
  partNumber: number;
}

export default function AudioRecorder({
  isRecording,
  onRecordingComplete,
  partNumber,
}: AudioRecorderProps) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    const initializeRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioStream(stream);
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks.current, { type: "audio/webm" });
          if (isRecording) {
            console.log("recording complete");
            onRecordingComplete(blob);
          }
          chunks.current = [];
        };

        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeRecorder();

    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onRecordingComplete]);

  //Define the start beep function when the recording starts
  const playStartBeep = useCallback(async () => {
    const audioContext = new AudioContext();
    const startBeep = audioContext.createBufferSource();
    const startBeepBuffer = await fetch(startbeep).then((res) =>
      res.arrayBuffer()
    );
    startBeep.buffer = await audioContext.decodeAudioData(startBeepBuffer);
    startBeep.connect(audioContext.destination);
    startBeep.start();
  }, []);

  useEffect(() => {
    if (!mediaRecorder) return;
    if (isRecording && mediaRecorder.state === "inactive") {
      playStartBeep();
      mediaRecorder.start();
    } else if (!isRecording && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  return (
    <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-lg shadow-md min-w-[150px]">
      <div className="flex items-center gap-3">
        <div
          className={`p-3 rounded-full ${
            isRecording ? "bg-red-100" : "bg-gray-100"
          }`}
        >
          <MicIcon
            className={`text-2xl ${
              isRecording ? "text-red-500 animate-pulse" : "text-gray-400"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {isRecording ? "Recording Part " + partNumber : "Ready to record"}
          </span>
          <span className="text-xs text-gray-500">
            {isRecording ? "Speaking in progress..." : "Waiting to start..."}
          </span>
        </div>
      </div>

      {isRecording && (
        <div
          className={`w-full transition-opacity duration-300 ${
            isRecording ? "opacity-100" : "opacity-0"
          }`}
        >
          <AudioVisualizer audioStream={audioStream} />
        </div>
      )}
    </div>
  );
}

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useEffect, useState } from "react";

interface TimerProps {
  initialSeconds: number;
  onTimeEnd: () => void;
  isPreparation?: boolean;
}

export default function Timer({
  initialSeconds,
  onTimeEnd,
  isPreparation = false,
}: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds === 0) {
      console.log("time end");
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md min-w-[120px]">
      <div className="w-full text-sm font-semibold bg-[#00205b] text-white p-2 rounded-t-lg">
        {isPreparation ? "PREPARATION TIME" : "RESPONSE TIME"}
      </div>
      <div className="w-full p-2 flex items-center justify-center gap-2">
        <AccessAlarmIcon fontSize="large" />
        <span className="text-2xl font-bold text-gray-800">
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
}

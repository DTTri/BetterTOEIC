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
  }, [onTimeEnd]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md min-w-[180px]">
      <div className="w-full text-base font-semibold bg-[#00205b] text-white p-1 text-center rounded-t-lg">
        {isPreparation ? "PREPARATION TIME" : "RESPONSE TIME"}
      </div>
      <div className="w-full p-1 flex items-center justify-center gap-1">
        <AccessAlarmIcon fontSize="medium" />
        <span className="text-xl font-bold text-gray-800">
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
}

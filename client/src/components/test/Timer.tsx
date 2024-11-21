import React, { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export default function Timer({ onEnd }: { onEnd: () => void  }) {
  const [seconds, setSeconds] = useState(7200);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if(hours === 0 && minutes === 0 && secs === 0) {
      onEnd();
    }
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="h-11 w-40 text-xl rounded-sm bg-white border border-black flex items-center justify-around">
      <AccessAlarmIcon fontSize="large" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}

import { useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#00205C",
    ...theme.applyStyles("dark", {
      backgroundColor: "#00205C",
    }),
  },
}));
export default function BuildRoadmapProgressBar() {
  const [progress, setProgress] = useState(0);
  const interval = setInterval(() => {
    setProgress((prevProgress) => {
      if (prevProgress === 100) {
        clearInterval(interval);
        return 100;
      }
      const diff = Math.random() * 10;
      return Math.min(prevProgress + diff, 100);
    });
  }, 200);
  return (
    <div className="w-full">
      <span className="text-xl font-semibold">
        {Math.floor(progress)}% {progress === 100 ? "Completed" : ""}
      </span>
      <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
}

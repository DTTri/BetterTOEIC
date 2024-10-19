import { useEffect, useState } from "react";
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
  console.log("BuildRoadmapProgressBar rendered, progress: ", progress);

  useEffect(() => {
    console.log("Component mounted");

    const interval = setInterval(() => {
      console.log("interval");
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          console.log("interval cleared");
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(prevProgress + diff, 100);
      });
    }, 200);
    // Cleanup the interval on component unmount
    return () => {
      console.log("Component unmounted");
      clearInterval(interval);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full">
      <span className="text-xl font-semibold">
        {Math.floor(progress)}% {progress === 100 ? "Completed" : ""}
      </span>
      <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
}

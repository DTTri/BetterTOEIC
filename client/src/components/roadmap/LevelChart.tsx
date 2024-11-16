import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { sCreatingPersonalRoadmap } from "@/store";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
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

export default function LevelChart({
  isStartChart,
}: {
  isStartChart: boolean;
}) {
  console.log("LevelChart");
  const currentLevel = sCreatingPersonalRoadmap.use();
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="columns-container w-full flex justify-between items-end px-4">
        <div
          onClick={
            isStartChart
              ? () =>
                  sCreatingPersonalRoadmap.set((pre) => {
                    if (isStartChart) pre.value.startLevel = 1;
                  })
              : undefined
          }
          className="w-10 h-20 shadow-inner bg-primary"
        ></div>
        <div
          onClick={() => {
            sCreatingPersonalRoadmap.set((pre) =>
              isStartChart
                ? (pre.value.startLevel = 2)
                : (pre.value.targetLevel = 2)
            );
          }}
          className={`w-10 h-32 shadow-inner shadow-gray-600 ${
            (
              isStartChart
                ? currentLevel.startLevel > 1
                : currentLevel.targetLevel > 1
            )
              ? "bg-primary"
              : ""
          }`}
        ></div>
        <div
          onClick={() => {
            sCreatingPersonalRoadmap.set((pre) =>
              isStartChart
                ? (pre.value.startLevel = 3)
                : (pre.value.targetLevel = 3)
            );
          }}
          className={`w-10 h-40 shadow-inner shadow-gray-600 ${
            (
              isStartChart
                ? currentLevel.startLevel > 2
                : currentLevel.targetLevel > 2
            )
              ? "bg-primary"
              : ""
          }`}
        ></div>
        <div
          onClick={() => {
            sCreatingPersonalRoadmap.set((pre) =>
              isStartChart
                ? (pre.value.startLevel = 4)
                : (pre.value.targetLevel = 4)
            );
          }}
          className={`w-10 h-52 shadow-inner shadow-gray-600 ${
            (
              isStartChart
                ? currentLevel.startLevel > 3
                : currentLevel.targetLevel > 3
            )
              ? "bg-primary"
              : ""
          }`}
        ></div>
        <div
          onClick={() => {
            sCreatingPersonalRoadmap.set((pre) => {
              if (!isStartChart) pre.value.targetLevel = 5;
            });
          }}
          className={`w-10 h-60 shadow-inner shadow-gray-600 ${
            (
              isStartChart
                ? currentLevel.startLevel > 4
                : currentLevel.targetLevel > 4
            )
              ? "bg-primary"
              : ""
          }`}
        ></div>
      </div>
      <div className="progress-bar-container w-full px-4">
        <BorderLinearProgress
          className="w-full"
          variant="determinate"
          value={
            25 *
            ((isStartChart
              ? currentLevel.startLevel
              : currentLevel.targetLevel) -
              1)
          }
        />
      </div>
      <div className="values-container w-full flex justify-between">
        <span className="text-center ml-1">10 - 215</span>
        <span className="text-center">216 - 430</span>
        <span className="text-center">431 - 645</span>
        <span className="text-center">646 - 860</span>
        <span className="text-center">861 - 990</span>
      </div>
    </div>
  );
}

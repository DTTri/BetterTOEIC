import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#00205C",
    ...theme.applyStyles("dark", {
      backgroundColor: "#00205C",
    }),
  },
}));
export default function CurrentPhaseContainer({
  currentPhase,
  progress,
}: {
  currentPhase: number;
  progress: number;
}) {
  // base on the currentPhase, define the start and end of the progress bar
  // declare the start and end variables
  let start = "";
  let end = "";
  switch (currentPhase) {
    case 1:
      start = "10 - 215";
      end = "220 - 465";
      break;
    case 2:
      start = "220 - 465";
      end = "470 - 725";
      break;
    case 3:
      start = "470 - 725";
      end = "730 - 855";
      break;
    case 4:
      start = "730 - 855";
      end = "860 - 990";
      break;
    default:
      start = "10 - 215";
      end = "220 - 465";
  }

  return (
    <div className="w-full bg-white rounded-xl px-8 py-4 flex items-center justify-center">
      <div className="start-level flex flex-col items-center gap-1">
        <FmdGoodIcon fontSize="medium" />
        <div className="px-2 py-1 bg-white border border-primary rounded-xl min-w-28">
          <p className="text-black font-bold text-xl w-full text-center">
            {start}
          </p>
        </div>
      </div>
      <BorderLinearProgress
        className="w-full mt-6 min-w-32"
        variant="determinate"
        value={progress}
      />
      <div className="end-level flex flex-col items-center gap-1">
        <ModeStandbyIcon fontSize="medium" />
        <div className="px-2 py-1 bg-primary rounded-xl min-w-28">
          <p className="text-white font-bold text-xl w-full text-center">
            {end}
          </p>
        </div>
      </div>
    </div>
  );
}

import { ChaptersContainer, CurrentPhaseContainer } from "@/components";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
import { sCreatingPersonalRoadmap, sRoadmap } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function RoadmapPage() {
  const nav = useNavigate();
  const roadmapExercises: RoadmapExercise[] = sRoadmap.use((v) => v.exercises);

  const userRoadmap: RoadmapHistory | null = sRoadmap.use((v) => v.userRoadmap);

  sRoadmap.watch((newValue) => {
    console.log("sRoadmap: " + newValue.exercises);
  }, []);

  return (
    <>
      {!userRoadmap ? (
        // inform user that they have not created a roadmap yet
        <div className="bg-background w-full h-full py-8 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">
            You have not created a roadmap yet
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              nav("/creating-roadmap");
            }}
          >
            Let's create
          </Button>
        </div>
      ) : (
        <div className="bg-background w-full h-full py-8 flex flex-col items-center gap-4">
          <div className="w-1/2 min-w-fit mx-auto">
            <CurrentPhaseContainer
              currentPhase={userRoadmap.current_level}
              progress={(() => {
                const completedChapters =
                  userRoadmap.completedRoadmapExercises.filter(
                    (exercise) => exercise.phase === userRoadmap.current_level
                  ).length;
                if (roadmapExercises.length === 0) return 100;
                return Math.floor(
                  (completedChapters /
                    roadmapExercises.filter(
                      (exercise) => exercise.phase === userRoadmap.current_level
                    ).length) *
                    100
                );
              })()}
            />
          </div>
          <div className="roadmap-exercise-container rounded-xl w-5/6 bg-white p-8 mx-auto relative">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                sCreatingPersonalRoadmap.reset();
                nav("/creating-roadmap");
              }}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              Change roadmap
            </Button>
            <div className="parts-list w-3/5 mx-auto flex flex-col items-center gap-4">
              {/* sua lai map roadmapExercises ra sao cho cac phan tu co cung part se duoc truyen vao 1 ChaptersContainer, property cua 
             ChaptersContainer se la part (number), chapters (RoadmapExercise[]) va unlockedChapters (number) */}
              {Array.from({ length: 7 }).map((_, index) => (
                <ChaptersContainer
                  key={index}
                  part={index + 1}
                  chapters={
                    roadmapExercises.filter(
                      (exercise) => exercise.part === index + 1
                    ) as RoadmapExercise[]
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

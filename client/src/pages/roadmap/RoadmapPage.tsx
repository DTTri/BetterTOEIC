import { ChaptersContainer, CurrentPhaseContainer } from "@/components";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
import { sRoadmap } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function RoadmapPage() {
  const nav = useNavigate();
  const roadmapExercises: RoadmapExercise[] = sRoadmap.use((v) => v.exercises);

  const userRoadmap: RoadmapHistory | null = sRoadmap.use((v) => v.userRoadmap);

  sRoadmap.watch((newValue) => {
    console.log("sRoadmap: " + newValue.exercises);
  }, []);
  // sRoadmap.watch((newValue) => {
  //   console.log("sRoadmap: " + newValue.exercises);
  //   setRoadmapExercises(newValue.exercises as RoadmapExercise[]);
  // }, []);
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
              progress={50}
            />
          </div>
          <div className="roadmap-exercise-container rounded-xl w-5/6 bg-white p-8 mx-auto">
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
                  unlockedChapters={
                    userRoadmap.completedRoadmapExercises.filter(
                      (chapter) => chapter.part === index + 1
                    ).length
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

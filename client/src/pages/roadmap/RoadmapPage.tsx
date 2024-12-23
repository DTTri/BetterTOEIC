import { ChaptersContainer, CurrentPhaseContainer } from "@/components";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
import { sRoadmap } from "@/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { roadmapService } from "@/services";
export default function RoadmapPage() {
  const nav = useNavigate();
  const roadmapExercises: RoadmapExercise[] = sRoadmap.use((v) => v.exercises);
  const userRoadmap: RoadmapHistory | null = sRoadmap.use((v) => v.userRoadmap);
  const [isConfirmResetRoadmapPopupOpen, setIsConfirmResetRoadmapPopupOpen] =
    useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  sRoadmap.watch((newValue) => {
    console.log("sRoadmap: " + newValue.exercises);
  }, []);
  useEffect(() => {
    if (userRoadmap) {
      const completedChapters = userRoadmap.completedRoadmapExercises.filter(
        (exercise) => exercise.phase === userRoadmap.current_level
      ).length;
      if (roadmapExercises.length === 0) setProgress(0);
      else {
        const currentProgress =
          (completedChapters / roadmapExercises.length) * 100;
        setProgress(currentProgress);
        console.log("progress: " + currentProgress);
        if (currentProgress === 100 && roadmapExercises.length > 0) {
          const updateCurrentPhase = async () => {
            try {
              const res = await roadmapService.updateUserCurrentLevel(
                userRoadmap._id
              );
              console.log(res);
              if (res.EC === 0) {
                const fetchRoadmapExercises = async () => {
                  try {
                    console.log("User roadmap: " + sRoadmap.value.userRoadmap);
                    const res = await roadmapService.getRoadmapExercisesByPhase(
                      (sRoadmap.value.userRoadmap?.current_level || 0) + 1
                    );
                    if (res.EC === 0) {
                      sRoadmap.set((pre) => (pre.value.exercises = res.DT));
                      console.log("fetch roadmap exercises", res.DT);
                    } else {
                      console.log(res.EM);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                };
                fetchRoadmapExercises();
                sRoadmap.set((pre) =>
                  pre.value.userRoadmap
                    ? (pre.value.userRoadmap.current_level =
                        pre.value.userRoadmap.current_level + 1)
                    : null
                );
              } else {
                console.log(res.EM);
              }
            } catch (err) {
              console.log(err);
            }
          };
          updateCurrentPhase();
        }
      }
    }
  }, [userRoadmap, roadmapExercises]);

  const handleResetRoadmap = async () => {
    try {
      const res = await roadmapService.resetUserRoadmap(userRoadmap?._id || "");
      if (res.EC === 0) {
        sRoadmap.set((pre) => (pre.value.userRoadmap = null));
        nav("/creating-roadmap");
      } else {
        console.log(res.EM);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
              progress={progress}
            />
          </div>
          <div className="roadmap-exercise-container rounded-xl w-5/6 bg-white p-8 mx-auto relative">
            <Button
              color="primary"
              onClick={() => setIsConfirmResetRoadmapPopupOpen(true)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                textTransform: "none",
                color: "black",
                fontSize: "0.9rem",
              }}
              variant="outlined"
            >
              Change Roadmap
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
          {isConfirmResetRoadmapPopupOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-xl p-4 w-1/3">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Are you sure you want to change your roadmap?
                  <br />
                  Your progress will be lost
                </h2>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setIsConfirmResetRoadmapPopupOpen(false)}
                  >
                    No
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleResetRoadmap}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

import { ChaptersContainer, CurrentPhaseContainer } from "@/components";
import { useEffect, useState } from "react";
import CreatingRoadmapPage from "./CreatingRoadmapPage";
import { roadmapService } from "@/services";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
export default function RoadmapPage() {
  const [userRoadmap, setUserRoadmap] = useState<RoadmapHistory | null>(null);
  const [userId, setUserId] = useState("67307c740cf99774897385aa");
  const [roadmapExercises, setRoadmapExercises] = useState<RoadmapExercise[]>(
    []
  );

  useEffect(() => {
    const fetchUserRoadmap = async () => {
      try {
        const res = await roadmapService.getRoadmapHistory(userId);
        if (res.EC === 0) {
          setUserRoadmap(res.DT as RoadmapHistory);
          console.log(res.DT);
        } else {
          setUserRoadmap(null);
          console.log(res.EM);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserRoadmap();
  }, [userId]);
  useEffect(() => {
    if (!userRoadmap) return;
    const fetchRoadmapExercises = async () => {
      try {
        const res = await roadmapService.getRoadmapExercisesByPhase(
          userRoadmap.current_level
        );
        if (res.EC === 0) {
          setRoadmapExercises(res.DT as RoadmapExercise[]);
        } else {
          console.log(res.EM);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoadmapExercises();
  }, [userRoadmap]);
  return (
    <>
      {!userRoadmap ? (
        <CreatingRoadmapPage />
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

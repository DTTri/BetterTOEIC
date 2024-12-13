import { sCreatingPersonalRoadmap } from "@/store";
import { useEffect, useState } from "react";

export default function LevelExplain({
  isStartLevel,
}: {
  isStartLevel: boolean;
}) {
  // <span className="text-center ml-1">10 - 215</span>
  //       <span className="text-center">216 - 430</span>
  //       <span className="text-center">431 - 645</span>
  //       <span className="text-center">646 - 860</span>
  //       <span className="text-center">861 - 990</span>
  const [level, setLevel] = useState<string>("");
  const [explain, setExplain] = useState<string>("");
  const levelChange = (level: number) => {
    switch (level) {
      case 1:
        setLevel("10 - 215");
        setExplain(
          "You are a beginner, who has just started learning English."
        );
        break;
      case 2:
        setLevel("216 - 430");
        setExplain("You have a basic understanding of English.");
        break;
      case 3:
        setLevel("431 - 645");
        setExplain("You have a good understanding of English.");
        break;
      case 4:
        setLevel("646 - 860");
        setExplain("You have a very good understanding of English.");
        break;
      case 5:
        setLevel("861 - 990");
        setExplain("You are an expert in English.");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (isStartLevel) {
      levelChange(1);
    } else {
      levelChange(5);
    }
  }, [isStartLevel]);

  sCreatingPersonalRoadmap.watch((newValue) => {
    levelChange(isStartLevel ? newValue.startLevel : newValue.targetLevel);
  }, []);
  return (
    <div className="bg-[#DEF3FF] p-4 rounded-xl border border-black shadow-md">
      <h2 className="text-lg font-bold mb-2">{level}</h2>
      <p>{explain}</p>
    </div>
  );
}

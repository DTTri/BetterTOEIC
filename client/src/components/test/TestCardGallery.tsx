import { Test } from "@/entities";
import TestCard from "./TestCard";
import { useNavigate } from "react-router-dom";

export default function TestCardGallery({ tests }: { tests: Test[] }) {
  const nav = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
      {tests.map((test) => (
        <TestCard
          key={test._id}
          test={test}
          onClick={() => nav(`/test/${test._id}`)}
        />
      ))}
    </div>
  );
}

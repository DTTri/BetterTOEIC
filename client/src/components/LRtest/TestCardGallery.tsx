import { SWTest, Test } from "@/entities";
import { useNavigate } from "react-router-dom";
import TestCard from "./TestCard";

export default function TestCardGallery({
  isSWTestList = false,
  tests,
}: {
  isSWTestList: boolean;
  tests: Test[] | SWTest[];
}) {
  const nav = useNavigate();
  const handleOnClickTestChange = (test: Test | SWTest) => {
    if (isSWTestList) {
      nav(`/swtest/${test._id}`);
    } else{
      nav(`/test/${test._id}`);
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
      {tests.map((test) => (
        <TestCard
          key={test._id}
          test={test}
          onClick={() => handleOnClickTestChange(test)}
        />
      ))}
    </div>
  );
}

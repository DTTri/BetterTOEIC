import { Header, SearchBar, TestCard } from "@/components";
import LeftBarPersonal from "@/components/personal/LeftBarPersonal";
import { Test } from "@/entities";
import { testStore } from "@/store/testStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TestsSavedPage() {
  const nav = useNavigate();

  const [filtertedTests, setFilteredTests] = useState<Test[]>([]);
  const testList = testStore.use((cur) => cur.testList);
  const testsSaved = testStore.use((cur) => cur.testsSaved);
  useEffect(() => {
    const filtered = testsSaved?.map((savedTest) => {
      return testList.find((test) => test._id === savedTest.testId);
    });
    setFilteredTests((filtered || []).filter((test): test is Test => test !== undefined));
  }, []);
  console.log("filted" + filtertedTests);
  return (
    <div className="">
      <div className="w-full flex flex-row gap-8 items-stretch">
        <LeftBarPersonal />
        <div className="flex flex-col w-full px-12 py-7 gap-5 items-center">
          <SearchBar />
          <div className="w-full min-h-[500px] rounded-[15px] bg-[#fff]">
            <div className="w-full grid lg:grid-cols-2 gap-10 py-8 px-8 ">
              {filtertedTests?.map(
                (test) =>
                  test && (
                    <TestCard
                      key={test._id}
                      test={test}
                      onClick={() => nav(`/test/${test._id}`)}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

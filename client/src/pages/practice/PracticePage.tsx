import PracticeList from "@/components/practice/PracticeList";
import practiceResult from "@/data/practice_result";
import CompletedPracticeTest from "@/entities/CompletedPracticeTest";
import PracticeTest from "@/entities/PracticeTest";
import { practiceStore } from "@/store/practiceStore";

export default function PracticePage() {
  const PracticeListsPart1 = practiceStore.use((value) => value.practiceTestList).filter((practice) => practice.part === 1);
  const PracticeListsPart2 = practiceStore.use((value) => value.practiceTestList).filter((practice) => practice.part === 2);
  const PracticeListsPart3 = practiceStore.use((value) => value.practiceTestList).filter((practice) => practice.part === 3);
  const PracticeListsPart4 = practiceStore.use((value) => value.practiceTestList).filter((practice) => practice.part === 4);
  const PracticeListsPart5 = practiceStore.use((value) => value.practiceTestList).filter((practice) => practice.part === 5);

  const PracticeHistoryPart1  = practiceStore.use((value) => value.completedTests).filter((completedTests) => completedTests.part === 1);
  const PracticeHistoryPart2  = practiceStore.use((value) => value.completedTests).filter((completedTests) => completedTests.part === 2);
  const PracticeHistoryPart3  = practiceStore.use((value) => value.completedTests).filter((completedTests) => completedTests.part === 3);
  const PracticeHistoryPart4  = practiceStore.use((value) => value.completedTests).filter((completedTests) => completedTests.part === 4);
  const PracticeHistoryPart5  = practiceStore.use((value) => value.completedTests).filter((completedTests) => completedTests.part === 5);

  return (
    <div>
      <div className="content">
        <h1 className="text-[52px] text-center text-[#202224] mt-8 font-bold">
          Luyện tập cùng BetterTOEIC
        </h1>
        <div className="flex flex-col items-center gap-5 py-8">
          <PracticeList
            part={1}
            title="Photos"
            practiceTests={PracticeListsPart1}
            completedTests={PracticeHistoryPart1}
          />
          <PracticeList
            part={2}
            title="Question - Response"
            practiceTests={PracticeListsPart2}
            completedTests={PracticeHistoryPart2}
          />
          <PracticeList
            part={3}
            title="Conversations"
            practiceTests={PracticeListsPart3}
            completedTests={PracticeHistoryPart3}
          />
          <PracticeList
            part={4}
            title="Short Talks"
            practiceTests={PracticeListsPart4}
            completedTests={PracticeHistoryPart4}
          />
          <PracticeList
            part={5}
            title="Incomplete Sentences"
            practiceTests={PracticeListsPart5}
            completedTests={PracticeHistoryPart5}
          />
        </div>
      </div>
    </div>
  );
}

import PracticeList from "@/components/practice/PracticeList";
import { practiceStore } from "@/store/practiceStore";
import * as motion from "motion/react-client";

export default function PracticePage() {
  console.log(practiceStore.value);
  const PracticeListsPart1 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 1);
  const PracticeListsPart2 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 2);
  const PracticeListsPart3 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 3);
  const PracticeListsPart4 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 4);
  const PracticeListsPart5 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 5);
  const PracticeListsPart6 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 6);
  const PracticeListsPart7 = practiceStore
    .use((value) => value.practiceTestList)
    .filter((practice) => practice.part === 7);

  const PracticeHistoryPart1 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 1);
  const PracticeHistoryPart2 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 2);
  const PracticeHistoryPart3 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 3);
  const PracticeHistoryPart4 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 4);
  const PracticeHistoryPart5 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 5);
  const PracticeHistoryPart6 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 6);
  const PracticeHistoryPart7 = practiceStore
    .use((value) => value.completedPracticeTests)
    .filter((completedPracticeTest) => completedPracticeTest.part === 7);

  console.log(PracticeHistoryPart1);
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.25,
        scale: { type: "spring", visualDuration: 0.4},
        opacity: { ease: "linear" },
      }}
    >
      <div className="content">
        <h1 className="text-[52px] text-center text-[#202224] mt-8 font-bold">
          Practice with BetterTOEIC
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
          <PracticeList
            part={6}
            title="Text Completion"
            practiceTests={PracticeListsPart6}
            completedTests={PracticeHistoryPart6}
          />
          <PracticeList
            part={7}
            title="Reading Comprehension"
            practiceTests={PracticeListsPart7}
            completedTests={PracticeHistoryPart7}
          />
        </div>
      </div>
    </motion.div>
  );
}

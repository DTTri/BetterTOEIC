import CompletedPracticeLesson from "@/entities/CompletedPracticeLesson";
import CompletedPracticeTest from "@/entities/CompletedPracticeTest";
import PracticeTestHistory from "@/entities/PracticeHisotry";
import PracticeLesson from "@/entities/PracticeLesson";
import PracticeLessonHistory from "@/entities/PracticeLessonHistory";
import PracticeTest from "@/entities/PracticeTest";
import { signify } from "react-signify";

interface PracticeTestStoreConfig {
    practiceTestList: PracticeTest[];
    completedTests: CompletedPracticeTest[];
    practiceLesson: PracticeLesson[];
    completedLessons: CompletedPracticeLesson[];
}

export const practiceStore = signify<PracticeTestStoreConfig>({
    practiceTestList: [],
    completedTests: [],
    practiceLesson: [],
    completedLessons: [],
})

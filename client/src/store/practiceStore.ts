import CompletedPracticeLesson from "@/entities/CompletedPracticeLesson";
import CompletedPracticeTest from "@/entities/CompletedPracticeTest";
import PracticeLesson from "@/entities/PracticeLesson";
import PracticeTest from "@/entities/PracticeTest";
import { signify } from "react-signify";

interface PracticeTestStoreConfig {
    practiceTestList: PracticeTest[];
    completedPracticeTests: CompletedPracticeTest[];
    practiceLesson: PracticeLesson[];
    completedLessons: CompletedPracticeLesson[];
}

export const practiceStore = signify<PracticeTestStoreConfig>({
    practiceTestList: [],
    completedPracticeTests: [],
    practiceLesson: [],
    completedLessons: [],
})

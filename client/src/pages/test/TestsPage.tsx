
import { PageHeader, SearchBar } from "@/components";

import TestCardGallery from "@/components/test/TestCardGallery";
import PracticeLists from "../../components/practice/PracticeLists";
import PracticeHisotry from "@/entities/PracticeHisotry";
import {} from "@/entities/Practice";
import practices from "@/data/practice_test";
import LeftBar from "@/components/practice/LeftBar";
import QuestionPalette from "@/components/practice/QuestionPalette";


export default function TestsPage() {
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <QuestionPalette questionNumber={5} />
    </div>
  );
}

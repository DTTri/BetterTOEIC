import { PageHeader, SearchBar } from "@/components";
import PracticeHisotry from "@/entities/PracticeHisotry";

import QuestionPalette from "@/components/practice/QuestionPalette";

export default function TestsPage() {
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <QuestionPalette questionNumber={5} />
    </div>
  );
}

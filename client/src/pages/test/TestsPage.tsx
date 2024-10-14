// This is just a stub code (mock code)

import { PageHeader, SearchBar } from "@/components";
import LevelChart from "@/components/roadmap/LevelChart";
import LevelExplain from "@/components/roadmap/LevelExplain";
import Steps from "@/components/roadmap/Steps";

export default function TestsPage() {
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <Steps currentStep={2} />
      <div className="bg-white rounded-xl p-8 w-5/6 flex flex-col gap-8">
        <LevelChart />
        <LevelExplain
          level="Intermediate"
          explain="You can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type."
        />
      </div>
    </div>
  );
}

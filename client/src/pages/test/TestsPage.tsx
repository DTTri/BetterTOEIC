// This is just a stub code (mock code)

import { PageHeader, SearchBar } from "@/components";
import BuildRoadmapProgressBar from "@/components/roadmap/BuildRoadmapProgressBar";
import LevelChart from "@/components/roadmap/LevelChart";
import LevelExplain from "@/components/roadmap/LevelExplain";
import Steps from "@/components/roadmap/Steps";
import TestCardGallery from "@/components/test/TestCardGallery";

export default function TestsPage() {
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <PageHeader text="Thư viện đề thi theo đúng chuẩn ETS" />
      <SearchBar />
      {/* <TestCardGallery/> need data to test */}
    </div>
  );
}

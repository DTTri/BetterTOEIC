// This is just a stub code (mock code)

import { PageHeader, SearchBar } from "@/components";
import TestCard from "@/components/test/TestCard";
import TestCardGallery from "@/components/test/TestCardGallery";
export default function TestsPage() {
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <PageHeader text="Thư viện đề thi theo đúng chuẩn ETS" />
      <SearchBar />
    </div>
  );
}

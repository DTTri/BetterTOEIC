import { PageHeader, SearchBar } from "@/components";
import TestCardGallery from "@/components/test/TestCardGallery";
import { Test } from "@/entities";
import { testStore } from "@/store/testStore";

export default function TestsPage() {
  const testList: Test[] = testStore.use( pre => pre.testList);

  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <PageHeader text="Thư viện đề thi theo đúng chuẩn ETS" />
      <SearchBar />
      <TestCardGallery tests={testList}></TestCardGallery>  
    </div>
  );
}

import { PageHeader, SearchBar } from "@/components";

import TestCardGallery from "@/components/test/TestCardGallery";

export default function TestsPage() {
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <PageHeader text="Thư viện đề thi theo đúng chuẩn ETS" />
      <SearchBar />
      <TestCardGallery
        tests={
          // type Test = {
          //   _id: string;
          //   title: string;
          //   description: string;
          //   main_audio: string;
          //   created_by: string;
          //   created_at: string;
          //   updated_at: string;
          //   difficulty: string;
          //   questions: Question[];
          // };
          [
            {
              _id: "1",
              title: "Test 1",
              description: "Test 1 description",
              main_audio: "Test 1 audio",
              created_by: "Test 1 creator",
              created_at: "Test 1 created at",
              updated_at: "Test 1 updated at",
              difficulty: "Test 1 difficulty",
              questions: [],
            },
            {
              _id: "2",
              title: "Test 2",
              description: "Test 2 description",
              main_audio: "Test 2 audio",
              created_by: "Test 2 creator",
              created_at: "Test 2 created at",
              updated_at: "Test 2 updated at",
              difficulty: "Test 2 difficulty",
              questions: [],
            },
            {
              _id: "3",
              title: "Test 3",
              description: "Test 3 description",
              main_audio: "Test 3 audio",
              created_by: "Test 3 creator",
              created_at: "Test 3 created at",
              updated_at: "Test 3 updated at",
              difficulty: "Test 3 difficulty",
              questions: [],
            },
          ]
        }
      />
    </div>
  );
}

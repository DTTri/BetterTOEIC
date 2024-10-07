// This is just a stub code (mock code)

import SearchBar from "@/components/SearchBar";
import PageHeader from "../../components/PageHeader";
import { Button } from "@/components/ui/button";
import QuestionsListContainer from "@/components/test/QuestionsListContainer";
export default function TestsPage() {
  const headingText = "Thư viện đề thi theo đúng chuẩn ETS";
  return (
    <div className="bg-background flex flex-col gap-8 items-center pt-8">
      <SearchBar />
      <PageHeader text={headingText} />
      <Button>Testing shadcn</Button>
      <QuestionsListContainer />
    </div>
  );
}

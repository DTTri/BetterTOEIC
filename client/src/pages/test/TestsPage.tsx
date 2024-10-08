// This is just a stub code (mock code)

import SearchBar from "@/components/SearchBar";
import PageHeader from "../../components/PageHeader";
import { Button } from "@/components/ui/button";
import QuestionsListContainer from "@/components/test/QuestionsListContainer";
import TestResultsTable from "@/components/test/TestResultsTable";
import Footer from "@/components/Footer";
export default function TestsPage() {
  const headingText = "Thư viện đề thi theo đúng chuẩn ETS";
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <Footer></Footer>
    </div>
  );
}
import { Footer, PageHeader, SearchBar } from "@/components";

import TestCardGallery from "@/components/test/TestCardGallery";
import PracticeList from "../../components/practice/PracticeList";
import LeftBar from "@/components/practice/LeftBar";
import QuestionPalette from "@/components/practice/QuestionPalette";
import CountingTimer from "@/components/practice/CountingTimer";
import ErrorPage from "../error/ErrorPage";
import { useNavigate } from "react-router-dom";

export default function TestsPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-background flex flex-col gap-4 items-center py-8">
      <button
        onClick={() => {
          navigate("/error", { state: { errorType: "404" } });
        }}
      >
        Go to Error Page
      </button>
    </div>
  );
}

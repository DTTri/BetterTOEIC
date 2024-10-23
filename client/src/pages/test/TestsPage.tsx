import { PageHeader, SearchBar } from "@/components";

import TestCardGallery from "@/components/test/TestCardGallery";
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

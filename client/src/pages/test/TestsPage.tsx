// This is just a stub code (mock code)

import TakingTestPage from "./TakingTestPage";
import ListeningAudio from "../../components/test/ListeningAudio";
import QuestionComponent from "../../components/test/QuestionComponent";
import Timer from "../../components/test/Timer";
import TestCard from "../../components/test/TestCard";
import { Footer } from "@/components";
export default function TestsPage() {
  return (
    <div className="">
      <TakingTestPage />;
      <Footer />
      <TestCard titleTestCard="Test 1" />
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import TestsPage from "./pages/test/TestsPage";
import TestDetailsPage from "./pages/test/TestDetailsPage";
import RoadmapPage from "./pages/roadmap/RoadmapPage";
import TakingTestPage from "./pages/test/TakingTestPage";
function App() {
  // useSelector to get the test from the store by id, currently hardcode the test data
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
  return (
    <Routes>
      <Route path="/" element={<TestsPage />} />
      <Route
        path="/test/:id"
        element={
          <TestDetailsPage
            test={{
              _id: "1",
              title: "Test 1",
              description: "Test 1 description",
              main_audio: "Test 1 audio",
              created_by: "Test 1 creator",
              created_at: "Test 1 created at",
              updated_at: "Test 1 updated at",
              difficulty: "Test 1 difficulty",
              questions: [],
            }}
          />
        }
      />
      <Route path="/taking-test" element={<TakingTestPage />} />
      <Route path="/road-map" element={<RoadmapPage />} />
    </Routes>
  );
}

export default App;

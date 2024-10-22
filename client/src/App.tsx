import { Route, Routes } from "react-router-dom";

import {
  TestsPage,
  TestDetailsPage,
  TakingTestPage,
  RoadmapPage,
  CreatingRoadmapPage,
  DoingRoadmapExsPage,
  OverallManagementPage,
  TestManagementPage,
  PracticeManagementPage,
  RoadmapManagementPage,
  UserManagementPage,
  VocabManagementPage,
  ForumManagementPage,
} from "./pages";

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
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/creating-roadmap" element={<CreatingRoadmapPage />} />
      <Route
        path="/doing-roadmap/:phase/:part/:chapter"
        element={<DoingRoadmapExsPage />}
      />

      <Route path="/admin/overall" element={<OverallManagementPage />} />
      <Route path="/admin/tests" element={<TestManagementPage />} />
      <Route path="/admin/practices" element={<PracticeManagementPage />} />
      <Route path="/admin/roadmaps" element={<RoadmapManagementPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/vocabs" element={<VocabManagementPage />} />
      <Route path="/admin/forums" element={<ForumManagementPage />} />
    </Routes>
  );
}

export default App;

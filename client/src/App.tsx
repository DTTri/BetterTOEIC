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
  PracticePage,
  TakingPracticePage,
} from "./pages";
import ErrorPage from "./pages/error/ErrorPage";
import VocabCardGallery from "./pages/vocab/VocabCardGalleryPage";
import VocabLearingPage from "./pages/vocab/VocabLearingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import RessetPasswordPage from "./pages/auth/RessetPasswordPage";
import CreatingTestPage from "./pages/admin/test/CreatingTestPage";
import CreatingMiniTestPage from "./pages/admin/test/CreatingMiniTestPage";
import CreatingPracticeExsPage from "./pages/admin/practice/CreatingPracticeExsPage";
import CreatingPracticeLessonsPage from "./pages/admin/practice/CreatingPracticeLessonsPage";
import CreatingRoadmapExsPage from "./pages/admin/roadmap/CreatingRoadmapExsPage";
import CreatingPostPage from "./pages/admin/forum/CreatingPostPage";
import CreatingVocabsPage from "./pages/admin/vocab/CreatingVocabsPage";
import AdminLayout from "./components/admin/AdminLayout";
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
      <Route path="/practice" element={<PracticePage />} />
      <Route
        path="/taking-practice/:part/:id"
        element={<TakingPracticePage />}
      />
      <Route path="/creating-roadmap" element={<CreatingRoadmapPage />} />
      <Route path="/vocab-gallery" element={<VocabCardGallery />} />
      <Route path="/vocab-learning/:id" element={<VocabLearingPage />} />
      <Route
        path="/doing-roadmap/:phase/:part/:chapter"
        element={<DoingRoadmapExsPage />}
      />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="overall" element={<OverallManagementPage />} />
        <Route path="test" element={<TestManagementPage />} />
        <Route path="practice" element={<PracticeManagementPage />} />
        <Route path="roadmap" element={<RoadmapManagementPage />} />
        <Route path="forum" element={<ForumManagementPage />} />
        <Route path="user" element={<UserManagementPage />} />
        <Route path="vocab" element={<VocabManagementPage />} />
        <Route path="test/creatingTest" element={<CreatingTestPage />} />
        <Route
          path="test/creatingMiniTest"
          element={<CreatingMiniTestPage />}
        />
        <Route
          path="pratice/creatingPracticeEx"
          element={<CreatingPracticeExsPage />}
        />
        <Route
          path="practice/creatingPracticeLesson"
          element={<CreatingPracticeLessonsPage />}
        />
        <Route
          path="roadmap/creatingRoadmapEx"
          element={<CreatingRoadmapExsPage />}
        />
        <Route path="forum/creatingPost" element={<CreatingPostPage />} />
        <Route path="vocab/creatingVocab" element={<CreatingVocabsPage />} />
      </Route>

      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/resset-password" element={<RessetPasswordPage />} />
    </Routes>
  );
}

export default App;

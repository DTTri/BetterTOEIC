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
import PersonalImformationPage from "./pages/personal/PersonalImformationPage";
import ReportUserPage from "./pages/personal/ReportUserPage";
import WordSavedPage from "./pages/personal/WordsSavedPage";
import TestsSavedPage from "./pages/personal/TestsSavedPage";
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

      <Route path="/admin/overall" element={<OverallManagementPage />} />
      <Route path="/admin/tests" element={<TestManagementPage />} />
      <Route path="/admin/practices" element={<PracticeManagementPage />} />
      <Route path="/admin/roadmaps" element={<RoadmapManagementPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/vocabs" element={<VocabManagementPage />} />
      <Route path="/admin/forums" element={<ForumManagementPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/resset-password" element={<RessetPasswordPage />} />
      <Route path="/personal-information" element={<PersonalImformationPage />} />
      <Route path="/word-saved" element={<WordSavedPage />} />
      <Route path="/test-saved" element={<TestsSavedPage />} />
      <Route path="/report-user" element={<ReportUserPage />} />
    </Routes>
  );
}

export default App;

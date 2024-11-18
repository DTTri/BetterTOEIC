import { Route, Routes } from "react-router-dom";
import {
  CreatingRoadmapPage,
  DoingRoadmapExsPage,
  ForumManagementPage,
  OverallManagementPage,
  PracticeManagementPage,
  PracticePage,
  RoadmapManagementPage,
  RoadmapPage,
  TakingPracticePage,
  TakingTestPage,
  TestDetailsPage,
  TestManagementPage,
  TestsPage,
  UserManagementPage,
  VocabManagementPage,
} from "./pages";
import CreatingPostPage from "./pages/admin/forum/CreatingPostPage";
import CreatingPracticeExsPage from "./pages/admin/practice/CreatingPracticeExsPage";
import CreatingPracticeLessonsPage from "./pages/admin/practice/CreatingPracticeLessonsPage";
import CreatingRoadmapExsPage from "./pages/admin/roadmap/CreatingRoadmapExsPage";
import CreatingMiniTestPage from "./pages/admin/test/CreatingMiniTestPage";
import CreatingTestPage from "./pages/admin/test/CreatingTestPage";
import CreatingVocabsPage from "./pages/admin/vocab/CreatingVocabsPage";
import AdminLayout from "./pages/AdminLayout";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RessetPasswordPage from "./pages/auth/RessetPasswordPage";
import ErrorPage from "./pages/error/ErrorPage";
import ForumPage from "./pages/forum/ForumPage";
import PostDetailPage from "./pages/forum/PostDetailPage";
import PersonalImformationPage from "./pages/personal/PersonalImformationPage";
import ReportUserPage from "./pages/personal/ReportUserPage";
import TestsSavedPage from "./pages/personal/TestsSavedPage";
import WordSavedPage from "./pages/personal/WordsSavedPage";
import UserLayout from "./pages/UserLayout";
import { useEffect } from "react";
import { testService } from "./services";
import VocabCardGallery from "./pages/vocab/VocabCardGalleryPage";
import VocabLearingPage from "./pages/vocab/VocabLearingPage";
import { sCreatingPersonalRoadmap, sRoadmap, sUser } from "./store";
import { roadmapService } from "./services";
import { testStore } from "./store/testStore";

function App() {
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await testService.getTests();
        console.log(response);
        if (response.EC === 0) {
          testStore.set((prev) => (prev.value.testList = response.DT));
        } else {
          console.log("Fail to fetch tests: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch tests: ", error);
      }
    };
    const fetchTestHistory = async () => {
      try {
        const response = await testService.getTestHistory(sUser.value.id);
        console.log(response);
        if (response.EC === 0) {
          testStore.set((prev) => (prev.value.testHistory = response.DT));
        } else {
          console.log("Fail to fetch test history: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch test history: ", error);
      }
    };
    const fetchTestSaved = async () => {
      try {
        const response = await testService.getTestsSaved(sUser.value.id);
        console.log(response);
        if (response.EC === 0) {
          testStore.set((prev) => (prev.value.testsSaved = response.DT));
        } else {
          console.log("Fail to fetch test saved: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch test saved: ", error);
      }
    };
    Promise.all([fetchTests(), fetchTestHistory(), fetchTestSaved()]);
  }, [])
  useEffect(() => {
    const fetchRoadmapExercises = async () => {
      try {
        const res = await roadmapService.getRoadmapExercisesByPhase(1);
        if (res.EC === 0) {
          sRoadmap.set((pre) => (pre.value.exercises = res.DT));
          console.log("fetch roadmap exercises", res.DT);
        } else {
          console.log(res.EM);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUserRoadmap = async () => {
      try {
        const res = await roadmapService.getRoadmapHistory(sUser.value.id);
        if (res.EC === 0) {
          sRoadmap.set((pre) => (pre.value.userRoadmap = res.DT));
          sCreatingPersonalRoadmap.set((pre) => {
            pre.value.startLevel = res.DT.current_level;
            pre.value.targetLevel = res.DT.target_level;
          });
          console.log("fetch user roadmap", res.DT);
        } else {
          console.log(res.EM);
        }
      } catch (err) {
        console.log(err);
      }
    };
    Promise.all([fetchRoadmapExercises(), fetchUserRoadmap()]);
  });
  return (
    <Routes>
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
          path="practice/creatingPracticeEx"
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
      <Route path="/test" element={<UserLayout><TestsPage /></UserLayout>} />
      <Route
        path="/test/:id"
        element={
          <UserLayout>
            <TestDetailsPage
            />
          </UserLayout>
        }
      />
      <Route path="/taking-test/:id" element={<UserLayout haveFooter={false}><TakingTestPage /></UserLayout>} />
      <Route path="/road-map" element={<UserLayout haveFooter={false}><RoadmapPage /></UserLayout>} />
      <Route path="/practice" element={<UserLayout><PracticePage /></UserLayout>} />
      <Route
        path="/taking-practice/:part/:id"
        element={<TakingPracticePage />}
      />
      <Route
        path="/creating-roadmap"
        element={
          <UserLayout haveFooter={false}>
            <CreatingRoadmapPage />
          </UserLayout>
        }
      />
      <Route
        path="/vocab-gallery"
        element={
          <UserLayout>
            <VocabCardGallery />
          </UserLayout>
        }
      />
      <Route
        path="/vocab-learning/:id"
        element={
          <UserLayout haveFooter={false}>
            <VocabLearingPage />
          </UserLayout>
        }
      />
      <Route
        path="/roadmap/:roadmapExerciseId"
        element={
          <UserLayout haveFooter={false}>
            <DoingRoadmapExsPage />
          </UserLayout>
        }
      />

      <Route
        path="/error"
        element={
          <UserLayout>
            <ErrorPage />
          </UserLayout>
        }
      />
      <Route
        path="*"
        element={
          <UserLayout>
            <ErrorPage />
          </UserLayout>
        }
      />
      <Route
        path="/login"
        element={
          <UserLayout>
            <LoginPage />
          </UserLayout>
        }
      />
      <Route
        path="/register"
        element={
          <UserLayout>
            <RegisterPage />
          </UserLayout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <UserLayout>
            <ForgotPasswordPage />
          </UserLayout>
        }
      />
      <Route
        path="/resset-password"
        element={
          <UserLayout>
            <RessetPasswordPage />
          </UserLayout>
        }
      />
      <Route
        path="/forum"
        element={
          <UserLayout>
            <ForumPage />
          </UserLayout>
        }
      />
      <Route
        path="/post-detail/:id"
        element={
          <UserLayout haveFooter={false}>
            <PostDetailPage />
          </UserLayout>
        }
      />
      <Route
        path="/personal-information"
        element={
          <UserLayout>
            <PersonalImformationPage />
          </UserLayout>
        }
      />
      <Route
        path="/word-saved"
        element={
          <UserLayout haveFooter={false}>
            <WordSavedPage />
          </UserLayout>
        }
      />
      <Route
        path="/test-saved"
        element={
          <UserLayout haveFooter={false}>
            <TestsSavedPage />
          </UserLayout>
        }
      />
      <Route
        path="/report-user"
        element={
          <UserLayout haveFooter={false}>
            <ReportUserPage />
          </UserLayout>
        }
      />
    </Routes>
  );
}

export default App;

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
import { sCreatingPersonalRoadmap, sRoadmap, sUser, sVocab } from "./store";
import { roadmapService } from "./services";
import { testStore } from "./store/testStore";
import practiceService from "./services/practiceService";
import { practiceStore } from "./store/practiceStore";
import vocabService from "./services/vocabService";

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
        if (response.EC === 0) {
          console.log("Test saved" + response.DT.savedTests);
          testStore.set((prev) => (prev.value.testsSaved = response.DT));
        } else {
          console.log("Fail to fetch test saved: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch test saved: ", error);
      }
    };
    const fetchPracticeTests = async () => {
      try {
        const response = await practiceService.getPracticeTests();
        console.log(response);
        if (response.EC === 0) {
          practiceStore.set(
            (prev) => (prev.value.practiceTestList = response.DT)
          );
        } else {
          console.log("Fail to fetch practice tests: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch practice tests: ", error);
      }
    };
    const fetchPracticeTestHistory = async () => {
      try {
        const response = await practiceService.getPracticeTestHistory(
          sUser.value.id
        );
        console.log(response);
        if (response.EC === 0) {
          practiceStore.set(
            (prev) => (prev.value.completedPracticeTests = response.DT)
          );
        } else {
          console.log("Fail to fetch pracitce test history: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch pracitce test history: ", error);
      }
    };
    const fetchPracticeLesson = async () => {
      try {
        const response = await practiceService.getPracticeLessons();
        console.log(response);
        if (response.EC === 0) {
          practiceStore.set(
            (prev) => (prev.value.practiceLesson = response.DT)
          );
        } else {
          console.log("Fail to fetch practice lesson: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch practice lesson: ", error);
      }
    };
    const fetchPracticeLessonHistory = async () => {
      try {
        const response = await practiceService.getPracticeLessonHistory(
          sUser.value.id
        );
        console.log(response);
        if (response.EC === 0) {
          practiceStore.set(
            (prev) =>
              (prev.value.completedLessons =
                response.DT.completedPracticeLessons)
          );
        } else {
          console.log("Fail to fetch pracitce lesson history: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch pracitce lesson history: ", error);
      }
    };
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

    const fetchVocabs = async () => {
      try {
        const response = await vocabService.getAllVocabTopics();
        if (response.EC === 0) {
          console.log(response);
          sVocab.set((prev) => (prev.value.vocabTopics = response.DT));
        } else {
          console.log("Fail to fetch vocabs: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch vocabs: ", error);
      }
    };
    const fetchSavedVocabs = async () => {
      try {
        const response = await vocabService.getVocabsSaved(sUser.value.id);
        if (response.EC === 0) {
          console.log(response);
          sVocab.set((prev) => (prev.value.vocabsSaved = response.DT));
        } else {
          console.log("Fail to fetch saved vocabs: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch saved vocabs: ", error);
      }
    };
    Promise.all([
      fetchTests(),
      fetchTestHistory(),
      fetchTestSaved(),
      fetchPracticeTests(),
      fetchPracticeTestHistory(),
      fetchPracticeLesson(),
      fetchPracticeLessonHistory(),
      fetchRoadmapExercises(),
      fetchUserRoadmap(),
      fetchVocabs(),
      fetchSavedVocabs(),
    ]);
  }, []);

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
      <Route
        path="/test"
        element={
          <UserLayout>
            <TestsPage />
          </UserLayout>
        }
      />
      <Route
        path="/test/:id"
        element={
          <UserLayout>
            <TestDetailsPage />
          </UserLayout>
        }
      />
      <Route
        path="/taking-test/:id"
        element={
          <UserLayout haveFooter={false}>
            <TakingTestPage />
          </UserLayout>
        }
      />
      <Route
        path="/road-map"
        element={
          <UserLayout haveFooter={false}>
            <RoadmapPage />
          </UserLayout>
        }
      />
      <Route
        path="/practice"
        element={
          <UserLayout>
            <PracticePage />
          </UserLayout>
        }
      />
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
        path="/user-info"
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
        path="/user-report"
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

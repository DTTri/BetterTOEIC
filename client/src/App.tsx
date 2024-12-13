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
import { forumService, testService, userService } from "./services";
import VocabCardGallery from "./pages/vocab/VocabCardGalleryPage";
import VocabLearingPage from "./pages/vocab/VocabLearingPage";
import { sRoadmap, sUser, sVocab } from "./store";
import { roadmapService } from "./services";
import { testStore } from "./store/testStore";
import practiceService from "./services/practiceService";
import { practiceStore } from "./store/practiceStore";
import vocabService from "./services/vocabService";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import AuthLayout from "./pages/AuthLayout";
import sForum from "./store/forumStore";
import ReviewTestPage from "./pages/test/ReviewTestPage";
import ReviewPracticePage from "./pages/practice/ReviewPracticePage";
import { User } from "./entities";

function App() {
  const curUser = localStorage.getItem("_id") || sessionStorage.getItem("_id");
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await userService.getUsers();
        console.log(response);
        if (response.EC === 0) {
          sUser.set((prev) => (prev.value.users = response.DT));
          if (curUser && curUser !== "") {
            response.DT.forEach((user: User) => {
              if (user._id === curUser) {
                sUser.set((prev) => (prev.value.info = user));
              }
            });
          }
        } else {
          console.log("Fail to fetch all users: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch all users: ", error);
      }
    };

    const fetchUsersPerBand = async () => {
      try {
        const response = await userService.getTotalUsersPerBand();
        console.log(response);
        if (response.EC === 0) {
          sUser.set((prev) => (prev.value.usersPerBand = response.DT));
        } else {
          console.log("Fail to fetch users per band: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch users per band: ", error);
      }
    };
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
        const response = await testService.getTestHistory(curUser || "");
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
        const response = await testService.getTestsSaved(curUser || "");
        if (response.EC === 0) {
          console.log("Test saved" + response.DT);
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
          curUser || ""
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
          curUser || ""
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
        console.log("User roadmap: " + sRoadmap.value.userRoadmap);
        const res = await roadmapService.getRoadmapExercisesByPhase(
          sRoadmap.value.userRoadmap?.current_level || 1
        );
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
        const res = await roadmapService.getRoadmapHistory(curUser || "");
        if (res.EC === 0) {
          sRoadmap.set((pre) => (pre.value.userRoadmap = res.DT));

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
        const response = await vocabService.getVocabsSaved(curUser || "");
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
    const fetchVocabHistory = async () => {
      try {
        const response = await vocabService.getVocabHistory(curUser || "");
        if (response.EC === 0) {
          console.log(response);
          sVocab.set((prev) => (prev.value.vocabHistory = response.DT.topics));
        } else {
          console.log("Fail to fetch vocab history: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch vocab history: ", error);
      }
    };
    const fetchForum = async () => {
      try {
        const response = await forumService.getAllPosts();
        if (response.EC === 0) {
          console.log(response);
          sForum.set((prev) => (prev.value.posts = response.DT));
        } else {
          console.log("Fail to fetch forum: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch forum: ", error);
      }
    };
    const fetchData = async () => {
      await fetchAllUsers();
      await fetchUserRoadmap();
      await Promise.all([
        fetchUsersPerBand(),
        fetchTests(),
        fetchTestHistory(),
        fetchTestSaved(),
        fetchPracticeTests(),
        fetchPracticeTestHistory(),
        fetchPracticeLesson(),
        fetchPracticeLessonHistory(),
        fetchRoadmapExercises(),
        fetchVocabs(),
        fetchSavedVocabs(),
        fetchVocabHistory(),
        fetchForum(),
      ]);
    };
    fetchData();
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
        path="/review-test/:id"
        element={
          <UserLayout haveFooter={false}>
            <ReviewTestPage />
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
        element={
          <UserLayout haveFooter={false}>
            <TakingPracticePage />
          </UserLayout>
        }
      />
      <Route
        path="/review-practice/:part/:id"
        element={
          <UserLayout haveFooter={false}>
            <ReviewPracticePage />
          </UserLayout>
        }
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
        path="/forum"
        element={
          <UserLayout haveFooter={false}>
            <ForumPage />
          </UserLayout>
        }
      />
      <Route
        path="/forum/create-post"
        element={
          <UserLayout haveFooter={false}>
            <CreatingPostPage />
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
      <Route path="" element={<AuthLayout></AuthLayout>}>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<RessetPasswordPage />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
      </Route>
    </Routes>
  );
}

export default App;

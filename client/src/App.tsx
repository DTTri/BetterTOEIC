import { Route, Routes } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

import {
  AdminLayout,
  AuthLayout,
  CreatingPostPage,
  CreatingPracticeExsPage,
  CreatingPracticeLessonsPage,
  CreatingRoadmapExsPage,
  CreatingRoadmapPage,
  CreatingTestPage,
  CreatingVocabsPage,
  DoingRoadmapExsPage,
  ErrorPage,
  ForgotPasswordPage,
  ForumManagementPage,
  ForumPage,
  HomePage,
  LoginPage,
  OverallManagementPage,
  PersonalImformationPage,
  PostDetailPage,
  PracticeManagementPage,
  PracticePage,
  RegisterPage,
  ReportUserPage,
  ReviewPracticePage,
  ReviewTestPage,
  RoadmapManagementPage,
  RoadmapPage,
  TakingPracticePage,
  TakingTestPage,
  TestDetailsPage,
  TestManagementPage,
  TestsPage,
  TestsSavedPage,
  UserLayout,
  UserManagementPage,
  VerifyEmailPage,
  VocabCardGalleryPage,
  VocabLearingPage,
  VocabManagementPage,
  WordSavedPage,
  LoginOauth,
  LearnPracticeLesson,
  CreatingSWTestPage,
  ReviewSWTestPage,
  SWTestDetailsPage,
} from "./pages";

import { useEffect } from "react";
import {
  forumService,
  testService,
  userService,
  roadmapService,
  vocabService,
  practiceService,
  chatService,
  swTestService,
} from "./services";
import {
  sRoadmap,
  sUser,
  sVocab,
  testStore,
  practiceStore,
  sForum,
  sChat,
  swTestStore,
} from "./store";
import { User } from "./entities";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import RessetPasswordPage from "./pages/auth/RessetPasswordPage";
import TakingSWTest from "./pages/test/TakingSWTest";

function App() {
  const userJustLoggedIn = sUser.use((state) => state.info);
  useEffect(() => {
    const curUser =
      localStorage.getItem("_id") || sessionStorage.getItem("_id");

    const fetchAllUsers = async () => {
      try {
        const response = await userService.getUsers();
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
          //console.log("Fail to fetch all users: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch all users: ", error);
      }
    };

    const fetchUsersPerBand = async () => {
      try {
        const response = await userService.getTotalUsersPerBand();
        if (response.EC === 0) {
          sUser.set((prev) => (prev.value.usersPerBand = response.DT));
        } else {
          console.log("Fail to fetch users per band: ", response.EM);
          // toast("Fail to fetch users per band", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch users per band: ", error);
        // toast("Fail to fetch users per band", {
        //   type: "error",
        // });
      }
    };

    const fetchTests = async () => {
      try {
        const response = await testService.getTests();
        if (response.EC === 0) {
          testStore.set((prev) => (prev.value.testList = response.DT));
        } else {
          console.log("Fail to fetch tests: ", response.EM);
          // toast("Fail to fetch tests", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch tests: ", error);
        // toast("Fail to fetch tests", {
        //   type: "error",
        // });
      }
    };

    const fetchTestHistory = async () => {
      try {
        const response = await testService.getTestHistory(curUser || "");
        if (response.EC === 0) {
          testStore.set((prev) => (prev.value.testHistory = response.DT));
        } else {
          console.log("Fail to fetch test history: ", response.EM);
          // toast("Fail to fetch test history", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch test history: ", error);
        // toast("Fail to fetch test history", {
        //   type: "error",
        // });
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
          // toast("Fail to fetch test saved", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch test saved: ", error);
        // toast("Fail to fetch test saved", {
        //   type: "error",
        // });
      }
    };

    const fetchPracticeTests = async () => {
      try {
        const response = await practiceService.getPracticeTests();
        if (response.EC === 0) {
          practiceStore.set(
            (prev) => (prev.value.practiceTestList = response.DT)
          );
        } else {
          console.log("Fail to fetch practice tests: ", response.EM);
          // toast("Fail to fetch practice tests", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch practice tests: ", error);
        // toast("Fail to fetch practice tests", {
        //   type: "error",
        // });
      }
    };

    const fetchPracticeTestHistory = async () => {
      try {
        const response = await practiceService.getPracticeTestHistory(
          curUser || ""
        );
        if (response.EC === 0) {
          console.log("history" + response.DT.length);
          practiceStore.set(
            (prev) => (prev.value.completedPracticeTests = response.DT)
          );
        } else {
          console.log("Fail to fetch pracitce test history: ", response.EM);
          // toast("Fail to fetch practice test history", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch pracitce test history: ", error);
        // toast("Fail to fetch practice test history", {
        //   type: "error",
        // });
      }
    };

    const fetchPracticeLesson = async () => {
      try {
        const response = await practiceService.getPracticeLessons();
        if (response.EC === 0) {
          practiceStore.set(
            (prev) => (prev.value.practiceLesson = response.DT)
          );
        } else {
          console.log("Fail to fetch practice lesson: ", response.EM);
          // toast("Fail to fetch practice lesson", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch practice lesson: ", error);
        // toast("Fail to fetch practice lesson", {
        //   type: "error",
        // });
      }
    };

    const fetchPracticeLessonHistory = async () => {
      try {
        const response = await practiceService.getPracticeLessonHistory(
          curUser || ""
        );
        if (response.EC === 0) {
          practiceStore.set(
            (prev) =>
              (prev.value.completedLessons =
                response.DT.completedPracticeLessons)
          );
        } else {
          console.log("Fail to fetch pracitce lesson history: ", response.EM);
          // toast("Fail to fetch practice lesson history", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch pracitce lesson history: ", error);
        // toast("Fail to fetch practice lesson history", {
        //   type: "error",
        // });
      }
    };

    const fetchRoadmapExercises = async () => {
      try {
        const res = await roadmapService.getRoadmapExercisesByPhase(
          sRoadmap.value.userRoadmap?.current_level || 1
        );
        if (res.EC === 0) {
          sRoadmap.set((pre) => (pre.value.exercises = res.DT));
        } else {
          console.log(res.EM);
          // toast("Fail to fetch roadmap exercises", {
          //   type: "error",
          // });
        }
      } catch (err) {
        console.log(err);
        // toast("Fail to fetch roadmap exercises", {
        //   type: "error",
        // });
      }
    };

    const fetchUserRoadmap = async () => {
      try {
        const res = await roadmapService.getRoadmapHistory(curUser || "");
        if (res.EC === 0) {
          sRoadmap.set((pre) => (pre.value.userRoadmap = res.DT));
        } else {
          console.log(res.EM);
          // toast("Fail to fetch user roadmap", {
          //   type: "error",
          // });
        }
      } catch (err) {
        console.log(err);
        // toast("Fail to fetch user roadmap", {
        //   type: "error",
        // });
      }
    };

    const fetchVocabs = async () => {
      try {
        const response = await vocabService.getAllVocabTopics();
        if (response.EC === 0) {
          sVocab.set((prev) => (prev.value.vocabTopics = response.DT));
        } else {
          console.log("Fail to fetch vocabs: ", response.EM);
          // toast("Fail to fetch vocabs", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch vocabs: ", error);
        // toast("Fail to fetch vocabs", {
        //   type: "error",
        // });
      }
    };

    const fetchSavedVocabs = async () => {
      try {
        const response = await vocabService.getVocabsSaved(curUser || "");
        if (response.EC === 0) {
          sVocab.set((prev) => (prev.value.vocabsSaved = response.DT));
        } else {
          console.log("Fail to fetch saved vocabs: ", response.EM);
          // toast("Fail to fetch saved vocabs", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch saved vocabs: ", error);
        // toast("Fail to fetch saved vocabs", {
        //   type: "error",
        // });
      }
    };

    const fetchVocabHistory = async () => {
      try {
        const response = await vocabService.getVocabHistory(curUser || "");
        if (response.EC === 0) {
          sVocab.set((prev) => (prev.value.vocabHistory = response.DT.topics));
        } else {
          console.log("Fail to fetch vocab history: ", response.EM);
          // toast("Fail to fetch vocab history", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch vocab history: ", error);
        // toast("Fail to fetch vocab history", {
        //   type: "error",
        // });
      }
    };

    const fetchForum = async () => {
      try {
        const response = await forumService.getAllPosts();
        if (response.EC === 0) {
          sForum.set((prev) => (prev.value.posts = response.DT));
        } else {
          console.log("Fail to fetch forum: ", response.EM);
          // toast("Fail to fetch forum", {
          //   type: "error",
          // });
        }
      } catch (error) {
        console.log("Fail to fetch forum: ", error);
        // toast("Fail to fetch forum", {
        //   type: "error",
        // });
      }
    };

    const fetchChatHistory = async () => {
      try {
        const response = await chatService.getChatHistory(curUser || "");
        if (response.EC === 0) {
          sChat.set((prev) => (prev.value.chatHistory = response.DT.chats));
        } else {
          console.log("Fail to fetch chat history: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch chat history: ", error);
      }
    };
    const fetchSWTests = async () => {
      try {
        const response = await swTestService.getAllSWTests();
        if (response.EC === 0) {
          swTestStore.set((prev) => (prev.value.swTestList = response.DT));
        } else {
          console.log("Fail to fetch SW tests: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch SW tests: ", error);
      }
    };
    const fetchSWTestHistory = async () => {
      try {
        const response = await swTestService.getSWTestHistory(curUser || "");
        if (response.EC === 0) {
          swTestStore.set(
            (prev) => (prev.value.swTestHistory = response.DT.tests)
          );
          // console.log(
          //   "SW Test history fetched successfully",
          //   response.DT.tests
          // );
        } else {
          console.log("Fail to fetch SW test history: ", response.EM);
        }
      } catch (error) {
        console.log("Fail to fetch SW test history: ", error);
      }
    };

    const fetchSecureData = async () => {
      await fetchAllUsers();
      await fetchUserRoadmap();
      await Promise.all([
        fetchUsersPerBand(),
        fetchTestHistory(),
        fetchTestSaved(),
        fetchPracticeTestHistory(),
        fetchPracticeLesson(),
        fetchPracticeLessonHistory(),
        fetchRoadmapExercises(),
        fetchSavedVocabs(),
        fetchVocabHistory(),
        fetchChatHistory(),
        fetchSWTestHistory(),
      ]);
    };

    const fetchNotSecureData = async () => {
      await Promise.all([
        fetchTests(),
        fetchSWTests(),
        fetchForum(),
        fetchVocabs(),
        fetchPracticeTests(),
      ]);
    };
    fetchNotSecureData();
    if (curUser && curUser !== "") fetchSecureData();
  }, [userJustLoggedIn]);

  return (
    <>
      <ToastContainer
        style={{ zIndex: "1000" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Flip}
      />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<OverallManagementPage />} />
            <Route path="test" element={<TestManagementPage />} />
            <Route path="practice" element={<PracticeManagementPage />} />
            <Route path="roadmap" element={<RoadmapManagementPage />} />
            <Route path="forum" element={<ForumManagementPage />} />
            <Route path="user" element={<UserManagementPage />} />
            <Route path="vocab" element={<VocabManagementPage />} />
            <Route path="test/creatingTest" element={<CreatingTestPage />} />
            <Route
              path="test/creatingSWTest"
              element={<CreatingSWTestPage />}
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
            <Route
              path="vocab/creatingVocab"
              element={<CreatingVocabsPage />}
            />
          </Route>
          <Route
            path="/test"
            element={
              <UserLayout passAll={true}>
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
              <UserLayout haveFooter={false} haveChatBot={false}>
                <TakingTestPage />
              </UserLayout>
            }
          />
          <Route
            path="/taking-sw-test/:id"
            element={
              <UserLayout haveFooter={false} haveChatBot={false}>
                <TakingSWTest />
              </UserLayout>
            }
          />
          <Route
            path="/swtest/:id"
            element={
              <UserLayout>
                <SWTestDetailsPage />
              </UserLayout>
            }
          />
          <Route
            path="/taking-test/:id/evaluation"
            element={
              <UserLayout haveFooter={false}>
                <TakingTestPage isEvaluation={true} />
              </UserLayout>
            }
          />
          <Route
            path="/review-test/:id/:attemp"
            element={
              <UserLayout haveFooter={false}>
                <ReviewTestPage />
              </UserLayout>
            }
          />
          <Route
            path="/review-sw-test/:testId/:attemptId"
            element={
              <UserLayout haveFooter={false}>
                <ReviewSWTestPage />
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
              <UserLayout passAll={true}>
                <PracticePage />
              </UserLayout>
            }
          />
          <Route
            path="/pratice-lesson/:part/:id"
            element={
              <UserLayout haveFooter={false}>
                <LearnPracticeLesson />
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
              <UserLayout passAll={true}>
                <VocabCardGalleryPage />
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
              <UserLayout haveFooter={false} passAll={true}>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth" element={<LoginOauth />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<RessetPasswordPage />}
            />
            <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

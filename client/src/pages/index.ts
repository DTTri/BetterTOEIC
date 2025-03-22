// import ForumManagementPage from "./admin/forum/ForumManagementPage";
// import OverallManagementPage from "./admin/OverallManagementPage";
// import PracticeManagementPage from "./admin/practice/PracticeManagementPage";
// import RoadmapManagementPage from "./admin/roadmap/RoadmapManagementPage";
// import TestManagementPage from "./admin/test/TestManagementPage";
// import UserManagementPage from "./admin/UserManagementPage";
// import VocabManagementPage from "./admin/vocab/VocabManagementPage";
// import CreatingRoadmapPage from "./roadmap/CreatingRoadmapPage";
// import DoingRoadmapExsPage from "./roadmap/DoingRoadmapExsPage";
// import RoadmapPage from "./roadmap/RoadmapPage";
// import TakingTestPage from "./test/TakingTestPage";
// import TestDetailsPage from "./test/TestDetailsPage";
// import TestsPage from "./test/TestsPage";
// import PracticePage from "./practice/PracticePage";
// import TakingPracticePage from "./practice/TakingPracticePage";
// import AdminLayout from "./AdminLayout";
// import CreatingTestPage from "./admin/test/CreatingTestPage";
// import CreatingPracticeExsPage from "./admin/practice/CreatingPracticeExsPage";
// import CreatingPracticeLessonsPage from "./admin/practice/CreatingPracticeLessonsPage";
// import CreatingRoadmapExsPage from "./admin/roadmap/CreatingRoadmapExsPage";
// import CreatingPostPage from "./admin/forum/CreatingPostPage";
// import CreatingVocabsPage from "./admin/vocab/CreatingVocabsPage";
// import UserLayout from "./UserLayout";
// import ReviewTestPage from "./test/ReviewTestPage";
// import ReviewPracticePage from "./practice/ReviewPracticePage";
// import VocabCardGalleryPage from "./vocab/VocabCardGalleryPage";
// import VocabLearingPage from "./vocab/VocabLearingPage";
// import ForumPage from "./forum/ForumPage";
// import PostDetailPage from "./forum/PostDetailPage";
// import PersonalImformationPage from "./personal/PersonalImformationPage";
// import WordSavedPage from "./personal/WordsSavedPage";
// import TestsSavedPage from "./personal/TestsSavedPage";
// import ReportUserPage from "./personal/ReportUserPage";
// import ErrorPage from "./error/ErrorPage";
// import LoginPage from "./auth/LoginPage";
// import RegisterPage from "./auth/RegisterPage";
// import HomePage from "./HomePage";
// import ForgotPasswordPage from "./auth/ForgotPasswordPage";
// import VerifyEmailPage from "./auth/VerifyEmailPage";
// import RessetPasswordPage from "./auth/RessetPasswordPage";
// import AuthLayout from "./AuthLayout";
// import LoginOauth from "./auth/LoginOAuth";
// import LearnPracticeLesson from "./practice/LearnPracticeLesson";

import { lazy } from "react";
const CreatingRoadmapPage = lazy(() => import("./roadmap/CreatingRoadmapPage"));
// generate for all files
const DoingRoadmapExsPage = lazy(() => import("./roadmap/DoingRoadmapExsPage"));
const ForumManagementPage = lazy(
  () => import("./admin/forum/ForumManagementPage")
);
const OverallManagementPage = lazy(
  () => import("./admin/OverallManagementPage")
);
const PracticeManagementPage = lazy(
  () => import("./admin/practice/PracticeManagementPage")
);
const RoadmapManagementPage = lazy(
  () => import("./admin/roadmap/RoadmapManagementPage")
);
const TestManagementPage = lazy(
  () => import("./admin/test/TestManagementPage")
);
const UserManagementPage = lazy(() => import("./admin/UserManagementPage"));
const VocabManagementPage = lazy(
  () => import("./admin/vocab/VocabManagementPage")
);
const CreatingTestPage = lazy(() => import("./admin/test/CreatingTestPage"));
const CreatingPracticeExsPage = lazy(
  () => import("./admin/practice/CreatingPracticeExsPage")
);
const CreatingPracticeLessonsPage = lazy(
  () => import("./admin/practice/CreatingPracticeLessonsPage")
);
const CreatingRoadmapExsPage = lazy(
  () => import("./admin/roadmap/CreatingRoadmapExsPage")
);
const CreatingPostPage = lazy(() => import("./admin/forum/CreatingPostPage"));
const CreatingVocabsPage = lazy(
  () => import("./admin/vocab/CreatingVocabsPage")
);
const RoadmapPage = lazy(() => import("./roadmap/RoadmapPage"));
const TakingTestPage = lazy(() => import("./test/TakingTestPage"));
const TestDetailsPage = lazy(() => import("./test/TestDetailsPage"));
const TestsPage = lazy(() => import("./test/TestsPage"));
const PracticePage = lazy(() => import("./practice/PracticePage"));
const TakingPracticePage = lazy(() => import("./practice/TakingPracticePage"));

const ReviewTestPage = lazy(() => import("./test/ReviewTestPage"));
const ReviewPracticePage = lazy(() => import("./practice/ReviewPracticePage"));
const VocabCardGalleryPage = lazy(() => import("./vocab/VocabCardGalleryPage"));
const VocabLearingPage = lazy(() => import("./vocab/VocabLearingPage"));
const ForumPage = lazy(() => import("./forum/ForumPage"));
const PostDetailPage = lazy(() => import("./forum/PostDetailPage"));
const PersonalImformationPage = lazy(
  () => import("./personal/PersonalImformationPage")
);
const WordSavedPage = lazy(() => import("./personal/WordsSavedPage"));
const TestsSavedPage = lazy(() => import("./personal/TestsSavedPage"));
const ReportUserPage = lazy(() => import("./personal/ReportUserPage"));
const ErrorPage = lazy(() => import("./error/ErrorPage"));
const LoginPage = lazy(() => import("./auth/LoginPage"));
const RegisterPage = lazy(() => import("./auth/RegisterPage"));
const HomePage = lazy(() => import("./HomePage"));
const ForgotPasswordPage = lazy(() => import("./auth/ForgotPasswordPage"));
const VerifyEmailPage = lazy(() => import("./auth/VerifyEmailPage"));
const ResetPasswordPage = lazy(() => import("./auth/RessetPasswordPage"));
const LoginOauth = lazy(() => import("./auth/LoginOAuth"));
const LearnPracticeLesson = lazy(
  () => import("./practice/LearnPracticeLesson")
);
const AdminLayout = lazy(() => import("./AdminLayout"));
const UserLayout = lazy(() => import("./UserLayout"));
const AuthLayout = lazy(() => import("./AuthLayout"));

export {
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
  CreatingTestPage,
  CreatingPracticeExsPage,
  CreatingPracticeLessonsPage,
  CreatingRoadmapExsPage,
  CreatingPostPage,
  CreatingVocabsPage,
  AdminLayout,
  UserLayout,
  ReviewTestPage,
  ReviewPracticePage,
  VocabCardGalleryPage,
  VocabLearingPage,
  ForumPage,
  PostDetailPage,
  PersonalImformationPage,
  WordSavedPage,
  TestsSavedPage,
  ReportUserPage,
  ErrorPage,
  LoginPage,
  RegisterPage,
  HomePage,
  ForgotPasswordPage,
  VerifyEmailPage,
  ResetPasswordPage,
  AuthLayout,
  LoginOauth,
  LearnPracticeLesson,
};

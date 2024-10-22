//* React-hooks
import { useEffect } from "react";

//* React-router-dom
import { createBrowserRouter, Navigate } from "react-router-dom";

//* Redux
import { useDispatch, useSelector } from "react-redux";

//* Layouts
import AppLayout from "../layouts/AppLayout.tsx";
import CourseLayout from "../layouts/SubLayout/CourseLayout/CourseLayout.tsx";
import ProfileLayout from "../layouts/SubLayout/ProfileLayout/ProfileLayout.tsx";

//* Pages
import Home from "../pages/Home/Home.tsx";
import Contact from "../pages/Contact/Contact.tsx";
import SearchCourses from "../pages/SearchCourses/SearchCourses.tsx";

//* Components-UI
import ErrorMessage from "../components/ui/ErrorMessage/ErrorMessage.tsx";
import ProtectedRoute from "../components/ui/ProtectedRoute/ProtectedRoute.tsx";

//* Components-auth
import SignUpForm from "../features/auth/components/SignUpForm/SignUpForm.tsx";
import LogInForm from "../features/auth/components/LogInForm/LogInForm.tsx";

//* Components-course
import CourseCreation from "../features/course/components/CourseCreation/CourseCreation.tsx";
import CourseVideo from "../features/course/components/CourseVideo/CourseVideo.tsx";
import FavoriteCourses from "../features/course/components/FavoriteCourses/FavoriteCourses.tsx";
import CourseWishlist from "../features/course/components/CourseWishlist/CourseWishlist.tsx";
import MyCreatedCourses from "../features/course/components/MyCreatedCourses/MyCreatedCourses.tsx";
import OwnedCourses from "../features/course/components/OwnedCourses/OwnedCourses.tsx";
import CourseCertificates from "../features/course/components/CourseCertificates/CourseCertificates.tsx";

//* Components-user
import Overview from "../features/user/components/Overview/Overview.tsx";
import EditProfile from "../features/user/components/EditProfile/EditProfile.tsx";
import AccountSettings from "../features/user/components/AccountSettings/AccountSettings.tsx";
import SupportAndHelp from "../features/user/components/SupportAndHelp/SupportAndHelp.tsx";

//* Components-tasks
import TaskDashboard from "../features/tasks/components/TaskDashboard/TaskDashboard.tsx";

//* Slice-user
import { getUserFullInfo } from "../features/user/userSlice.ts";

//* Custom-hooks
import useAuth from "../hooks/useAuth.ts";

//* Types
import { AppDispatch, RootState } from "../data/store.ts";

function AppRouter() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  useAuth();

  useEffect(() => {
    if (user && user.email) {
      dispatch(getUserFullInfo(user));
    }
  }, [dispatch, user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorMessage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "search",
          element: <SearchCourses />,
        },
        {
          path: "tasks",
          element: <TaskDashboard />,
        },
        {
          path: "profile",
          element: <ProfileLayout />,
          children: [
            {
              path: "overview",
              index: true,
              element: <Overview />,
            },
            {
              path: "edit",
              element: <EditProfile />,
            },
            {
              path: "settings",
              element: <AccountSettings />,
            },
            {
              path: "support",
              element: <SupportAndHelp />,
            },
          ],
        },
        {
          path: "courses",
          element: <CourseLayout />,
          children: [
            {
              path: "owned",
              index: true,
              element: <OwnedCourses />,
            },
            {
              path: "created",
              element: <MyCreatedCourses />,
            },
            {
              path: "wishlist",
              element: <CourseWishlist />,
            },
            {
              path: "favorites",
              element: <FavoriteCourses />,
            },
            {
              path: "certificates",
              element: <CourseCertificates />,
            },
            {
              path: "create-course",
              element: <CourseCreation />,
            },
          ],
        },
        {
          path: "courses/:courseId",
          element: <CourseVideo />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/sign-up",
      element: !user ? <SignUpForm /> : <Navigate replace to="/" />,
    },
    {
      path: "/log-in",
      element: !user ? <LogInForm /> : <Navigate replace to="/" />,
    },
  ]);

  return router;
}

export default AppRouter;

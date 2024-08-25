//* react-hooks
// import { useEffect } from "react";

//* react-router
import { createBrowserRouter, Navigate } from "react-router-dom";

//* redux-hooks
// import { useSelector } from "react-redux";

//* layout
import AppLayout from "../layout/AppLayout.tsx";

//* pages
import Home from "../pages/Home/Home.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import Courses from "../pages/Courses/Courses.tsx";
import Contact from "../pages/Contact/Contact.tsx";
// import UserPage from "../pages/UserPage/UserPage";

//* components-UI
import ErrorMessage from "../components/ui/ErrorMessage/ErrorMessage.tsx";
import SignUpForm from "../features/auth/SignUpForm/SignUpForm.tsx";
import LogInForm from "../features/auth/LogInForm/LogInForm.tsx";
// import ProtectedRoute from "../components/ui/ProtectedRoute/ProtectedRoute.tsx";
// import { useSelector } from "react-redux";
// import { RootState } from "../data/store.ts";
import CourseCreation from "../features/course/CourseCreation/CourseCreation.tsx";
import CourseVideo from "../features/course/CourseVideo/CourseVideo.tsx";
import ProtectedRoute from "../components/ui/ProtectedRoute/ProtectedRoute.tsx";
import { RootState } from "../data/store.ts";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth.ts";
// import ProtectedRoute from "../components/ui/ProtectedRoute/ProtectedRoute.tsx";

//* custom-hooks
// import useAuth from "../hooks/useAuth";

// NOTE: This seems to be ok, since it's being called in a top level component that doesn't have its own state
// If it did, you might have an issue with React keeping track of existing state in the hooks here.
function AppRouter() {
  // const user = useSelector((state) => state.user.user);
  // const userSignedIn = useSelector((state) => state.user.userSignedIn);
  // const error = useSelector((state) => state.user.error);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user: ", user);

  useAuth();

  // useEffect(() => {
  //   localStorage.setItem("userSignedIn", JSON.stringify(userSignedIn));
  // }, [userSignedIn]);

  const router = createBrowserRouter([
    // {
    //   path: "/sign-up",
    //   element:
    //     !user && !userSignedIn ? <SignUpForm /> : <Navigate replace to="/" />,
    // },
    // {
    //   path: "/log-in",
    //   element:
    //     !user && !userSignedIn ? <LogInForm /> : <Navigate replace to="/" />,
    // },
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorMessage />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "courses",
          element: (
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          ),
        },
        {
          path: "courses/new",
          element: (
            <ProtectedRoute>
              <CourseCreation />
            </ProtectedRoute>
          ),
        },
        {
          path: "courses/:courseId",
          element: (
            <ProtectedRoute>
              <CourseVideo />
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate replace to="/" />,
        },
        {
          path: "/log-in",
          element: !user ? <LogInForm /> : <Navigate replace to="/" />,
        },
      ],
    },
  ]);

  return router;
}

export default AppRouter;

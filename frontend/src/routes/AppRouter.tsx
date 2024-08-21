//* react-hooks
import { useEffect } from "react";

//* react-router
import { Navigate, createBrowserRouter } from "react-router-dom";

//* redux-hooks
import { useSelector } from "react-redux";

//* layout
import AppLayout from "../layout/AppLayout.tsx";

//* pages
// import SignUpForm from "../pages/SignUpForm/SignUpForm";
// import LogInForm from "../pages/LogInForm/LogInForm";
import Home from "../pages/Home/Home.tsx";
import Profile from "../pages/Profile/Profile.tsx";
// import UserPage from "../pages/UserPage/UserPage";

//* components-UI
// import ProtectedRoute from "../components/ui/ProtectedRoute/ProtectedRoute.tsx";
import ErrorMessage from "../components/ui/ErrorMessage/ErrorMessage.tsx";
import Courses from "../pages/Courses/Courses.tsx";

//* custom-hooks
// import useAuth from "../hooks/useAuth";

// NOTE: This seems to be ok, since it's being called in a top level component that doesn't have its own state
// If it did, you might have an issue with React keeping track of existing state in the hooks here.
function AppRouter() {
  // const user = useSelector((state) => state.user.user);
  // const userSignedIn = useSelector((state) => state.user.userSignedIn);
  // const error = useSelector((state) => state.user.error);

  // useAuth();

  // useEffect(() => {
  //   localStorage.setItem("userSignedIn", JSON.stringify(userSignedIn));
  // }, [userSignedIn]);

  const router = createBrowserRouter([
    {
      //   path: "/sign-up",
      //   element:
      //     !user && !userSignedIn ? <SignUpForm /> : <Navigate replace to="/" />,
      // },
      // {
      //   path: "/log-in",
      //   element:
      //     !user && !userSignedIn ? <LogInForm /> : <Navigate replace to="/" />,
      // },
      // {
      path: "/",
      element: (
        // <ProtectedRoute>
        <AppLayout />
        // </ProtectedRoute>
      ),
      errorElement: <ErrorMessage />,
      children: [
        { index: true, element: <Home /> },

        { path: "profile", element: <Profile /> },

        { path: "courses", element: <Courses /> },

        // { path: "browse", element: <BrowseRecipes /> },
        // { path: "browse/:recipeID", element: <RecipeFullInfo /> },

        // { path: "recipes", element: <Recipes /> },
        // { path: "recipes/new", element: <CreateNewRecipe /> },
        // { path: "recipes/edit/:recipeID", element: <EditRecipe /> },
        // { path: "recipes/liked-recipes", element: <LikedRecipes /> },
        // {
        //   path: "recipes/liked-recipes/:recipeID",
        //   element: <RecipeFullInfo />,
        // },
      ],
    },
  ]);

  return router;
}

export default AppRouter;

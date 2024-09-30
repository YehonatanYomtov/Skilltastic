//* Components-UI
import ShowCase from "../../components/ui/ShowCase/ShowCase";
import CourseListDisplay from "../../features/course/CourseListDisplay/CourseListDisplay";
import IntroCarousel from "./subComponents/IntroCarousel/IntroCarousel";

//* Styles
import styles from "./Home.module.css";
import WelcomeMessage from "../../features/user/WelcomeMessage/WelcomeMessage";
import SearchCoursesInput from "../../features/course/SearchCoursesInput/SearchCoursesInput";
import { AppDispatch, RootState } from "../../data/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllCourses,
  getAllUserCourses,
} from "../../features/course/courseSlice";
import { Link } from "react-router-dom";

function HomePage() {
  //! Change to user from 'userSlice'
  const user = useSelector((state: RootState) => state.auth.user);
  const courses = useSelector((state: RootState) => state.course.courses);
  const myCourses = useSelector((state: RootState) => state.course.myCourses);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //! Check if this is ok with rendering
    if (user && user.uid !== undefined) {
      dispatch(getAllCourses());
      dispatch(getAllUserCourses(user?.uid));
    }
  }, [dispatch, user]);

  return (
    <div className={styles.container_main}>
      <section>
        <SearchCoursesInput />
      </section>

      <WelcomeMessage />

      <section>
        <IntroCarousel />
      </section>

      <section>
        <ShowCase>
          <h1>All Courses</h1>
          <CourseListDisplay courseList={courses} />
        </ShowCase>
      </section>

      <section>
        <ShowCase>
          <>
            <h1>Your Courses</h1>
            {myCourses.length > 0 ? (
              <CourseListDisplay courseList={myCourses} />
            ) : (
              <div>
                <h3>Don't have any courses yet? </h3>{" "}
                <p>Create one now! it's fast and easy.</p>
                <Link to="courses/create">Lets go</Link>
              </div>
            )}
          </>
        </ShowCase>
      </section>

      {/* <section>
        <ShowCase>
          <h1>Continue Learning</h1>
          <CourseListDisplay courseList={courseList} />
        </ShowCase>
      </section>

      <section>
        <ShowCase>
          <h1>Popular Courses</h1>
          <CourseListDisplay courseList={courseList} />
        </ShowCase>
      </section> */}
    </div>
  );
}

export default HomePage;

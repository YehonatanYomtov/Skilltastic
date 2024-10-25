//* React-hooks
import { useState } from "react";

//* React-router-dom
import { useSearchParams } from "react-router-dom";

//* Redux
import { useSelector } from "react-redux";

//* Components-UI
import Select from "../../components/ui/Select/Select";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";

//* Components-course
import SearchCoursesInput from "../../features/course/components/SearchCoursesInput/SearchCoursesInput";
import CourseCard from "../../features/course/components/CourseCard/CourseCard";

//* Styles
import styles from "./SearchCourses.module.css";

//* Types
import { RootState } from "../../data/store";

const options = [
  {
    value: "",
    label: "Sort by",
  },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

function SearchCourses() {
  const [selectedOption, setSelectedOption] = useState<string>("most-relevant");

  const searchCoursesResult = useSelector(
    (state: RootState) => state.course.searchCoursesResult
  );
  const status = useSelector((state: RootState) => state.course.status);
  const error = useSelector((state: RootState) => state.course.error);

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value);
  }

  return (
    <>
      <SearchCoursesInput />

      {error && <ErrorMessage message={error} />}

      {status === "loading" && <LoadingSpinner />}

      {status === "success" && !error && (
        <div className={styles.container}>
          <h1>
            {searchCoursesResult.length} results for {`"${searchQuery}"`}
          </h1>
          <div className={styles.filter_and_sort_btns_container}>
            <button>Filter</button>

            <Select
              name="sort-by"
              value={selectedOption}
              onChange={handleChange}
              options={options}
            />
          </div>

          <div className={styles.courses_display}>
            {searchCoursesResult.map((course) => {
              console.log("COURSE >>>> ", course);
              return <CourseCard course={course} key={course.id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchCourses;

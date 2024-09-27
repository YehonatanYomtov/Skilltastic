import { useSelector } from "react-redux";
import SearchCoursesInput from "../../features/course/SearchCoursesInput/SearchCoursesInput";

//* Styles
import styles from "./SearchCourses.module.css";
import { RootState } from "../../data/store";
import CourseCard from "../../features/course/CourseCard/CourseCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Select from "../../components/ui/Select/Select";

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
              console.log(">>>> ", course);
              return <CourseCard course={course} key={course.id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchCourses;

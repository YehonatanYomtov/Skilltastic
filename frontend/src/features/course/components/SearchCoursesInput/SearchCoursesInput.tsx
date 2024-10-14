//* React
import { FormEvent, useState } from "react";

//* React-router-dom
import { useLocation, useNavigate } from "react-router-dom";

//* Redux
import { useDispatch } from "react-redux";

//* Slice
import { searchCourses } from "../../courseSlice";

//* Styles
import styles from "./SearchCoursesInput.module.css";

//* Types
import { AppDispatch } from "../../../../data/store";

function SearchCoursesInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedQuery: string = searchQuery.trim();

    if (trimmedQuery) {
      if (location.pathname === "/")
        navigate(`search?q=${encodeURIComponent(trimmedQuery)}`);

      dispatch(searchCourses(trimmedQuery));

      setSearchQuery("");
    }
  }

  return (
    <form onSubmit={handleSubmitSearch} className={styles.container}>
      <div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          type="search"
          placeholder="Search courses..."
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchCoursesInput;

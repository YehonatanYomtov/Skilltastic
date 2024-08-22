//* Styles
import styles from "./SearchCoursesInput.module.css";

//* Types
import { FormEvent } from "react";

function SearchCoursesInput() {
  function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmitSearch} className={styles.container}>
      <div>
        <input type="search" placeholder="Search courses..." />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchCoursesInput;

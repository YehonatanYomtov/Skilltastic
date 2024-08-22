//* Styles
import styles from "./SearchCoursesInput.module.css";

function SearchCoursesInput() {
  function handleSubmitSearch(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmitSearch}>
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

//* React-hooks
import { useEffect, useState } from "react";

//* Styles
import styles from "./DarkLightModeButton.module.css";

function DarkLightModeButton() {
  const [lightTheme, setLightTheme] = useState(true);
  function handleThemeMode() {
    setLightTheme((cur) => !cur);
  }

  const rootEl = document.querySelector(":root");

  useEffect(() => {
    if (!lightTheme) {
      rootEl.setAttribute("class", "dark");
      localStorage.setItem("theme", "dark");
    }
    if (lightTheme) {
      document.documentElement.style.getPropertyValue("color-scheme", "light");
      rootEl.removeAttribute("class", "dark");
      localStorage.setItem("theme", "light");
    }
  }, [lightTheme, rootEl]);

  return (
    <div className={styles.container}>
      <button
        onClick={handleThemeMode}
        style={{
          backgroundColor: `${lightTheme ? "#f4f4f4" : "#50605d"}`,
          border: `2px solid ${lightTheme ? "#b4b4b4" : "#384442"}`,
        }}
        className={styles.light}
      >
        <i className="fa-regular fa-sun"></i>
      </button>

      <button
        onClick={handleThemeMode}
        style={{
          backgroundColor: `${lightTheme ? "#f4f4f4" : "#50605d"}`,
          border: `2px solid ${lightTheme ? "#b4b4b4" : "#384442"}`,
        }}
        className={styles.dark}
      >
        <i className="fa-regular fa-moon"></i>
      </button>
    </div>
  );
}

export default DarkLightModeButton;

{
  /* <button
style={{
  backgroundColor: `${lightTheme ? "#f4f4f4" : "#50605d"}`,
  border: `2px solid ${lightTheme ? "#b4b4b4" : "#384442"}`,
}}
className={styles.theme_button_base}
onClick={handleThemeMode}
>
<div className={lightTheme ? styles.light_theme : styles.dark_theme}>
  <img
    src={
      lightTheme ? "/images/Light-mode.png" : "/images/Dark-mode.png"
    }
    alt="Theme"
  />
</div>
</button> */
}

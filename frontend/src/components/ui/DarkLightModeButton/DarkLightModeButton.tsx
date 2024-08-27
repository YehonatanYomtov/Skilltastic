//* React-hooks
import { useEffect, useState } from "react";

//* Components-UI
import ToggleThemeButton from "./ToggleThemeButton/ToggleThemeButton";

//* Styles
import styles from "./DarkLightModeButton.module.css";

function DarkLightModeButton() {
  const [colorTheme, setColorTheme] = useState<string>("light");

  useEffect(() => {
    const rootEl = document.querySelector(":root") as HTMLElement | null;

    if (rootEl) {
      if (colorTheme === "dark") {
        rootEl.setAttribute("class", "dark");
        //! Switch to store in the database
        localStorage.setItem("theme", "dark");
      }
      if (colorTheme === "light") {
        document.documentElement.style.getPropertyValue("color-scheme");
        rootEl.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [colorTheme]);

  return (
    <div className={styles.container}>
      <ToggleThemeButton
        isActive={colorTheme === "light"}
        theme={colorTheme}
        onClick={() => setColorTheme("light")}
      >
        <i className="fa-regular fa-sun"></i>
      </ToggleThemeButton>

      <ToggleThemeButton
        isActive={colorTheme === "dark"}
        theme={colorTheme}
        onClick={() => setColorTheme("dark")}
      >
        <i className="fa-regular fa-moon"></i>
      </ToggleThemeButton>
    </div>
  );
}

export default DarkLightModeButton;

//* Styles
import styles from "./ToggleThemeButton.module.css";

//* Types
import { ReactNode } from "react";
type ToggleButtonProps = {
  isActive: boolean;
  theme: string;
  onClick: () => void;
  children: ReactNode;
};

function ToggleThemeButton({
  isActive,
  theme,
  onClick,
  children,
  ...otherProps
}: ToggleButtonProps) {
  const buttonStyle = {
    backgroundColor:
      theme === "dark"
        ? isActive
          ? "#616161"
          : "#313131"
        : isActive
        ? "#e6f6ff"
        : "#f4f4f4",
    color: theme === "dark" ? "#f4f4f4" : "#50605d",
    border: `2px solid ${
      theme === "light"
        ? isActive
          ? "#5ca8ff"
          : "#d5f2ff"
        : isActive
        ? "#5ca8ff"
        : "#dff3ff70"
    }`,
  };

  return (
    <button
      onClick={onClick}
      className={`${styles.theme_btn} ${isActive ? styles.active : ""}`}
      style={buttonStyle}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default ToggleThemeButton;

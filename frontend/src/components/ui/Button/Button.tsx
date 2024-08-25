//* styles
import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "blue-hollow" | "blue";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className = "",
  children,
  type,
  variant,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`${variant ? styles[variant] : styles.button} ${className}`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;

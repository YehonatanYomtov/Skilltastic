//* styles
import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className = "",
  children,
  type,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`${!type ? styles.button : styles[type]} ${className}`}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;

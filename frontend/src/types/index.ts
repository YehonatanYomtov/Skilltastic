import React from "react";

//* Object of strings
export type StringObject = {
  [key: string]: string;
};

//**** Basic event handler types

//* Buttons
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

//* Inputs
export type ChangeInputHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

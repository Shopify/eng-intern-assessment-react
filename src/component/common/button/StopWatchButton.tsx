import React from "react";
import classes from "./StopWatchButton.module.css";

/**
 *This component render the stopwatch button
 * @param props Represent the Stopwatch button properties
 * @returns interactive button with its funtionality
 */
export default function StopWatchBtn(props: StopWatchBtnProps) {
  //Function to handle button click => sends the name of the button it was click
  const handleBtnClick = () => {
    props.onButtonClick(props.name);
  };

  return (
    <button
      onClick={handleBtnClick}
      className={`${classes[`stopwatch-btn`]} ${classes[`${props.className}`]}`}
    >
      {props.name}
    </button>
  );
}

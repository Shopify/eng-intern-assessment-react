import React from "react";

/**
 *This component render the stopwatch button
 * @param props Represent the Stopwatch button properties
 * @returns interactive button with its funtionality
 */
export default function StopWatchButton(props: StopWatchBtnProps) {
  //Function to handle button click => sends the name of the button it was click
  const handleBtnClick = () => {
    props.onButtonClick(props.name);
  };
  return (
    <button
      onClick={handleBtnClick}
      className={`stopwatch-btn ${props.className}`}
    >
      {props.name}
    </button>
  );
}

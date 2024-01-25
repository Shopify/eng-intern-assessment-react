import React from "react";

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

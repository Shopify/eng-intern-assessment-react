import React from "react";

type StopWatchButtonProps = {
  /** type of button to render - start, stop, reset */
  type: string;
  /** style overide */
  style?: any;
  /** function to run when clicked */
  onClick: () => void;
};
export default function StopWatchButton({
  type,
  style = {},
  onClick,
}: StopWatchButtonProps) {
  return (
    <div
      style={{
        margin: 2,
        flexDirection: "column",
      }}
    >
      <button
        style={{
          border: "None",
          borderRadius: 100,
          display: "flex",
          cursor: "pointer",
          ...style,
        }}
        onClick={onClick}
      >
        {type}
      </button>
    </div>
  );
}

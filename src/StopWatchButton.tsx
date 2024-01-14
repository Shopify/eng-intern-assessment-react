import React from "react";

type StopWatchButtonProps = {
  /** type of button to render - start, stop, reset, lap */
  type: string;
  /** style overide */
  style?: any;
  /** disable the button */
  disabled?: boolean;
  /** function to run when clicked */
  onClick: () => void;
};
export default function StopWatchButton({
  type,
  style = {},
  disabled = false,
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
        disabled={disabled}
        style={{
          border: "None",
          borderRadius: 100,
          display: "flex",
          cursor: disabled ? "default" : "pointer",
          ...style,
        }}
        onClick={onClick}
      >
        {type}
      </button>
    </div>
  );
}

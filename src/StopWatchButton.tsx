import React from "react";

// Created an interface to force certain types to come through
// I wasnt sure if we were allowed to rename the object from StopWatchButton to something else,
// but I designed it so that the button can be universal
export interface StopWatchButtonProps {
  id?: string;
  text: string;
  pressed: () => void;
  disabled: boolean;
  style?: React.CSSProperties;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  // Passes the props given from the interface into the correct property of the button
  return (
    <button
      id={props.id}
      type="button"
      disabled={props.disabled}
      onClick={props.pressed}
      style={props.style}
    >
      {props.text}
    </button>
  );
}

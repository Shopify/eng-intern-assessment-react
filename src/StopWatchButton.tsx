import React from "react";

export interface StopWatchButtonProps {
  id?: string;
  text: string;
  pressed: () => void;
  disabled: boolean;
  style?: React.CSSProperties;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
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

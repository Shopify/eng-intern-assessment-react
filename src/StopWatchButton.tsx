import React from "react";

export interface StopWatchButtonProps {
  id?: string;
  text: string;
  pressed: () => void;
  disabled: boolean;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  return (
    <button
      id={props.id}
      type="button"
      disabled={props.disabled}
      onClick={props.pressed}
    >
      {props.text}
    </button>
  );
}

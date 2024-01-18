import React, { PropsWithoutRef } from "react";

interface buttonProps {
  title: string;
  onClick: () => void;
  className: string;
}

export default function StopWatchButton(props: buttonProps) {
  return (
    <button
      id={props.title}
      role="button"
      onClick={props.onClick}
      className={props.className}
    >
      {props.title}
    </button>
  );
}

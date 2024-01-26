import React, { ButtonHTMLAttributes } from "react";

export default function StopWatchButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button {...props}>{props.children}</button>;
}

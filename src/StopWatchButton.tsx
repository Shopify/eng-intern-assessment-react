import React, { ButtonHTMLAttributes } from "react";

export default function StopWatchButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`p-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-600 rounded active:translate-y-[0.1em] transition-transform text-2xl ${props.className}`}
    >
      {props.children}
    </button>
  );
}

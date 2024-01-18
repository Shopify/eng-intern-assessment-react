import React from "react";

/**
 * This represents the buttons used by the stopwatch
 */
export default function StopWatchButton({
  children,
  onClick,
}: StopWatchButtonProps) {
  return (
    <button
      className="bg-slate-200 p-4 text-xl shadow-md hover:bg-slate-200/80 active:shadow-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type StopWatchButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

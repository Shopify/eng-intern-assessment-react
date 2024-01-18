import React from "react";

// defining types for typescript!
interface Props {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
  lapDisabled: boolean;
}

export default function StopWatchButton({
  start,
  stop,
  reset,
  lap,
  lapDisabled,
}: Props) {
  return (
    <div>
      <button
        onClick={start}
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-4 py-2 rounded shadow"
      >
        Start
      </button>
      <button
        onClick={stop}
        className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold px-4 py-2 rounded shadow"
      >
        Stop
      </button>
      <button
        onClick={reset}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-4 py-2 rounded shadow"
      >
        Reset
      </button>
      <button
        onClick={lap}
        disabled={lapDisabled}
        className={`bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-semibold px-4 py-2 rounded shadow ${
          lapDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Lap
      </button>
    </div>
  );
}

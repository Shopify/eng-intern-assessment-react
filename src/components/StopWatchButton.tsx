import React from "react";

type StopWatchBtnProps = {
  title: string;
  onClick: () => void;
};

const StopWatchBtn: React.FC<StopWatchBtnProps> = ({ title, onClick }) => (
  <button
    className={`btn btn-${title.toLowerCase()}`}
    title={title}
    onClick={onClick}
  >
    {title}
  </button>
);

type StopWatchButtonProps = {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onStart,
  onStop,
  onReset,
  onLap,
}) => (
  <div>
    <StopWatchBtn title="Start" onClick={onStart} />
    <StopWatchBtn title="Stop" onClick={onStop} />
    <StopWatchBtn title="Reset" onClick={onReset} />
    <StopWatchBtn title="Lap" onClick={onLap} />
  </div>
);

export default StopWatchButton;

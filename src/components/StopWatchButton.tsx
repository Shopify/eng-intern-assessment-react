import React from "react";

type StopWatchBtnProps = {
  title: string;
  time?: number;
  onClick: (time?: number) => void;
};

const StopWatchBtn: React.FC<StopWatchBtnProps> = ({
  title,
  time,
  onClick,
}) => (
  <span className="button" onClick={() => onClick(time)}>
    {title}
  </span>
);

export default function StopWatchButton() {
  return (
    <div>
      <button className="btn btn-start" title="Start" onClick={() => ""} />
      <button className="btn btn-stop" title="Stop" onClick={() => ""} />
      <button className="btn btn-reset" title="Reset" onClick={() => ""} />
      <button className="btn btn-lap" title="Lap" onClick={() => ""} />
    </div>
  );
}

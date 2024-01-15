import React from "react";

interface Props {
  time: number;
  formatTime: (seconds: number) => string;
}
const StopWatch: React.FC<Props> = ({ time, formatTime }) => {
  return (
    <div>
      <p> {formatTime(time)} </p>
    </div>
  );
};

export default StopWatch;

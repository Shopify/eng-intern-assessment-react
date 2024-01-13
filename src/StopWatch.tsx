import React from "react";
import StopWatchButton from "./StopWatchButton";

const StopWatch: React.FC = () => {
  return (
    <div>
      <p> 0:00:00 </p>
      <StopWatchButton />
    </div>
  );
};

export default StopWatch;

import React from "react";
import "./styles/arc.css"
const StopWatchArc = () => {
  return (
    <svg className="stopwatch__arc" height="400" version="1.1" width="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask">
          <circle cx="50%" cy="50%" fill="white" r="150"></circle>
          <circle cx="50%" cy="50%" fill="none" r="130" className="arc arc__mask"></circle>
        </mask>
      </defs>
      <circle className="arc" cx="50%" cy="50%" fill="none" width="400" height="400" r="130"></circle>
      <circle className="arc arc__primary" cx="50%" cy="50%" fill="none" width="400" height="400" mask="url(#mask)" r="130"></circle>
    </svg>
  )
}

export default StopWatchArc
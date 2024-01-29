import React from "react";
import "./StopWatchButton.css";

interface Props {
   type: "start" | "stop" | "lap" | "reset";
   onClick: () => void;
   isRunning?: boolean;
}

export default function StopWatchButton({ type, onClick, isRunning }: Props) {

   let tabIndex;
   switch (type) {
      case "start":
         tabIndex = 1;
         break;
      case "stop":
         tabIndex = 2;
         break;
      case "lap":
         tabIndex = 3;
         break;
      case "reset":
         tabIndex = 4;
         break;
      default:
         tabIndex = 0;
   }

   let isDisabled = false;
   if(type == "start" && isRunning) {
      isDisabled = true;
   } else if (type == "stop" && !isRunning) {
      isDisabled = true;
   } else if (type == "lap" && !isRunning) {
      isDisabled = true;
   } else if (type == "reset" && isRunning) {
      isDisabled = true;
   }           

   return (
      <button
         className={`stopwatch-btn ${type} ${isDisabled ? "disabled" : ""}`}
         onClick={onClick}
         aria-label={type}
         tabIndex={tabIndex}
         disabled={isDisabled}
         >
         {type}
      </button>
   );
}

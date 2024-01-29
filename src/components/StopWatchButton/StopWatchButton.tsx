import React from "react";
import "./StopWatchButton.css";

// Props interface definition for type checking.
interface Props {
    type: "start" | "stop" | "lap" | "reset"; // Type of the button, restricts to specific strings.
    onClick: () => void; // Click handler function.
    isRunning?: boolean; // Optional prop to indicate if the stopwatch is running.
}

// StopWatchButton Component: Renders a button for stopwatch operations like start, stop, lap, and reset.
export default function StopWatchButton({ type, onClick, isRunning }: Props) {
   // tabIndex is used for keyboard navigation. Assigning a unique tabIndex based on button type.
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

   // Determine if the button should be disabled based on the current state and button type.
   // For example, 'start' is disabled when the stopwatch is running, and 'stop' is disabled when it's not running.
   let isDisabled = false;
   if (type == "start" && isRunning) {
      isDisabled = true;
   } else if (type == "stop" && !isRunning) {
      isDisabled = true;
   } else if (type == "lap" && !isRunning) {
      isDisabled = true;
   } else if (type == "reset" && isRunning) {
      isDisabled = true;
   }

   // Render a button with appropriate styling and behavior based on its type.
   // The button is disabled based on the isDisabled flag.
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

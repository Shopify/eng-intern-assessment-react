import React from "react";
import "./StopWatchButtonComponent.css";

type StopWatchButtonProps = {
  onClick: () => void;
  buttonPlaceHolder: string;
  isRunning: boolean;
};

// reuseable button component
// Props:
// onClick : Function to execute button when clicked
// - placeHolder : Display text of button

const StopWatchButtonComponent: React.FC<StopWatchButtonProps> = ({
  onClick,
  buttonPlaceHolder,
  isRunning = false,
  ...props
}) => {
  return (
    <>
      {isRunning ? (
        <button onClick={onClick} className="button" {...props}>
          <span>{buttonPlaceHolder}</span>
        </button>
      ) : (
        <button onClick={onClick} className="button" disabled>
          <span>{buttonPlaceHolder}</span>
        </button>
      )}
    </>
  );
};

export default StopWatchButtonComponent;

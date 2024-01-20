import React from "react";
import "./StopWatchButtonComponent.css";
type StopWatchButtonProps = {
  onClick: () => void;
  buttonPlaceHolder: string;
};

// reuseable button component
// Props:
// onClick : Function to execute button when clicked
// - placeHolder : Display text of button

const StopWatchButtonComponent: React.FC<StopWatchButtonProps> = ({
  onClick,
  buttonPlaceHolder,
}) => {
  return (
    <>
      <button onClick={onClick} className="button">
        <span>{buttonPlaceHolder}</span>
      </button>
    </>
  );
};

export default StopWatchButtonComponent;

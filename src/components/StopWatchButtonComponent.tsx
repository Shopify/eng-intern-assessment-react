import React from "react";

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
  return <button onClick={onClick}>{buttonPlaceHolder}</button>;
};

export default StopWatchButtonComponent;

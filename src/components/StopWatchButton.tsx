/**
 * StopWatchButton.tsx
 *
 * This is a functional component that represents a button on the stopwatch.
 *
 * @imports
 * - StopWatchButton.css: The CSS styles for the StopWatchButton component.
 *
 * @props
 * - onClick: A function that is called when the button is clicked.
 * - label: The text that is displayed on the button.
 *
 * @component
 * - StopWatchButton: A functional component that takes in 'onClick' and 'label' props. It renders a button with the given label, and calls the onClick function when the button is clicked.
 */
import React from "react";
import "../styles/StopWatchButton.css";

interface StopWatchButtonProps {
  onClick: () => void;
  label: string;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  onClick,
  label,
}) => {
  return (
    <button className="stopwatch-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default StopWatchButton;

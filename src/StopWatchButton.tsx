import React from 'react';

// Define the prop types for the StopWatchButton component
interface StopWatchButtonProps {
  onClick: () => void;   // Function to be called when the button is clicked
  label: string;         // Text content or label for the button
  disabled?: boolean;    // Optional prop indicating whether the button is disabled
}

// Define the StopWatchButton functional component with TypeScript
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    // Render a button element with specified class, click event handler, and disabled state
    <button className="stopwatch-button" onClick={onClick} disabled={disabled}>
      {label} {/* Render the label or text content inside the button */}
    </button>
  );
};

// Export the StopWatchButton component as the default export
export default StopWatchButton;

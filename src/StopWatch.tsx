import React from 'react';

// Define the properties expected by the StopWatch component
interface StopWatchProps {
  time: number;
}

// StopWatch component receives time as a prop and displays it
const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
  return (
    <div>
      {/* Display the formatted time using the formatTime helper function */}
      <p>{formatTime(time)}</p>
    </div>
  );
};

// Helper function to format time as HH:MM:SS:SS
const formatTime = (time: number): string => {
  // Calculate the hours, minutes, seconds, and milliseconds
  const ms = String(time % 1000).padStart(3, '0');
  const seconds = String(Math.floor(time / 1000) % 60).padStart(2, '0');
  const minutes = String(Math.floor(time / (60 * 1000)) % 60).padStart(2, '0');
  const hours = String(Math.floor(time / (60 * 60 * 1000))).padStart(2, '0');

  // Return the formatted time string
  return `${hours}:${minutes}:${seconds}:${ms}`;
};

// Export the StopWatch component for use in other parts of the application
export default StopWatch;

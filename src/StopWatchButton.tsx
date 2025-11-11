import React from 'react';

/**
 * Define the properties that the StopWatchButton can accept.
 *
 * @param label - Label to display for button
 * @param onClick - Function to call when button is clicked
 * */
type StopWatchButtonProps = {
  label: string;
  onClick: () => void;
};

/**
 *
 * StopWatchButton is a functional component that renders a customized button. Where label and onClick handler
 * are dynamiccally set.
 * React.FC<StopWatchButtonProps> is a functional component that enforces that the props received match the types
 */
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
  label,
  onClick,
}) => {
  return <button onClick={onClick}>{label}</button>;
};

export default StopWatchButton;

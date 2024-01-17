import React from 'react'
import Button from '@mui/joy/Button'
interface StopWatchButtonProps {
    func: () => void;
    name: string; // Assuming 'name' is a string, adjust the type accordingly
  }
  
/**
 * StopWatchButton Component
 * 
 * A button component for controlling the stopwatch.
 * 
 * @param {Object} props - The properties of the component.
 * @param {Function} props.func - The function to be executed on button click.
 * @param {string} props.name - The label for the button.
 * 
 * @returns {JSX.Element} - The rendered StopWatchButton component.
 */
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ func, name }) => {
    return (
      <Button
        onClick={func}
        color={name === "Start" ? "success" : (name === "Stop" ? "danger" : "primary")}
      >
        {name}
      </Button>
    );
  }

  export default StopWatchButton;
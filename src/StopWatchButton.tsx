import React from 'react'
import Button from '@mui/joy/Button'
interface StopWatchButtonProps {
    func: () => void;
    name: string; // Assuming 'name' is a string, adjust the type accordingly
  }
  
  const StopWatchButton: React.FC<StopWatchButtonProps> = ({ func, name }) => {
    return (
      <Button onClick={func} color={name === "Start" ? "success" : (name === "Stop" ? "danger" : "primary")}>
        {name}
      </Button>
    );
  }

  export default StopWatchButton;
import React from 'react'

// Props interface for the StopWatchButton component
interface StopWatchButtonProps {
    type: string;
    onClick: () => void;
    disabled?: boolean;
}

//StopWatchButton component
export default function StopWatchButton({ type, onClick, disabled = false }: StopWatchButtonProps) {
  // Function to determine the text content of the button based on its type
    const getButtonText = (): string => {
        switch (type) {
          case 'start':
            return 'Start';
          case 'stop':
            return 'Stop';
          case 'lap':
            return 'Lap';
          case 'reset':
            return 'Reset';
          default:
            return '';
        }
      };
    
      return (
        <button onClick={onClick} disabled={disabled}>
          {getButtonText()}
        </button>
      );
}
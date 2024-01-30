import React from 'react'



// Define the props for the StopWatchButton component
type StopWatchButtonProps = {
    name: string;
    onClick?: () => void;
    isDisabled?: boolean;
    
};
  
  export default function StopWatchButton({ name, onClick, isDisabled }: StopWatchButtonProps) {
    
    return(
        <button onClick={onClick} aria-label={name} disabled={isDisabled}>{name}</button>
    )
}
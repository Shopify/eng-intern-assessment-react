import React from 'react'

const buttonStyle = {
    backgroundColor: '#007AFF',     
    color: 'white',                
    padding: '10px 20px', 
    margin: '0px 10px',          
    border: 'none',                 
    borderRadius: '10px',           
    fontSize: '16px',                
    fontWeight: '500',              
    cursor: 'pointer',              
    outline: 'none',                 
    textShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)',  
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',   
    transition: 'all 0.2s ease-in-out',          
    width: '100px',
    
};

interface StopWatchButtonProps {
    onClick: () => void;
    text: string;
  }

export default function StopWatchButton({onClick, text} : StopWatchButtonProps) {

    return(
        <button onClick={onClick} style={buttonStyle}>
            {text}
        </button>
    )
}
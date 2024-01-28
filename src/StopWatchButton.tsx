import React, {useState} from 'react'

interface StopWatchButtonProps {
  labels: string[];
  onClick: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ labels, onClick }) => {
  const [label, setLabel] = useState(labels[0]);

  const handleClick = () => {
    onClick();
    setLabel(labels[0] === label ? labels[1] : labels[0]);
  }

  return(
    <button type="button" onClick={handleClick}>{label}</button>
  )
}

export default StopWatchButton;
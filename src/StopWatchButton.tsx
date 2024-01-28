import React, {useEffect, useState} from 'react'
import {
  Button,
} from '@shopify/polaris';

interface StopWatchButtonProps {
  labels: string[];
  active: boolean;
  onClick: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ labels, active, onClick }) => {
  const [label, setLabel] = useState(labels[0]);

  useEffect(() => {
    if (active) {
      setLabel(labels[1]);
    } else {
      setLabel(labels[0]);
    }
  });

  return(
    <Button
      size='large'
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default StopWatchButton;
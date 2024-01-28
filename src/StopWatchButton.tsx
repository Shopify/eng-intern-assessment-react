import React, {useEffect, useState} from 'react'
import {
  Button,
} from '@shopify/polaris';

interface StopWatchButtonProps {
  labels: string[];
  active: boolean;
  tone: 'success' | 'critical';
  onClick: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ labels, active, tone, onClick }) => {
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
      tone={tone}
      variant='primary'
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default StopWatchButton;
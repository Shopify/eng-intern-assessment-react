import React from 'react';
import './NESBackground.css';

// define possible sizes as a type
type NESBackgroundProps = {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';  // optional size prop
};

const NESBackground: React.FC<NESBackgroundProps> = ({ children, size = 'medium' }) => {
  const className = `nes-background ${size}`;
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default NESBackground;

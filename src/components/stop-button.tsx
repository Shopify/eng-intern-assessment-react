import React from 'react';
import Button from './ui/button';

export default function StopButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="bg-[#D6445E] text-[#FAFAFA]" onClick={onClick}>
      Stop
    </Button>
  );
}

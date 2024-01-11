import React from 'react';
import Button from './ui/button';

export default function PauseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="bg-[#27272A] text-[#FAFAFA]" onClick={onClick}>
      Pause
    </Button>
  );
}

import React from 'react';
import Button from './ui/button';

export default function StartButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="bg-[#FAFAFA] text-[#18181B]" onClick={onClick}>
      Start
    </Button>
  );
}

import { Button } from '@shopify/polaris';
import React from 'react';

type StopWatchButtonProps = {
  text: string;
  handleClick: () => void;
};

export default function StopWatchButton({
  text,
  handleClick,
}: StopWatchButtonProps) {
  return <Button onClick={handleClick}>{text}</Button>;
}

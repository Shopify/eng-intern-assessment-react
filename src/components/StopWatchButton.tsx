import { Button } from '@shopify/polaris';
import React from 'react';

type StopWatchButtonProps = {
  text: string;
};

export default function StopWatchButton({ text }: StopWatchButtonProps) {
  return <Button>{text}</Button>;
}

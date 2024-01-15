import { Button } from "@shopify/polaris";
import React from "react";

type StopWatchButtonProps = {
  onClick: () => void;
  children: string;
};

export default function StopWatchButton({
  onClick,
  children,
}: StopWatchButtonProps) {
  return (
    <Button fullWidth={true} onClick={onClick} size="large">
      {children}
    </Button>
  );
}

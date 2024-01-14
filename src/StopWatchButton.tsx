import React from "react";
import {Button} from "@shopify/polaris";

type StopWatchBUttonProps = {
  children: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

export default function StopWatchButton({
  children,
  onClick,
  variant,
}: StopWatchBUttonProps) {
  return (
    <Button onClick={onClick} variant={variant} size="large">
      {children}
    </Button>
  );
}

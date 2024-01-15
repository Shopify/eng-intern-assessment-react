import { Button } from "@shopify/polaris";
import React from "react";

type StopWatchButtonProps = {
  children: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};
export default function StopWatchButton({
  children,
  onClick,
  variant = "secondary",
}: StopWatchButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} size={"large"} >
      {children}
    </Button>
  );
}

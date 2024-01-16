import React from "react";
import { Button } from "@shopify/polaris";

interface StopWatchButtonProps {
  btnAction: string;
  abilityDisable: boolean;
  onClick: () => void;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  const { btnAction, abilityDisable = false, onClick } = props;
  return (
    <div>
      {/* Buttons are component and the props are passed down and implemented here, alongside the onClick methods */}
      <Button disabled={abilityDisable} onClick={onClick} size='large'>
        {" "}
        {btnAction}
      </Button>
    </div>
  );
}

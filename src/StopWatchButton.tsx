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
      <Button disabled={abilityDisable} onClick={onClick} size='large'>
        {" "}
        {btnAction}
      </Button>
    </div>
  );
}

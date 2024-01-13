import React from "react";
import { Button } from "@shopify/polaris";

export interface IStopWatchButtonProps {
  buttonText: string;
  shouldDisable?: boolean;
  onClickHandler: () => void;
}

export default function StopWatchButton(props: IStopWatchButtonProps) {
  const { buttonText, shouldDisable = false, onClickHandler } = props;
  return (
    <div>
      <Button size="large" onClick={onClickHandler} disabled={shouldDisable}>
        {buttonText}
      </Button>
    </div>
  );
}

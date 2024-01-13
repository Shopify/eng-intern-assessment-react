import React from "react";
import { Button } from "@shopify/polaris";
import {
  ClipboardMinor,
  ResetMinor,
  PauseMinor,
  PlayCircleMajor,
} from "@shopify/polaris-icons";

interface StopWatchButtonProps {
  buttonText: string;
  shouldDisable?: boolean;
  onClickHandler: () => void;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  const { buttonText, shouldDisable = false, onClickHandler } = props;

  const getIcon = () => {
    switch (buttonText.toLowerCase()) {
      case "pause":
        return PauseMinor;
      case "reset":
        return ResetMinor;
      case "lap":
        return ClipboardMinor;
      default:
        return PlayCircleMajor;
    }
  };

  // Get the dynamic icon
  const icon = getIcon();

  return (
    <div>
      <Button
        size="large"
        onClick={onClickHandler}
        disabled={shouldDisable}
        icon={icon}
      >
        {buttonText}
      </Button>
    </div>
  );
}

import React, { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ButtonContainer,
  StyledButton,
  Tooltip,
} from "../styles/StopWatchButtonStyles";

type StopWatchButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  icon: IconDefinition;
  label: string;
  isSecond?: boolean;
};

export default function StopWatchButton({
  onClick,
  disabled = false,
  icon,
  label,
  isSecond = false,
}: StopWatchButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton onClick={onClick} isSecond={isSecond} disabled={disabled}>
        <FontAwesomeIcon icon={icon} />
      </StyledButton>
      <Tooltip>{label}</Tooltip>
    </ButtonContainer>
  );
}

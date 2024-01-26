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
};

export default function StopWatchButton({
  onClick,
  disabled = false,
  icon,
  label,
}: StopWatchButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon icon={icon} />
      </StyledButton>
      <Tooltip>{label}</Tooltip>
    </ButtonContainer>
  );
}

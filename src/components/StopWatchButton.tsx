/**
 * StopWatchButton Component
 * Created by Vansh Sood
 *
 * This component renders a button for the stopwatch.
 *
 * Props:
 * - onClick: Function to call when button is clicked
 * - disabled: Boolean to disable the button
 * - icon: FontAwesome icon to display in the button
 * - label: Text label for the button
 * - isSecond: Boolean to apply secondary styling
 * - ariaLabel: Accessibility label for the button
 */

import React from "react";
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
  ariaLabel: string;
};

export default function StopWatchButton({
  onClick,
  disabled = false,
  icon,
  label,
  isSecond = false,
  ariaLabel,
}: StopWatchButtonProps) {
  return (
    <ButtonContainer>
      <StyledButton
        onClick={onClick}
        isSecond={isSecond}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        <FontAwesomeIcon icon={icon} />
      </StyledButton>
      <Tooltip>{label}</Tooltip>
    </ButtonContainer>
  );
}

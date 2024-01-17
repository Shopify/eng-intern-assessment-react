import React, { ReactNode } from 'react';
import * as colors from '../styles/colors';
import { css } from '@emotion/react';
import * as mq from '../styles/media-queries';

// Define the possible variants for the button
type ButtonVariant = 'default' | 'destructive';

interface StopWatchButtonProps {
  variant: ButtonVariant;
  backgroundColor?: string;
  customStyles?: React.CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  testId: string;
}

export default function StopWatchButton({
  variant,
  onClick,
  children,
  disabled,
  testId,
}: StopWatchButtonProps) {
  // Define predefined styles for each variant
  const predefinedStyles: Record<ButtonVariant, React.CSSProperties> = {
    default: {
      backgroundColor: colors.brown,
    },
    destructive: {
      backgroundColor: colors.orange,
    },
  };

  // Common styles shared by both variants
  const commonStyles = css({
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Aldrich',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    opacity: disabled ? 0.4 : 1,
    backgroundColor: predefinedStyles[variant]?.backgroundColor,
    cursor: disabled ? 'default' : 'pointer',
    transition: 'border 0.1s, transform 0.1s',
    padding: '0.5em 0.5em',
    margin: '0.3em 0.3em',
    ':not(:disabled):hover': {
      boxShadow: `inset 0 0 0 1px ${
        variant === 'destructive' ? colors.brown : colors.orange
      }`,
      transform: 'scale(1.01)',
    },
  });

  // Media queries for adjusting font size based on screen size
  const mediaQueryStyles = css({
    [mq.small]: {
      fontSize: '0.9em',
      minWidth: '5.5em',
      minHeight: '3em',
    },
    [mq.medium]: {
      fontSize: '1.1em',
      minWidth: '6em',
      minHeight: '2em',
    },
    [mq.large]: {
      fontSize: '1.4em',
      minWidth: '6em',
      minHeight: '2em',
    },
  });

  // Combine styles using array notation
  const mergedStyles = [commonStyles, mediaQueryStyles];

  return (
    <button
      css={mergedStyles}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

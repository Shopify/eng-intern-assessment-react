import React from 'react';
import styled, { css } from 'styled-components';

type StopwatchButtonProps = {
  label: string;
  action: () => void;
  variant?: 'red' | 'green' | 'regular'; // Optional variant prop
};

type ButtonProps = {
  variant: 'red' | 'green' | 'regular';
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ label, action, variant = 'regular' }) => {
  return (
    <StyledButton onClick={action} variant={variant}>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  vertical-align: baseline;
  width: auto;

  &:hover, &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #F0F0F1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }

  ${props => props.variant === 'red' && css`
    background-color: #d37c78;
  `}

  ${props => props.variant === 'green' && css`
    background-color: #93db93;
  `}

  ${props => props.variant === 'regular' && css`
    background-color: #FFFFFF;
  `}
`;

export default StopwatchButton;
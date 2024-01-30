import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopwatchButton from '../StopWatchButton';

describe('StopwatchButton Component', () => {
  const mockOnClick = jest.fn();

  const renderComponent = (label: string, className: string) => {
    render(
      <StopwatchButton
        label={label}
        className={className}
        onClick={mockOnClick}
      />
    );
  };

  test('renders button with provided label and className', () => {
    const label = 'Start';
    const className = 'start-button';

    renderComponent(label, className);

    const button = screen.getByText(label);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(className);
  });

  test('calls onClick handler when the button is clicked', () => {
    const label = 'Start';
    const className = 'start-button';

    renderComponent(label, className);

    const button = screen.getByText(label);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

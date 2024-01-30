import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopwatchButton from './StopWatchButton';

describe('StopwatchButton component', () => {
  test('renders button with custom class', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" className="custom-button" />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).toHaveClass('custom-button');
  });

  test('disables button when disabled prop is true', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" disabled={true} />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).toBeDisabled();
  });

  test('renders button without disabled attribute when disabled prop is false', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" disabled={false} />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).not.toBeDisabled();
  });

  test('renders button with aria-label attribute', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" ariaLabel="Start the stopwatch" />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).toHaveAttribute('aria-label', 'Start the stopwatch');
  });

  test('calls onClick handler with custom data attribute', () => {
    const onClickMock = jest.fn();
    render(<StopwatchButton onClick={onClickMock} label="Start" data-testid="custom-button" />);
    const buttonElement = screen.getByTestId('custom-button');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

});

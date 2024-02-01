import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopwatchButton from './StopWatchButton';

// Test for the StopwatchButton component
describe('StopwatchButton component', () => {
  // Test case to check if the button renders with a custom class
  test('renders button with custom class', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" className="custom-button" />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).toHaveClass('custom-button');
  });

  // Test case to check if the button is disabled when the disabled prop is true
  test('disables button when disabled prop is true', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" disabled={true} />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).toBeDisabled();
  });

  // Test case to check if the button is not disabled when the disabled prop is false
  test('renders button without disabled attribute when disabled prop is false', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" disabled={false} />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).not.toBeDisabled();
  });

  // Test case to check if the button has the correct aria-label attribute
  test('renders button with aria-label attribute', () => {
    render(<StopwatchButton onClick={() => {}} label="Start" ariaLabel="Start the stopwatch" />);
    const buttonElement = screen.getByRole('button', { name: /start/i });
    expect(buttonElement).toHaveAttribute('aria-label', 'Start the stopwatch');
  });

  // Test case to check if the onClick handler is called with a custom data attribute
  test('calls onClick handler with custom data attribute', () => {
    // Mocking the onClick handler
    const onClickMock = jest.fn();
    render(<StopwatchButton onClick={onClickMock} label="Start" data-testid="custom-button" />);
    const buttonElement = screen.getByTestId('custom-button');

    // Triggers a click event on the button
    fireEvent.click(buttonElement);

    // To Verify that the onClick handler was called once
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

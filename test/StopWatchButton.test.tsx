import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopWatchButton from '../src/StopWatchButton'
import '@testing-library/jest-dom';

// Describe block defines a test suite for the StopWatchButton component
describe('StopWatchButton', () => {

  // Test case for rendering with correct title
  test('renders with correct title', () => {
    // Renders the StopWatchButton component with the 'Start' title
    render(<StopWatchButton title="Start" onClick={() => {}} />);
    // Asserts that a button with the text 'Start' is present in the document
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  // Test case for checking the disabled state of the button
  test('is disabled when disabled prop is true', () => {
    // Renders the StopWatchButton component with the 'Stop' title and disabled state
    render(<StopWatchButton title="Stop" onClick={() => {}} disabled={true} />);
    // Asserts that the button is correctly disabled
    expect(screen.getByRole('button', { name: 'Stop' })).toBeDisabled();
  });

  // Test case for handling click events
  test('handles click events', () => {
    // Creates a mock function for handling clicks
    const handleClick = jest.fn();
    // Renders the StopWatchButton component with the 'Start' title and the mock click handler
    render(<StopWatchButton title="Start" onClick={handleClick} />);
    // Simulates a click event on the button
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    // Asserts that the mock click handler was called exactly once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatch from '../src/StopWatch';
import '@testing-library/jest-dom';

// Test suite for the StopWatch component
describe('StopWatch', () => {
  // Test case for displaying formatted time
  // It checks if the component correctly displays a formatted time string when given a non-zero time value
  test('displays formatted time', () => {
    render(<StopWatch time={3661} />);
    expect(screen.getByText('01:01:01')).toBeInTheDocument();
  });

  // Test case for initial time display
  // It verifies if the component displays '00:00:00' when the time is exactly 0
  test('displays 00:00:00 when time is 0', () => {
    render(<StopWatch time={0} />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  // Test case for handling invalid time (negative values)
  // It ensures that the component handles negative time values gracefully by displaying '00:00:00'
  test('displays 00:00:00 when time is negative', () => {
    render(<StopWatch time={-1} />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });
});

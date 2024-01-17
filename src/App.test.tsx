import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('Stopwatch Functionality', () => {
  test('should start the stopwatch', () => {
    render(<App />);
    fireEvent.click(screen.getByText('START'));
    const timerElement = screen.getByTestId('timer');
    expect(timerElement.textContent).toContain('00:00:00');
  });

  test('should pause the stopwatch', () => {
    render(<App />);
    fireEvent.click(screen.getByText('START')); // Start the stopwatch
    fireEvent.click(screen.getByText('PAUSE'));
    const timerElement = screen.getByTestId('timer');
    // Add assertions based on your application's behavior
    expect(timerElement.textContent).not.toContain('00:00:00'); 
  });

  test('should reset the stopwatch', () => {
    render(<App />);
    fireEvent.click(screen.getByText('START')); // Start the stopwatch
    fireEvent.click(screen.getByText('RESET'));
    const timerElement = screen.getByTestId('timer');
    expect(timerElement.textContent).toContain('00:00:00'); 
  });

  test('should record laps', () => {
    render(<App />);
    fireEvent.click(screen.getByText('START')); // Start the stopwatch
    fireEvent.click(screen.getByText('LAP'));
    const lapContainer = screen.getByTestId('lap-container');
    expect(lapContainer.children.length).toBe(1); // Replace with the expected number of laps
  });
});
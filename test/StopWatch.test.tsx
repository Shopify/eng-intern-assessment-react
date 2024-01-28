import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App'; 


// Use fake timers for controlling setInterval and setTimeout
jest.useFakeTimers();

describe('Stopwatch App', () => {
  test('When "Start" is pressed, the app begins to count time.', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 second
    });

    const timeDisplay = screen.getByText(/00:01/i); 
    expect(timeDisplay).toBeInTheDocument();
  });

  test('When "Stop" is pressed, the app stops counting time.', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(3000); 
    });

    const stopButton = screen.getByRole('button', { name: /stop/i });
    fireEvent.click(stopButton);

    const timeDisplayBeforeStop = screen.getByText(/00:03/i); 
    expect(timeDisplayBeforeStop).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000); // Simulate 2 more seconds
    });

    // The time should not have changed
    expect(timeDisplayBeforeStop).toBeInTheDocument();
  });

  test('When "Lap" is pressed, a lap is created and displayed.', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(1000); // Simulate 1 seconds
    });

    const lapButton = screen.getByRole('button', { name: /lap/i });
    fireEvent.click(lapButton);
  

    const lapDisplay = screen.getByText(/Lap 1:/i).closest('div'); 
    expect(lapDisplay).toHaveTextContent(/00:01/i);
    expect(lapDisplay).toHaveTextContent(/(00:01)/i);
    expect(lapDisplay).toBeInTheDocument();
  });

  test('When "Reset" is pressed, the timer is reset.', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5000); // Simulate 5 seconds
    });

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    const timeDisplayAfterReset = screen.getByText(/00:00/i); 
    expect(timeDisplayAfterReset).toBeInTheDocument();
  });
});

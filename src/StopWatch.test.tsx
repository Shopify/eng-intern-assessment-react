import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import StopWatch, { formattedTime } from './StopWatch';

// Test for the formattedTime function
describe('formatTime', () => {
  test('formats time correctly', () => {
    expect(formattedTime(0)).toBe('00:00:00');
    expect(formattedTime(6000)).toBe('01:00:00');
    expect(formattedTime(1234)).toBe('00:12:34');
  });
});

//Tests for the Stopwatch component
describe('StopWatch component', () => {
  // Test for rendering the StopWatch component
  test('renders correctly', () => {
    const { getByText } = render(<StopWatch />);
    const stopwatchElement = getByText('StopWatch');
    expect(stopwatchElement).not.toBeNull();
  });
  // Test for the Start button functionality
  test('Start button starts the timer', async () => {
    render(<StopWatch />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    const displayedTime = screen.getByText(/\d+:\d+:\d+/).textContent;

    expect(displayedTime).not.toBe('00:00:00');
  });
  // Test for the Stop button functionality
  test('Stop button pauses the timer without resetting it and displays the correct time', async () => {
    render(<StopWatch />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    const initialDisplayedTime = screen.getByText(/\d+:\d+:\d+/).textContent;
    console.log(initialDisplayedTime);
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);

    const stoppedDisplayedTime = screen.getByText(/\d+:\d+:\d+/).textContent;
    console.log(stoppedDisplayedTime);
    expect(stoppedDisplayedTime).toBe(initialDisplayedTime);
  });
  // Test for the Reset button functionality
  test('Reset button', async () => {
    render(<StopWatch />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    const displayedTime = screen.getByText(/\d+:\d+:\d+/).textContent;

    expect(displayedTime).toBe('00:00:00');
  });
  // Test for the Lap button functionality
  test('Lap button records lap time when the timer is running', async () => {
    render(<StopWatch />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    const initialDisplayedTime = screen.getByText(/\d+:\d+:\d+/).textContent;
    console.log(initialDisplayedTime);

    const lapButton = screen.getByText('Lap');
    fireEvent.click(lapButton);


    const lapTimeElements = screen.getAllByText(/\d+:\d+:\d+/);

    const lapTimeDisplayed = lapTimeElements[0].textContent;
    console.log(lapTimeDisplayed);

    expect(lapTimeDisplayed).toBe(initialDisplayedTime);
  });

});




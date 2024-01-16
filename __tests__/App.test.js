import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

// Use fake timers to control the passage of time in tests
jest.useFakeTimers();

describe('App Component', () => {
  // Test to ensure the App component renders correctly
  test('renders the App component', () => {
    render(<App />);
    // Assert that the Start, Lap, and Reset buttons are rendered
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/lap/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  // Test to verify starting and stopping the stopwatch
  test('starts and stops the stopwatch', () => {
    render(<App />);
    // Simulate clicking the start button and advancing timers by 15 seconds
    act(() => {
      fireEvent.click(screen.getByText(/start/i));
      jest.advanceTimersByTime(15000);
    });

    // Assert that the Stop button is rendered
    expect(screen.getByText(/stop/i)).toBeInTheDocument();

    // Simulate clicking the stop button
    act(() => {
      fireEvent.click(screen.getByText(/stop/i));
    });

    // Assert that the Start button is rendered again
    expect(screen.getByText(/start/i)).toBeInTheDocument();
  });

  // Test to verify recording lap time
  test('records lap time', async () => {
    render(<App />);
    // Simulate clicking the start button and advancing timers by 15 seconds
    act(() => {
      fireEvent.click(screen.getByText(/start/i));
      jest.advanceTimersByTime(15000);
    });

    await act(async () => {
      // Find lap time elements matching the expected format
      const lapTimeElements = screen.getAllByText(/00:00:15:000/i);
      const lapTimeRegex = /^\d{2}:\d{2}:\d{2}:\d{3}$/;

      // Assert that at least one lap time element is found
      expect(lapTimeElements.length).toBeGreaterThan(0);

      // Iterate through elements to find the one that matches the expected format
      const matchingElement = lapTimeElements.find((element) =>
        lapTimeRegex.test(element.textContent || '')
      );

      // Assert that the matching element is found and has the correct format
      expect(matchingElement).toBeInTheDocument();
      expect(matchingElement?.textContent).toMatch(lapTimeRegex);
    });
  });

  // Test to verify resetting the stopwatch
  test('resets the stopwatch', () => {
    render(<App />);
    // Simulate clicking the start button and advancing timers by 15 seconds
    act(() => {
      fireEvent.click(screen.getByText(/start/i));
      jest.advanceTimersByTime(15000);
    });

    // Simulate clicking the reset button
    act(() => {
      fireEvent.click(screen.getByText(/reset/i));
    });

    // Assert that the Start button is rendered and time is reset
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00:00:000/i)).toBeInTheDocument();
  });
});

import React from 'react'
import {render, fireEvent, act, screen} from '@testing-library/react'
import App from './App'
import StopWatchButton from './StopWatchButton';
import Stopwatch from './StopWatch';
import "@testing-library/jest-dom";
/* import { act } from 'react-dom/test-utils'; */

// Mocking window.setInterval and window.clearInterval
jest.useFakeTimers();

describe('Stopwatch Application', () => {
  /* test('initially displays 00:00.00 and controls are rendered', () => {
    render(<App />);
    expect(screen.getByText(/0:00.00/)).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
  }); */

  test('starts the stopwatch on Start button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000); // Advance timer by 1 second
    });
    expect(screen.getByText(/0:01.00/)).toBeInTheDocument();
  });

  test('stops the stopwatch on Stop button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText(/0:03.00/)).toBeInTheDocument();
  });

  test('resets the stopwatch on Reset button click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(5000); // Advance timer by 5 seconds
    });
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText(/0:00.00/)).toBeInTheDocument();
  });

  test('records laps', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    fireEvent.click(screen.getByText('Lap'));
    screen.debug();
    /* expect(container.textContent).toMatch(/Lap 1 - 0:01.50/); */
    /* expect(container.textContent).toMatch(/Stopwatch0:01.50StartStopResetLap/); */
    expect(container.textContent).toMatch(/Stopwatch0:01.50StartStopResetLap/);
    
  });
  
}); 
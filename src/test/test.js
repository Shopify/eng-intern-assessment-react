import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from '../StopWatch';

describe('Stopwatch Component', () => {
  test('renders Stopwatch component', () => {
    render(<Stopwatch />);
    expect(screen.getByTestId("stopWatchWrapper")).toBeInTheDocument();
  });

  test('default initial time is 00:00:00.00', () => {
    render(<Stopwatch />);
    const timerDigits = screen.getByTestId('timerDigits');
    expect(timerDigits).toBeInTheDocument();
    expect(timerDigits).toHaveTextContent('00:00:00.00');
  });

  test('number of digits in the timer can be manipulated', () => {
    render(<Stopwatch firstDigits={14} lastDigits={19}/>);
    const timerDigits = screen.getByTestId('timerDigits');
    expect(timerDigits).toBeInTheDocument();
    expect(timerDigits).toHaveTextContent('00:00');
  });

  test('starts timer when start button is clicked', async () => {
    jest.useFakeTimers();
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));

    await act(async () => {
      jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });

    const timerDigits = screen.getByTestId('timerDigits');
    expect(timerDigits).toHaveTextContent('00:00:03.00');
    jest.useRealTimers();
  });

  test('stops timer when stop button is clicked', async () => {
    jest.useFakeTimers();
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));

    await act(async () => {
      jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });
    jest.useRealTimers();
    fireEvent.click(screen.getByText('Stop'));
    const timerDigits = screen.getByTestId('timerDigits');
    expect(timerDigits).toHaveTextContent('00:00:03.00');
    await act(async () => {
        jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
      }); // Try to advance more, should not change
    expect(timerDigits).toHaveTextContent('00:00:03.00');
    jest.useRealTimers();
  });

  test('records laps', async () => {
    jest.useFakeTimers();
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    await act(async () => {
      jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('Lap 1: 00:00:03.00')).toBeInTheDocument();
    jest.useRealTimers();
  });

  test('resets the timer and laps', async () => {

    jest.useFakeTimers();
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    await act(async () => {
      jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });
    jest.useRealTimers();
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('Lap 1: 00:00:03.00')).toBeInTheDocument();
    await act(async () => {
        jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });
    jest.useRealTimers();
    const timerDigits = screen.getByTestId('timerDigits');
    fireEvent.click(screen.getByText('Stop'));
    fireEvent.click(screen.getByText('Reset'));
    expect(timerDigits).toHaveTextContent('00:00:00.00');
    expect(screen.queryByText('Lap 1: 00:00:03.00')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
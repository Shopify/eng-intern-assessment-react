// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import StopWatch, { formatTime } from './StopWatch';

// // Test the formatTime function
// describe('formatTime', () => {
//   test('formats time less than an hour correctly', () => {
//     expect(formatTime(5900)).toBe('00:59:00');
//     expect(formatTime(6000)).toBe('01:00:00');
//     expect(formatTime(359900)).toBe('59:59:00');
//   });

//   test('formats time greater than an hour correctly', () => {
//     expect(formatTime(360000)).toBe('01:00:00:00');
//     expect(formatTime(366100)).toBe('01:01:01:00');
//   });
// });

// test('renders correctly', () => {
//   const { getByText } = render(<StopWatch />);
//   const stopwatchElement = getByText('StopWatch');
//   expect(stopwatchElement).not.toBeNull();
// });

// // Use fake timers for timer-related tests
// jest.useFakeTimers();

// test('starts timer when start button is clicked', () => {
//   const setIntervalSpy = jest.spyOn(global, 'setInterval');
//   render(<StopWatch />);
//   const startButton = screen.getByRole('button', { name: /start/i });
//   fireEvent.click(startButton);
//   jest.advanceTimersByTime(1000);
//   expect(setIntervalSpy).toHaveBeenCalledTimes(1);
//   expect(setIntervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 10);
// });

// test('stops timer when stop button is clicked', () => {
//   const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
//   const setIntervalSpy = jest.spyOn(global, 'setInterval');
//   setIntervalSpy.mockImplementation(() => 123 as unknown as NodeJS.Timeout);
//   render(<StopWatch />);
//   const startButton = screen.getByRole('button', { name: /start/i });
//   fireEvent.click(startButton);
//   jest.advanceTimersByTime(1000);
//   const stopButton = screen.getByRole('button', { name: /stop/i });
//   fireEvent.click(stopButton);
//   expect(clearIntervalSpy).toHaveBeenCalledWith(123);
// });

// beforeEach(() => {
//   jest.useRealTimers();
// });

// afterEach(() => {
//   jest.useFakeTimers();
//   jest.clearAllMocks();
// });

// test('resets timer when reset button is clicked', () => {
//   const { getByRole, getByText } = render(<StopWatch />);
//   const startButton = getByRole('button', { name: /start/i });
//   fireEvent.click(startButton);
//   jest.advanceTimersByTime(1000);
//   const resetButton = getByRole('button', { name: /reset/i });
//   fireEvent.click(resetButton);
//   expect(getByText('00:00:00')).not.toBeNull();
// });

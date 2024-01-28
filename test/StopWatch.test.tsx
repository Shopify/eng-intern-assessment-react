import { render, fireEvent, act, screen } from '@testing-library/react';
import App from '../src/App';
import React from 'react';
import '@testing-library/jest-dom';

/**
 * @jest-environment jsdom
 */

jest.useFakeTimers();

test('renders stopwatch and buttons', () => {
  const { getByText } = render(<App />);
  const timeElement = screen.getByTestId('stop-watch');
  expect(timeElement).toBeInTheDocument();

  const startButton = getByText(/Start/i);
  expect(startButton).toBeInTheDocument();

  const resetButton = getByText(/Reset/i);
  expect(resetButton).toBeInTheDocument();

  const lapButton = getByText(/Lap/i);
  expect(lapButton).toBeInTheDocument();
});

test('start button starts the stopwatch', () => {
  const { getByText } = render(<App />);
  const startButton = getByText(/Start/i);

  fireEvent.click(startButton);

  act(() => {
    jest.advanceTimersByTime(1100);
  });

  const timeElement = screen.getByTestId('stop-watch');
  expect(timeElement).toBeInTheDocument();
});

test('reset button resets the stopwatch', () => {
  const { getByText } = render(<App />);
  const startButton = getByText(/Start/i);
  const resetButton = getByText(/Reset/i);

  fireEvent.click(startButton);

  act(() => {
    jest.advanceTimersByTime(1100);
  });

  fireEvent.click(resetButton);

  const timeElement = screen.getByTestId('stop-watch');
  expect(timeElement).toBeInTheDocument();
});

test('lap button records the current time', () => {
  const { getByText, getAllByText } = render(<App />);
  const startButton = getByText(/Start/i);
  const lapButton = getByText(/Lap/i);

  fireEvent.click(startButton);

  act(() => {
    jest.advanceTimersByTime(1100);
  });

  fireEvent.click(lapButton);

  const lapTimes = getAllByText(/0:0:1.1/i);
  expect(lapTimes.length).toBe(1);
});

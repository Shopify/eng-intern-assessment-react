/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import React from 'react';

function convertTimestringToNumber(timeString) {
  const [minutes, seconds] = timeString.split(':');
  const [secondsPart, millisecondsPart] = seconds.split('.');
  const totalSeconds =
    parseInt(minutes) * 60 +
    parseInt(secondsPart) +
    parseInt(millisecondsPart) / 100;
  return totalSeconds;
}

describe('Stopwatch Application', () => {
  /* structured tests using jest's fake timers and act() calls.
   * this allows the tests to function as closely to the real application as possible.
   * and implements RTL's best practice for behaviour-driven testing
   */
  jest.useFakeTimers();

  test('renders initial state correctly', () => {
    render(<App />);

    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', async () => {
    render(<App />);
    let initialTime = undefined;
    let stoppedTime = undefined;

    initialTime = screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent;

    await act(async () => {
      fireEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(100);
    });

    fireEvent.click(screen.getByText('Stop'));
    stoppedTime = screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent;

    expect(convertTimestringToNumber(stoppedTime)).toBeGreaterThan(
      convertTimestringToNumber(initialTime)
    );
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<App />);
    let pausedTime = undefined;
    let secondPausedTime = undefined;

    await act(async () => {
      fireEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Stop'));
      pausedTime = screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent;
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(100);
    });

    fireEvent.click(screen.getByText('Stop'));
    secondPausedTime = screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent;

    expect(convertTimestringToNumber(secondPausedTime)).toBeGreaterThan(
      convertTimestringToNumber(pausedTime)
    );
  });

  test('record and show list of laps', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(
      screen.getByText(/^Lap \d{1,2}: \d{2}:\d{2}\.\d{2}$/)
    );

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});

import React from "react";
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

jest.useFakeTimers();

test('starts the StopWatch correctly', () => {
  render(<App />)

  const startButton = screen.getByText('Start');

  act(() => {
    fireEvent.click(startButton);
    jest.advanceTimersByTime(100);
  })

  const timerElement = screen.getByText(/(\d{2}:){2}\d{2}/);
  const timerValue = timerElement.textContent;

  waitFor(() => {
    expect(timerValue).not.toEqual('00:00:000')
  })
})

test('stops the StopWatch correctly', () => {
  render(<App />)

  const startButton = screen.getByText('Start');

  act(() => {
    fireEvent.click(startButton);
    jest.advanceTimersByTime(100);
  })

  const stopButton = screen.getByText('Stop');

  act(() => {
    fireEvent.click(stopButton);
  })

  const initialStoppedTime = screen.getByText(/(\d{2}:){2}\d{2}/)
  jest.advanceTimersByTime(1000)
  const finalStoppedTime = screen.getByText(/(\d{2}:){2}\d{2}/)

  waitFor(() => {
    expect(finalStoppedTime).toEqual(initialStoppedTime);
  })
})

test('resets the StopWatch correctly', async () => {
  render(<App />)

  const startButton = screen.getByText('Start');

  act(() => {
    fireEvent.click(startButton);
    jest.advanceTimersByTime(100);
  })

  const stopButton = screen.getByText('Stop');

  act(() => {
    fireEvent.click(stopButton);
  })

  const resetButton = screen.getByText('Reset');

  act(() => {
    fireEvent.click(resetButton);
  })

  const timerElement = screen.getByText(/(\d{2}:){2}\d{2}/);
  const timerValue = timerElement.textContent;

  await waitFor(() => {
    expect(timerValue).toEqual('00:00:000');
  })
})

test('StopWatch sets laps correctly', async () => {
  render(<App />);

  const startButton = screen.getByText('Start');

  act(() => {
    fireEvent.click(startButton);
  })

  const lapButton = screen.getByText('Lap');
  const stopButton = screen.getByText('Stop');

  act(() => {
    jest.advanceTimersByTime(100);
  })

  act(() => {
    fireEvent.click(lapButton); // lap 1 should be 100ms
  })
  
  act(() => {
    jest.advanceTimersByTime(150);
  })

  act(() => {
    fireEvent.click(lapButton); // lap2 should be 150ms
    fireEvent.click(stopButton)
  })

  const lap1: string = screen.getByTestId('lap-item-1').textContent
  const lap2: string = screen.getByTestId('lap-item-2').textContent;

  await waitFor(() => {
    expect(lap1).toEqual('00:00:100');
    expect(lap2).toEqual('00:00:150');
  })
})

jest.clearAllTimers();
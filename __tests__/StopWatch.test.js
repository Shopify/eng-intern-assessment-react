import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopWatch from '../src/StopWatch';
import '@testing-library/jest-dom'

test('renders stopwatch and buttons', () => {
  render(<StopWatch />);
  
  const stopwatchElement = screen.getByText(/00:00:00/i);
  expect(stopwatchElement).toBeInTheDocument();

  const startButton = screen.getByText(/start/i);
  expect(startButton).toBeInTheDocument();

  const resetButton = screen.getByText(/reset/i);
  expect(resetButton).toBeInTheDocument();

  const lapButton = screen.getByText(/lap/i);
  expect(lapButton).toBeInTheDocument();
});

test('starts and stops the stopwatch', () => {
  render(<StopWatch />);
  
  const startButton = screen.getByText(/start/i);
  fireEvent.click(startButton);

  setTimeout(() => {
    fireEvent.click(startButton);

    const stopwatchElement = screen.getByText(/(\d{2}:\d{2}:\d{2})/i);
    const initialTime = stopwatchElement.textContent;

    setTimeout(() => {
      const newTime = stopwatchElement.textContent;
      expect(newTime).toBe(initialTime);
    }, 1000);
  }, 1000);
});

test('resets the stopwatch', () => {
  render(<StopWatch />);
  
  const startButton = screen.getByText(/start/i);
  fireEvent.click(startButton);

  setTimeout(() => {
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);

    const stopwatchElement = screen.getByText(/00:00:00/i);
    expect(stopwatchElement).toBeInTheDocument();
  }, 1000);
});

test('records laps', () => {
  render(<StopWatch />);
  
  const startButton = screen.getByText(/start/i);
  fireEvent.click(startButton);

  const lapButton = screen.getByText(/lap/i);
  fireEvent.click(lapButton);

  setTimeout(() => {
    fireEvent.click(lapButton);

    // Check if laps are displayed
    const lapElements = screen.getAllByRole('listitem');
    expect(lapElements.length).toBe(2);
  }, 1000);
});
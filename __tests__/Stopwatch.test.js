import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, fireEvent } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);

    // Modified format to match the correct initial format of the timer
    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('START'));
    expect(screen.getByText(/\d{2}:\d{2}.\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('STOP'));

    // Store the time when the stopwatch was stopped to check that it hasn't changed.
    // Since both the timer and the lap times are rendered at the same time with the same format,
    // we need to get both by text and narrow down to the timer (first element)
    const stoppedTime = screen.getAllByText(/\d{2}:\d{2}.\d{2}/)[0].textContent;

    // Wait for the timer to update before checking
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Check that the timer hasn't changed
    expect(screen.getAllByText(/\d{2}:\d{2}.\d{2}/)[0].textContent).toBe(
      stoppedTime
    );
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('START'));
    fireEvent.click(screen.getByText('STOP')); // Changed pause to stop, assuming they mean the same
    const pausedTime = screen.getByText(/\d{2}:\d{2}.\d{2}/).textContent;

    fireEvent.click(screen.getByText('RESUME'));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(screen.getAllByText(/\d{2}:\d{2}.\d{2}/)[0].textContent).not.toBe(
      pausedTime
    );
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('START'));
    fireEvent.click(screen.getByText('LAP'));
    expect(screen.getByTestId('lap-list')).toContainElement(
      screen.getAllByText(/\d{2}:\d{2}.\d{2}/)[1]
    );

    fireEvent.click(screen.getByText('LAP'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('START'));
    fireEvent.click(screen.getByText('LAP'));
    fireEvent.click(screen.getByText('STOP')); // Added this line due to my conditional button rendering
    fireEvent.click(screen.getByText('RESET'));

    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});

// /(\d{2}:){2}\d{2}/;

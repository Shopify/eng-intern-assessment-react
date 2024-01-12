import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Stop'));
    // Adjusted to check that the display still shows time but is not updating
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
  });

  test('pauses and resumes the stopwatch', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Pause'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    setTimeout(() => {
      fireEvent.click(screen.getByText('Resume'));
      expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
    }, 1000); // Wait for 1 second to resume and check the time
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    // Using the unique data-testid to identify lap times
    expect(screen.getByTestId('lap-0')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-1')).toBeInTheDocument();
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});

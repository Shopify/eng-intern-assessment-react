import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import Stopwatch from '../src/stopwatch/StopWatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);

    expect(
      screen.getByText((_, element) => element.textContent === '00:00:00')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).not.toBeInTheDocument();
  });

  test('starts and stops the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    expect(
      screen.getAllByText((_, element) =>
        /(\d{2}:){2}\d{2}/.test(element.textContent)
      )[0]
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Stop'));
    
    const pausedTime = screen.getAllByText((_, element) =>
    /(\d{2}:){2}\d{2}/.test(element.textContent))[0]
    
    // Checks the timer as started
    expect(pausedTime).not.toBe('00:00:00')

    const getTimeAgain = screen.getAllByText((_, element) =>
    /(\d{2}:){2}\d{2}/.test(element.textContent))[0]

    // Checks the timer as stopped
    expect(pausedTime).toBe(getTimeAgain)
  });

  test('pauses and resumes the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getAllByText((_, element) =>
      /(\d{2}:){2}\d{2}/.test(element.textContent)
    )[0].textContent;

    fireEvent.click(screen.getByText('Resume'));
    const resumedTime = screen.getAllByText((_, element) =>
      /(\d{2}:){2}\d{2}/.test(element.textContent)
    )[0].textContent;

    expect(resumedTime).not.toBe(pausedTime);
  });

  test('records and displays lap times', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(
      screen.getByText(/(\d{2}:){2}\d{2}/)
    );

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(
      screen.getByText((_, element) => element.textContent === '00:00:00')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import StopWatch from './StopWatch';

describe('StopWatch', () => {
  test('renders the initial state of the stopwatch', () => {
    render(<StopWatch />);
    expect(screen.getByText('00:00.0'));
    expect(screen.getByText('Start'));
    expect(screen.getByText('Reset'));
  });

  test('starts the timer when the Start button is clicked', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    expect(await screen.findByText('Stop'));

  });

  test('stops the timer when the Stop button is clicked', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(await screen.findByText('Stop'));
    expect(await screen.findByText('Start'))

  });

  test('resets the timer when the Reset button is clicked', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(await screen.findByText('Stop'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00.0'));
    expect(screen.getByText('Start'));
  });

  test('records a lap when the Lap button is clicked', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(await screen.findByText('Lap'));
    expect(screen.getByText('Lap 1'));

  });
});
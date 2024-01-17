import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch from '../src/StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch Tests', () => {
  test('initial state of timer starting at 0', () => {
    render(<StopWatch />);
    expect(screen.getByTestId('timer').textContent).toEqual('00:00.00');
  });

  test('start and stop stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByTestId('timer')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByTestId('timer').textContent;
    await act(() => new Promise((r) => setTimeout(r, 10)));
    expect(screen.getByTestId('timer').textContent).toBe(pausedTime);
  });

  test('stop and continue stopwatch', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByTestId('timer').textContent;
    fireEvent.click(screen.getByText('Start'));
    await act(() => new Promise((r) => setTimeout(r, 10)));
    expect(screen.getByTestId('timer').textContent).not.toBe(pausedTime);
  });

  test('correctly store laps', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    await act(() => new Promise((r) => setTimeout(r, 10)));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('list-laps').children.length).toBe(1);
    await act(() => new Promise((r) => setTimeout(r, 10)));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('list-laps').children.length).toBe(2);
  });

  test('reset stopwatch', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Stop'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('timer').textContent).toEqual('00:00.00');
  });

  test('stop before reset stopwatch', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  test('can not start twice', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
  });

});
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);

    expect(screen.getByTestId('display').textContent).toEqual('00:00:00:000');
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByTestId('display')).toBeInTheDocument();
    expect(screen.getByTestId('display').textContent).toMatch(
      /(\d{2}:){2}\d{2}/
    );

    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByTestId('display').textContent;

    await act(() => new Promise((r) => setTimeout(r, 10)));
    expect(screen.getByTestId('display').textContent).toBe(pausedTime);
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByTestId('display').textContent;

    fireEvent.click(screen.getByText('Start'));
    await act(() => new Promise((r) => setTimeout(r, 10)));
    expect(screen.getByTestId('display').textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    await act(() => new Promise((r) => setTimeout(r, 10)));

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(1);
    expect(screen.getByTestId('lap-list').children[0].textContent).toMatch(
      /(\d{2}:){2}\d{2}/
    );

    await act(() => new Promise((r) => setTimeout(r, 10)));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByTestId('display').textContent).toEqual('00:00:00:000');
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});

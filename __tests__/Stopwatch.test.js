import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch', () => {
  test('renders initial state correctly', async () => {
    render(<Stopwatch />);
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Stop'));
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).not.toBeInTheDocument();
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Pause'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    fireEvent.click(screen.getByText('Resume'));
    await waitFor(() => screen.getByText(/00:00:02.00/), {
      timeout: 5000
    });
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(screen.getByText(/(\d{2}:){2}\d{2}/));

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
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

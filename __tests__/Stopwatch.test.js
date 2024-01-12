import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);
    
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', async () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    await waitFor(() => expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument());
  
    const timeBeforeStop = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    fireEvent.click(screen.getByText('Stop'));
    
    // Wait for some time to ensure the stopwatch has stopped
    await new Promise(r => setTimeout(r, 500));
  
    const timeAfterStop = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    expect(timeBeforeStop).toEqual(timeAfterStop); // Time should not change after stopping
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    await new Promise(r => setTimeout(r, 500)); // wait for half a second
    fireEvent.click(screen.getByText('Pause'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText('Resume'));
    await new Promise(r => setTimeout(r, 500)); // wait for half a second

    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', async () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    await new Promise(r => setTimeout(r, 500)); // wait for some time to elapse
    fireEvent.click(screen.getByText('Lap'));

    await waitFor(() => {
      const laps = screen.getByTestId('lap-list').querySelectorAll('div');
      expect(laps.length).toBeGreaterThanOrEqual(1);
    });

    fireEvent.click(screen.getByText('Lap'));
    await waitFor(() => {
      const laps = screen.getByTestId('lap-list').querySelectorAll('div');
      expect(laps.length).toBeGreaterThanOrEqual(2);
    });
  });

  test('resets the stopwatch', async () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    await waitFor(() => expect(screen.getByText('00:00:00')).toBeInTheDocument());
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});
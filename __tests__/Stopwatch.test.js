import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import "@testing-library/jest-dom"; 
import Stopwatch from '../src/StopWatch';

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
    setTimeout(() => {expect(screen.queryByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe("00:00:00");}, 2000);
  });

  test('pauses and resumes the stopwatch', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText('Resume'));
    setTimeout(() => {expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);}, 2000);
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(within(screen.getByTestId('lap-list')).getAllByText(/(\d{2}:){2}\d{2}/).length).toBe(1);

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

// Stopwatch.test.tsx
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from './StopWatch';

test('renders stopwatch component with initial state', () => {
  render(<Stopwatch />);
  
  expect(screen.getByText(/0/i)).toBeInTheDocument();

  expect(screen.getByText(text => ['Start', 'Stop'].includes(text))).toBeInTheDocument();
  expect(screen.getByText('Reset')).toBeInTheDocument();
  expect(screen.getByText('Lap')).toBeInTheDocument();
});

test('starts and stops the stopwatch', () => {
    render(<Stopwatch/>);

    expect(screen.getByText('00:00')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Start'));

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/00:01/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Stop'));

});
test('resets the stopwatch', () => {
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText('Start'));


    act(() => {
        jest.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText('00:00')).toBeInTheDocument();

});

test('records laps', () => {
    render(<Stopwatch/>);

    fireEvent.click(screen.getByText('Start'));


    fireEvent.click(screen.getByText('Lap'));

    expect(screen.getByText(/Lap 1:/i)).toBeInTheDocument();

});

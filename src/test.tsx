import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stopwatch from './StopWatch';
import '@testing-library/jest-dom';

describe('Stopwatch', () => {
  test('renders stopwatch component', () => {
    render(<Stopwatch />);
    expect(screen.getByText(/stopwatch/i)).toBeInTheDocument();
  });

  test('starts timer when start button is clicked', () => {
    jest.useFakeTimers();
    render(<Stopwatch />);
    
    fireEvent.click(screen.getByText(/start/i));
    jest.advanceTimersByTime(1000);

    expect(screen.getByText(/1 seconds/i)).toBeInTheDocument();
    jest.useRealTimers();
  });
});
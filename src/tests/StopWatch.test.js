import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../StopWatch';

describe('StopWatch', () => {
  test('renders stopwatch with initial state', () => {
    render(<StopWatch />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  test('starts the stopwatch when Start button is clicked', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('00:00:00')).not.toBeInTheDocument();
  });

  test('resumes the stopwatch when Resume button is clicked', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Resume'));
    expect(screen.getByText('00:00:00')).not.toBeInTheDocument();
  });

  test('stops the stopwatch when Stop button is clicked', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  test('adds a lap when Lap button is clicked', () => {
    render(<StopWatch />);
    
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('Lap 1: 00:00:00')).toBeInTheDocument();
  });

  test('resets the stopwatch when Reset button is clicked', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });
});

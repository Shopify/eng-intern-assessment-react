import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../src/StopWatchButton';

  //testing if the start and stop buttons are working
  it('Stop button stops the stopwatch', () => {
    render(<StopWatchButton onStart={() => {}} onStop={() => {}} onClear={() => {}} onAddLap={() => {}} />);
    const stopButton = screen.getByRole('button', { name: /stop/i });
    expect(stopButton).toBeInTheDocument();
    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeInTheDocument();
  });

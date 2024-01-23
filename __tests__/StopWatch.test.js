/**
 * @jest-environment jsdom
 */

//css files must be commented out to run tests

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StopWatch from '../src/StopWatch';
import '@testing-library/jest-dom'
import StopWatchButton from '../src/StopWatchButton';

describe('StopWatch', () => {
  test('renders initial time state correctly at 0 seconds 0 minutes and 0 hours', () => {
    render(<StopWatch />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  test('Lap displays when lap button clicked when timer is not active', () => {
    render(<StopWatch />)
    fireEvent.click(screen.getByText("Lap"))
    expect(screen.getByTestId('lap-display-container')).toHaveTextContent("Lap 1: 0 seconds")
    
  })

  test('Timer increases when start button is pressed', async () => {
    render(<StopWatch />)
    fireEvent.click(screen.getByText("Start"))
    await (waitFor(() => screen.getByText('00:00:02'),{timeout:2200}));
  })

  test('pause button pauses the timer', async () => {
    render(<StopWatch />)
    fireEvent.click(screen.getByText("Start"))
    await (waitFor(() => screen.getByText('00:00:02'),{timeout:2200}));
    fireEvent.click(screen.getByText("Pause"))
    await (waitFor(() => screen.getByText('00:00:02'),{timeout:2000}));
  })

  test('start button continues timer from where it paused', async () => {
    render(<StopWatch />)
    fireEvent.click(screen.getByText("Start"))
    await (waitFor(() => screen.getByText('00:00:01'),{timeout:1200}));
    fireEvent.click(screen.getByText("Pause"))
    await (waitFor(() => screen.getByText('00:00:01'),{timeout:1000}));
    fireEvent.click(screen.getByText("Start"))
    await (waitFor(() => screen.getByText('00:00:03'),{timeout:2200}));
  })

  test('reset button sets timer back to 0', async () => {
    render(<StopWatch />)
    fireEvent.click(screen.getByText("Start"))
    await (waitFor(() => screen.getByText('00:00:01'),{timeout:1200}));
    fireEvent.click(screen.getByText("Reset"))
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  })

  test('Mutliple laps print', async () => {
    render(<StopWatch />)
    fireEvent.click(screen.getByText("Start"))
    await (waitFor(() => screen.getByText('00:00:01'),{timeout:1200}));
    fireEvent.click(screen.getByText("Lap"))
    expect(screen.getByText('Lap 1: 1 seconds')).toBeInTheDocument();
    await (waitFor(() => screen.getByText('00:00:02'),{timeout:1200}));
    fireEvent.click(screen.getByText("Lap"))
    expect(screen.getByText('Lap 2: 1 seconds')).toBeInTheDocument();
    await (waitFor(() => screen.getByText('00:00:04'),{timeout:2200}));
    fireEvent.click(screen.getByText("Lap"))
    expect(screen.getByText('Lap 3: 3 seconds')).toBeInTheDocument();
  })
})
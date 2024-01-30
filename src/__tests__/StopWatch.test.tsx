import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import StopWatch from "../StopWatch";
  
  test('initial state renders correctly', () => {
    render(<StopWatch />);
    expect(screen.getByTestId('heading')).toHaveTextContent('Stopwatch');
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.getByTestId('laplist')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  test('lap button does not add a lap when stopped', () => {
    render(<StopWatch />);
    const lapButton = screen.getByRole('button', {name: 'Lap'})
    const pauseButton = screen.getByRole('button', {name: 'Pause'})
    fireEvent.click(pauseButton)
    fireEvent.click(lapButton)
    expect(screen.getByTestId('laplist').childElementCount).toBe(0)
  })

  test('lap button adds a lap when running', () => {
    render(<StopWatch />);
    const lapButton = screen.getByRole('button', {name: 'Lap'})
    const startButton = screen.getByRole('button', {name: 'Start'})
    fireEvent.click(startButton)
    fireEvent.click(lapButton)
    expect(screen.getByTestId('laplist').childElementCount).toBe(1)
  })

  // Use fake timer for timekeeping tests
  jest.useFakeTimers();
  test('start button begins stopwatch', () => {
    render(<StopWatch />)
    const intervalSpy = jest.spyOn(global, 'setInterval')
    const startButton = screen.getByRole('button', {name: 'Start'})
    fireEvent.click(startButton)
    expect(intervalSpy).toHaveBeenCalledTimes(2) //runs stopwatch interval and title update
  })

  test('pause button stops stopwatch', () => {
    render(<StopWatch />)
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    const startButton = screen.getByRole('button', {name: 'Start'})
    const pauseButton = screen.getByRole('button', {name: 'Pause'})
    fireEvent.click(pauseButton)
    fireEvent.click(startButton)
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2) //clears stopwatch interval and title update
  })

  test('reset button clears stopwatch', () => {
    render(<StopWatch />)
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    const startButton = screen.getByRole('button', {name: 'Start'})
    const resetButton = screen.getByRole('button', {name: 'Reset'})
    fireEvent.click(startButton)
    fireEvent.click(resetButton)
    expect(clearIntervalSpy).toHaveBeenCalledTimes(8) 
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  })

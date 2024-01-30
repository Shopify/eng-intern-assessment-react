/**
 * @file This file contains unit tests for the StopWatchButton component.
 * @see {@link /Users/melissaarmstrong/Coding/eng-intern-assessment-react/src/StopWatchButton.tsx}
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import StopWatchButton from './StopWatchButton';

const maxLaps = 25;

/**
 * Tests the rendering and behavior of the StopWatchButton component.
 */
describe('StopWatchButton', () => {
  // Test rendering of each button with correct text
  test.each([
    ['start', 'Start'],
    ['stop', 'Stop'],
    ['lap', 'Record Lap'],
    ['reset', 'Reset']
  ])('renders %s button with correct text', (type: "start" | "stop" | "lap" | "reset", text) => {
    render(<StopWatchButton type={type} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // Test lap button disabled when timer is off
  test('lap button disabled when timer is off', () => {
    render(<StopWatchButton type='lap' timerOn={false} />);
    expect(screen.getByText('Record Lap')).toBeDisabled();
  });

  // Test reset button disabled when time is 0
  test('reset button disabled when time is 0', () => {
    render(<StopWatchButton type='reset' time={0} />);
    expect(screen.getByText('Reset')).toBeDisabled();
  });

  // Test rendering of each button in correct enabled/disabled state
  test.each([
    ['start', true, 'Start'],
    ['stop', true, 'Stop'],
    ['lap', true, 'Record Lap', true, [1, 2, 3]], // timer on and less than max laps
    ['reset', true, 'Reset', true, 10],
    ['lap', false, 'Record Lap', false], // timer off
    ['reset', false, 'Reset', true, 0], // time is 0
  ])('renders %s button in correct enabled/disabled state', (type, expectedEnabled, buttonText, timerOn = true, time = 10, lapTimes: number[] = []) => {
    render(<StopWatchButton type={type as "start" | "stop" | "lap" | "reset"} timerOn={timerOn} time={time as number} lapTimes={lapTimes} />);
    const button = screen.getByText(buttonText);
    const buttonElement = screen.getByText(buttonText) as HTMLButtonElement;
    expect(buttonElement.disabled).toBe(!expectedEnabled);
  });

  // Test onClick event when lap button is clicked
  test('calls onClick when lap button is clicked', () => {
    const handleClick = jest.fn();
    // Ensure timer is on and the number of laps is less than maxLaps
    const lapTimes = [1, 2, 3]; // Example lap times, less than maxLaps
    render(<StopWatchButton type="lap" onClick={handleClick} timerOn={true} lapTimes={lapTimes} />);
    fireEvent.click(screen.getByText('Record Lap'));
    expect(handleClick).toHaveBeenCalled();
  });
  

  // Test lap button disabled when lap count reaches max
  test('lap button disabled when lap count reaches max', () => {
    const lapTimes = new Array(maxLaps).fill(0);
    render(<StopWatchButton type='lap' timerOn={true} lapTimes={lapTimes} />);
    expect(screen.getByText('Maximum laps reached')).toBeDisabled();
  });

  // Test rendering of each button with correct aria-label and tabIndex
  test.each([
    ['start', 1],
    ['stop', 2],
    ['lap', 3],
    ['reset', 4]
  ])('renders %s button with correct aria-label and tabIndex', (type, tabIndex) => {
    render(<StopWatchButton type={type as "start" | "stop" | "lap" | "reset"} />);
    const button = screen.getByLabelText(type);
    expect(button).toHaveAttribute('tabIndex', tabIndex.toString());
  });

  // Test rendering of "Maximum laps reached" for lap button when max laps reached
  test('renders "Maximum laps reached" for lap button when max laps reached', () => {
    const lapTimes = new Array(maxLaps).fill(0);
    render(<StopWatchButton type='lap' timerOn={true} lapTimes={lapTimes} />);
    expect(screen.getByText('Maximum laps reached')).toBeInTheDocument();
  });
});

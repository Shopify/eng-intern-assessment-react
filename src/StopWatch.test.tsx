/**
 * FILEPATH: /Users/melissaarmstrong/Coding/eng-intern-assessment-react/src/StopWatch.test.tsx
 * 
 * @jest-environment jsdom
 * @jest-axe/extend-expect
 * 
 * @description Unit tests for the StopWatch component.
 */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';

/**
 * @description Test suite for the StopWatch component.
 */
describe('StopWatch', () => {
  /**
   * @description Test case to check if the stopwatch component renders correctly.
   */
  test('renders stopwatch component with initial state', () => {
    render(<StopWatch />);
    expect(screen.getByText('StopWatch')).toBeInTheDocument();
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
});
/**
 * @description Test case to check if the timer starts and updates the display.
 */

test('timer starts and updates display', async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    await waitFor(() => expect(screen.queryByText('00:00:00')).not.toBeInTheDocument(), { timeout: 100 });
    fireEvent.click(screen.getByText('Stop'));
});


  /**
   * @description Test case to check if the reset button resets the timer.
   */
  test('reset button resets the timer', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  /**
   * @description Test case to check if the lap functionality records lap times.
   */
  test('lap functionality records lap times', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Record Lap'));
    expect(screen.getByText('Lap times')).toBeInTheDocument();
  });
});

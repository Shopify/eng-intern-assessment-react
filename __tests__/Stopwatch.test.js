import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from '../src/StopWatch';

describe('StopWatch component', () => {
  /**
   * Test Case 1: Rending the Initial State 
   * */
  test('renders initial state correctly', () => {
    // Render Stopwatch component 
    render(<Stopwatch />);

    // Assert: Verify if the initial state is as expected 
    // Expected: stopwatch display should be initalized to 00:00:00
    expect(screen.getByText('00:00:00')).toBeInTheDocument();

    // Expected: the list of the lap should be empty 
    const lapList = screen.queryByTestId('lap-list');
    expect(lapList).toBeInTheDocument();
    expect(lapList).toBeEmptyDOMElement();
  });

  /**
  * Test Case 2: Stopping the Stopwatch 
  * */
  test('should stop counting when the stop button is clicked', () => {
    // Render Stopwatch component and retreive elements by using the testid
    const { getByTestId } = render(<Stopwatch />);
    const startButton = getByTestId('start-button');
    const stopButton = getByTestId('stop-button');

    // Click the start button to start (to start the timer and count) 
    fireEvent.click(startButton);


    // Assert: Verify that Stopwatch stops counting when the stop button is clciked 
    // After clicking the stop button, the display time should remain the same
    const stopwatchDisplay = getByTestId('stopwatch-display');
    const initialTime = stopwatchDisplay.textContent;
    fireEvent.click(stopButton);
    expect(stopwatchDisplay.textContent).toBe(initialTime);
  });

  /**
   * Test Case 3: Reset the Stopwatch 
   */
  test('should reset to zero when the reset button is clicked', () => {
    // Render the Stopwatch component and retrieve required elements
    const { getByTestId } = render(<Stopwatch />);
    const startButton = getByTestId('start-button');
    const resetButton = getByTestId('reset-button');

    // Click the start button, followed by the reset button 
    fireEvent.click(startButton);
    fireEvent.click(resetButton);

    // Assert: Verify that the display when the reset button is clicked is "00:00:00"
    const stopwatchDisplay = getByTestId('stopwatch-display');
    expect(stopwatchDisplay.textContent).toBe('00:00:00');
  });

  /**
 * Test Case 4: Pausing and Resuming the Stopwatch 
 */
  test('pauses and resumes the stopwatch', async () => {
    // Render the Stopwatch component and retrieve required elements
    const { getByTestId } = render(<Stopwatch />);
    const startButton = getByTestId('start-button');
    const stopButton = getByTestId('stop-button');

    // Start the stopwatch and record the initial time
    fireEvent.click(startButton);
    const initialTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    // Pause the stopwatch
    fireEvent.click(stopButton);
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    // Resume the stopwatch
    fireEvent.click(startButton);

    // Use an async await to allow for rendering updates
    await waitFor(() => {
      // Assert: Verify that the time resumes correctly after pausing
      expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
    });
  });

  /**
   * Test Case 5: Record and Display Laps
   */
  test('should record and display laps when the lap button is clicked', () => {
    // Render the Stopwatch component and retrieve required elements
    const { getByTestId } = render(<Stopwatch />);
    const startButton = getByTestId('start-button');
    const lapButton = getByTestId('lap-button');

    // Click the start button followed by the lap button 
    fireEvent.click(startButton);
    fireEvent.click(lapButton);

    // Verify that at least one lap is recorded and displayed 
    const lapList = getByTestId('lap-list');
    const laps = lapList.querySelectorAll('.lap-text');
    expect(laps.length).toBeGreaterThan(0);
  });
});
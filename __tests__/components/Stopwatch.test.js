import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from '../../src/components/StopWatch';

jest.useFakeTimers();

const wait = (time = 2000) => {
  // Wait for X seconds
  act(() => {
    jest.advanceTimersByTime(time);
  });
};

describe('Stopwatch', () => {
  test('renders initial stopwatch state correctly', () => {
    render(<Stopwatch />);
    // Assert that each unit (hours, minutes, seconds, centiseconds) is rendered with the initial value of 0
    expect(screen.getByTestId('hours')).toHaveTextContent('00');
    expect(screen.getByTestId('minutes')).toHaveTextContent('00');
    expect(screen.getByTestId('seconds')).toHaveTextContent('00');
    expect(screen.getByTestId('centiseconds')).toHaveTextContent('00');
  });

  test('renders initial lap list state correctly', () => {
    render(<Stopwatch />);
    // Assert that the lap list is initially empty
    expect(screen.queryByTestId('lap-list')).toBeNull();
    // Assert that the lap placeholder is shown
    expect(screen.queryByTestId('lap-placeholder')).toBeInTheDocument();
  });

  test('starts and stops the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByTestId('start-button'));
    wait();

    // Expect that hours and minutes are '00'
    expect(screen.getByTestId('hours')).toHaveTextContent('00');
    expect(screen.getByTestId('minutes')).toHaveTextContent('00');

    // Expect that seconds and centiseconds are not '00'
    expect(screen.getByTestId('seconds')).not.toHaveTextContent('00');
    expect(screen.getByTestId('centiseconds')).not.toHaveTextContent('00');

    fireEvent.click(screen.getByTestId('pause-button'));

    // Get initial values for seconds and centiseconds
    const seconds = screen.getByTestId('seconds').textContent;
    const centiseconds = screen.getByTestId('centiseconds').textContent;

    // Wait for 1 second (1000 centiseconds) to confirm that the stopwatch is paused
    wait();

    // Get value for seconds and centiseconds again after 2 seconds of waiting
    const secondsPaused = screen.getByTestId('seconds').textContent;
    const centisecondsPaused = screen.getByTestId('centiseconds').textContent;

    // Expect that the Start button label is changed to Resume
    expect(screen.getByText('Resume')).toBeInTheDocument();

    // Expect that seconds and centiseconds remain the same after 2 seconds of waiting
    expect(seconds === secondsPaused).toBe(true);
    expect(centiseconds === centisecondsPaused).toBe(true);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);

    // Expect that seconds and centiseconds are not '00'before clicking the Reset button
    expect(screen.getByTestId('seconds')).not.toHaveTextContent('00');
    expect(screen.getByTestId('centiseconds')).not.toHaveTextContent('00');

    fireEvent.click(screen.getByTestId('reset-button'));

    // Assert that each unit (hours, minutes, seconds, centiseconds) is rendered with the initial value of 0
    expect(screen.getByTestId('hours')).toHaveTextContent('00');
    expect(screen.getByTestId('minutes')).toHaveTextContent('00');
    expect(screen.getByTestId('seconds')).toHaveTextContent('00');
    expect(screen.getByTestId('centiseconds')).toHaveTextContent('00');

    // Reset stopwatch after the test
    fireEvent.click(screen.getByTestId('reset-button'));
  });

  test('pauses and resumes the stopwatch', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByTestId('start-button'));
    wait();

    fireEvent.click(screen.getByTestId('pause-button'));

    // Get initial values for seconds and centiseconds after pausing the stopwatch
    const seconds = screen.getByTestId('seconds').textContent;
    const centiseconds = screen.getByTestId('centiseconds').textContent;

    // Expect that the Start button label is changed to Resume
    expect(screen.getByText('Resume')).toBeInTheDocument();
    // Click the Resume button
    fireEvent.click(screen.getByTestId('start-button'));
    wait();

    // Get value for seconds and centiseconds again after Resume is clicked
    const secondsResumed = screen.getByTestId('seconds').textContent;
    const centisecondsResumed = screen.getByTestId('centiseconds').textContent;

    // Expect that seconds and centiseconds are changed after Resume is clicked
    expect(seconds !== secondsResumed).toBe(true);
    expect(centiseconds !== centisecondsResumed).toBe(true);

    // Reset stopwatch after the test
    fireEvent.click(screen.getByTestId('reset-button'));
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByTestId('start-button'));
    wait();

    fireEvent.click(screen.getByTestId('lap-button'));
    wait();

    const firstLap = screen.getByTestId('lap-list').children[0];
    expect(screen.getByTestId('lap-list').children.length).toBe(1);
    const { getByTestId } = within(firstLap);

    // Expect that a new lap is added with Time content and each time unit has a proper value
    expect(getByTestId('hours')).toHaveTextContent('00');
    expect(getByTestId('minutes')).toHaveTextContent('00');
    expect(getByTestId('seconds')).not.toHaveTextContent('00');
    expect(getByTestId('centiseconds')).not.toHaveTextContent('00');

    fireEvent.click(screen.getByTestId('lap-button'));
    wait();

    expect(screen.getByTestId('lap-list').children.length).toBe(2);

    // Reset stopwatch after the test
    fireEvent.click(screen.getByTestId('reset-button'));
  });

  test('time and recorded laps are stored in local storage', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByTestId('start-button'));
    wait();
    fireEvent.click(screen.getByTestId('lap-button'));
    fireEvent.click(screen.getByTestId('pause-button'));

    // Get timer container
    const timerContainer = screen.getByTestId('timer-container');
    const { getByTestId } = within(timerContainer);

    // Get initial values for seconds and centiseconds
    const seconds = getByTestId('seconds').textContent;
    const centiseconds = getByTestId('centiseconds').textContent;

    // Expect that seconds and centiseconds are not set to '00'
    expect(seconds !== '00').toBe(true);
    expect(centiseconds !== '00').toBe(true);

    // Simulate page refresh
    const originalLocation = window.location;
    delete window.location;
    window.location = { reload: jest.fn() };
    window.location.reload();
    window.location = originalLocation;

    // Get initial values for seconds and centiseconds after refresh
    const secondsRefreshed = getByTestId('seconds').textContent;
    const centisecondsRefreshed = getByTestId('centiseconds').textContent;

    // Expect that seconds and centiseconds are not set to '00' after refresh
    expect(seconds === secondsRefreshed).toBe(true);
    expect(centiseconds === centisecondsRefreshed).toBe(true);

    // Expect that recorded laps are displayed
    expect(screen.getByTestId('lap-list').children.length).toBe(1);
  });
});
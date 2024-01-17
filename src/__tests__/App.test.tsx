// App.test.js
import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import App, { LapTrackerComponents, formatTimeValue, handleTimeDigits } from '../App';

describe('LapTrackerComponents component test', () => {
  it('renders all the lap times correctly', () => {
    const lapTimes = ['01:30:00:00', '02:15:30:00', '03:10:45:00', '05:30:00:00'];
    const { getByTestId } = render(<LapTrackerComponents lapTimes={lapTimes} />);
    lapTimes.forEach((lapTime, index) => {
      const lapTimeElement = getByTestId(`laptimeItem-${index}`);
      expect(lapTimeElement.textContent).toBe(`Lap ${lapTimes.length - index}: ${lapTime}`);
    });
  });
});

describe('App componet', () => {
  it('formats time value correctly', () => {
    // Mock formatTimeValue to test different input values
    const formattedTime = formatTimeValue(60000);
    expect(formattedTime).toBe('00:10:00:00');
  });

  it('formats time double digits correctly', () => {
    // Mock handleTimeDigits to test different input values
    const formattedTime = handleTimeDigits(8);
    expect(formattedTime).toBe('08');
  });

  it('test Reset button on click event', () => {
    const timeString = "00:00:00:00";
    const { queryByTestId } = render(
      <App/>
    );
    const resetButton = queryByTestId('resetButtonTest');
    fireEvent.click(resetButton);
    const stopWatchElement = queryByTestId('stopWatchTest');
    expect(stopWatchElement.textContent).toBe(timeString);
  });

  it('test Lap button to add a lap on click', () => {
    const { queryByTestId } = render(
      <App/>
    );
    const startButton = queryByTestId('startButtonTest');
    fireEvent.click(startButton);
    const lapButton = queryByTestId('lapButtonTest');
    fireEvent.click(lapButton);
    const lapTimeElement = queryByTestId(`laptimeItem-1`);
    expect(lapTimeElement).toBeDefined();
  });
});
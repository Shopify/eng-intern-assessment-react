// LapTrackerComponents.test.js
import React from 'react';
import { getAllByTestId, getByTestId, render } from '@testing-library/react';
import { LapTrackerComponents } from '../App';

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

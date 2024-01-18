// StopWatch.test.js
import React from 'react';
import { render } from '@testing-library/react';
import StopWatch from '../StopWatch';

describe('StopWatch component tests', () => {
  it('renders the provided time on stopwatch', () => {
    const timeString = '30:30:30:30';
    const { getByTestId } = render(<StopWatch timeString={timeString} />);
    const stopWatchElement = getByTestId('stopWatchTest');
    expect(stopWatchElement.textContent).toBe(timeString);
  });

  it('renders the default time on stopwatch', () => {
    const defaultTime = '00:00:00:00';
    const { getByTestId } = render(<StopWatch />);
    const stopWatchElement = getByTestId('stopWatchTest');
    expect(stopWatchElement.textContent).toBe(defaultTime);
  });
});

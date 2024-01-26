import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

describe('<StopWatchButton />', () => {
  test('it toggles the stopwatch running state on click', () => {
    const mockSetIsRunning = jest.fn();
    const isRunning = false;

    const { getByText } = render(
      <StopWatchButton isRunning={isRunning} setIsRunning={mockSetIsRunning} />
    );

    const startButton = getByText('Start');
    fireEvent.click(startButton);

    // Check if the setIsRunning function is called with the correct argument
    expect(mockSetIsRunning).toHaveBeenCalledWith(true);
  });
});

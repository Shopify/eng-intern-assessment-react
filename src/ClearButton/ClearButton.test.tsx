import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClearButton from './ClearButton';

describe('<ClearButton />', () => {
  test('it resets the timer, laps, and stops the watch on click', () => {
    const mockSetTime = jest.fn();
    const mockSetLaps = jest.fn();
    const mockSetIsRunning = jest.fn();

    const { getByText } = render(
      <ClearButton setTime={mockSetTime} setLaps={mockSetLaps} setIsRunning={mockSetIsRunning} />
    );

    const button = getByText('Reset');
    fireEvent.click(button);

    // Check if the setTime, setLaps, and setIsRunning functions are called correctly
    expect(mockSetTime).toHaveBeenCalledWith(0);
    expect(mockSetLaps).toHaveBeenCalledWith([]);
    expect(mockSetIsRunning).toHaveBeenCalledWith(false);
  });
});

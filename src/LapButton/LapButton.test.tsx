import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LapButton from './LapButton';

describe('<LapButton />', () => {
  test('it records a lap time on click when not disabled', () => {
    const mockSetLaps = jest.fn();
    const laps : number[] = [];
    const time = 12345; // Example time

    const { getByText } = render(
      <LapButton time={time} laps={laps} setLaps={mockSetLaps} isDisabled={false} />
    );

    const lapButton = getByText('Lap');
    fireEvent.click(lapButton);

    // Check if the setLaps function is called with the correct argument
    expect(mockSetLaps).toHaveBeenCalledWith([time]);
  });

  test('it does not record a lap time when disabled', () => {
    const mockSetLaps = jest.fn();
    const laps : number[] = [];
    const time = 12345; // Example time

    const { getByText } = render(
      <LapButton time={time} laps={laps} setLaps={mockSetLaps} isDisabled={true} />
    );

    const lapButton = getByText('Lap');
    fireEvent.click(lapButton);

    // The setLaps function should not be called when the button is disabled
    expect(mockSetLaps).not.toHaveBeenCalled();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import LapList from './../LapList';
import '@testing-library/jest-dom';
describe('LapList component', () => {
  test('Should render LapList with given list of laps', () => {
    const laps = [
      { lapNumber: 1, lapTime: 10000 },
      { lapNumber: 2, lapTime: 20000 },
      { lapNumber: 3, lapTime: 300000 },
    ];
    
    const { getByText } = render(<LapList laps={laps} />);
  
    laps.forEach((lap) => {
      expect(getByText(`Lap: ${lap.lapNumber}`)).toBeInTheDocument();
    });
  });
});
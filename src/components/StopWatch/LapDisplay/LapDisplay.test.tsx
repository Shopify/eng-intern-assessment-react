import '@testing-library/jest-dom/'
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StopWatchContext } from "../"
import { useStopWatch } from '../hooks';
import { LapDisplay } from '../LapDisplay'; // Adjust the import path as needed.



describe('LapDisplay', () => {
    const mockLaps = [3600000, 7200000, 10800000]; // in milliseconds
    const mockResolutions = [
      {divisor: 3600000, modulus: 60},
      {divisor: 60000, modulus: 60},
      {divisor: 1000, modulus: 60}
    ];
  
    it('updates lap times when Resolution changes', () => {
      
      const TestComponent = () => {
        const StopWatchController = useStopWatch({resolutions:mockResolutions});
        return (
            <StopWatchContext.Provider value={{darkTheme:true, sw:StopWatchController}}>
                <LapDisplay laps={mockLaps}/>
            </StopWatchContext.Provider>
        );
      };
      render(<TestComponent />);
      // Check initial lap times (in hours)
      mockLaps.forEach((lap, index) => {
        const lapElement = screen.getByText(`lap ${index + 1}`)
        expect(lapElement).toBeInTheDocument();
        const lapTime = screen.getByText(`${(Math.floor(mockLaps[0] / mockResolutions[0].divisor) % mockResolutions[0].modulus).toString().padStart(2, "0")}`);
        expect(lapTime).toBeInTheDocument();
      });
    });


  });

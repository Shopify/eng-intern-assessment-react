import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../src/StopWatchButton';

describe('StopWatchButton', () => {
	// simple unit test to ensure tests are set up properly & working as normal
    test("this section contains a button", () => {
		render(<StopWatchButton
      timeInSeconds={0} 
      lappedTime={[]}
      stopWatchCounting={false}
      handleStartButton={Function}
      handleStopButton={Function}
      handleResetButton={Function}
      handleLapButton={Function}/>);
        const element = screen.getByRole('button', { name: 'Start' });
        expect(element).toBeInTheDocument();
	});

    // start button unit test
    test("stopwatch starts counting when start button is clicked", () => {
		const mockHandleStart = jest.fn();

        const {getByText} = render(<StopWatchButton 
          timeInSeconds={0}
          lappedTime={[]}
          stopWatchCounting={false}
          handleStartButton={mockHandleStart}
          handleStopButton={Function}
          handleResetButton={Function}
          handleLapButton={Function} />);
         
        const button = getByText("Start");

        fireEvent.click(button);
        
        expect(mockHandleStart).toHaveBeenCalled();
        
	});

      // stop button unit test
      test("stopwatch stops counting when stop button is clicked", () => {
        const mockHandleStop = jest.fn();
    
            const {getByText} = render(<StopWatchButton
              timeInSeconds={0}
              lappedTime={[]}
              stopWatchCounting={true}
              handleStartButton={Function}
              handleResetButton={Function} 
              handleStopButton={mockHandleStop}
              handleLapButton={Function} />);
             
            const button = getByText("Stop");
    
            fireEvent.click(button);
            
            expect(mockHandleStop).toHaveBeenCalled();
      });

      // reset button unit test
      test("when reset button is clicked, stopwatch stops counting and resets timer & lap array", () => {
        const mockHandleReset = jest.fn();
    
            const {getByText} = render(<StopWatchButton
              timeInSeconds={9} 
              lappedTime={[10]}
              stopWatchCounting={false}
              handleStartButton={Function}
              handleResetButton={mockHandleReset} 
              handleStopButton={Function}
              handleLapButton={Function} />);
             
            const button = getByText("Reset");
            const currentLaps = screen.queryByTestId("lap_test");
    
            fireEvent.click(button);
            
            expect(mockHandleReset).toHaveBeenCalled();
            expect(currentLaps).toBe(null);
      });

      // lap button unit test
      test("lap is recorded when lap button is pressed & list of laps shows up on screen", () => {
        const mockHandleLap = jest.fn();
    
            const {getByText} = render(<StopWatchButton
              timeInSeconds={23}
              lappedTime={[9, 10]}
              stopWatchCounting={false}
              handleStartButton={Function}
              handleResetButton={Function} 
              handleStopButton={Function}
              handleLapButton={mockHandleLap} />);
             
            const button = getByText("Lap");
            const laps = screen.queryByTestId("lap_test");
    
            fireEvent.click(button);
            
            expect(mockHandleLap).toHaveBeenCalled();
            expect(laps).toBeInTheDocument;

      });

});
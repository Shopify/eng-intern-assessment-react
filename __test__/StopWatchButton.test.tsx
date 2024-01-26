import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../src/StopWatchButton'

describe('StopWatchButton', () => {
	// simple unit test to ensure tests are working
    test("this section contains a button", () => {
		render(<StopWatchButton timeInSeconds={0} handleStartButton={Function} handleStopButton={Function} handleResetButton={Function} />);
        const element = screen.getByRole('button', { name: 'Start' });
        expect(element).toBeInTheDocument();
	});

    // start button unit test
    test("stopwatch starts counting when start button is clicked", () => {
		const mockHandleStart = jest.fn();

        const {getByText} = render(<StopWatchButton timeInSeconds={0} handleStartButton={mockHandleStart} handleStopButton={Function}  handleResetButton={Function} />);
         
        const button = getByText("Start");

        fireEvent.click(button);
        
        expect(mockHandleStart).toHaveBeenCalled();
	});

      // stop button unit test
      test("stopwatch stops counting when stop button is clicked", () => {
        const mockHandleStop = jest.fn();
    
            const {getByText} = render(<StopWatchButton timeInSeconds={0} handleStartButton={Function} handleResetButton={Function} 
            handleStopButton={mockHandleStop} />);
             
            const button = getByText("Stop");
    
            fireEvent.click(button);
            
            expect(mockHandleStop).toHaveBeenCalled();
      });

      // reset button unit test
      test("stopwatch stops counting and resets when reset button is clicked", () => {
        const mockHandleReset = jest.fn();
    
            const {getByText} = render(<StopWatchButton timeInSeconds={9} handleStartButton={Function} handleResetButton={mockHandleReset} 
            handleStopButton={Function} />);
             
            const button = getByText("Reset");
    
            fireEvent.click(button);
            
            expect(mockHandleReset).toHaveBeenCalled();
      });

});
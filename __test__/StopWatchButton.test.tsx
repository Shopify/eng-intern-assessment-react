import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../src/StopWatchButton'

describe('StopWatchButton', () => {
	// simple unit test to ensure tests are working
    test("this section contains a button", () => {
		render(<StopWatchButton timeInSeconds={0} handleStartButton={Function} />);
        const element = screen.getByRole('button', { name: 'Start' });
        expect(element).toBeInTheDocument();
	});

    // start button unit test
    test("stopwatch starts counting when start button is clicked", () => {
		const mockHandleStart = jest.fn();

        const {getByText} = render(<StopWatchButton timeInSeconds={0} handleStartButton={mockHandleStart} />);
         
        const button = getByText("Start");

        fireEvent.click(button);
        
        expect(mockHandleStart).toHaveBeenCalled();
	});

});
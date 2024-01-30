import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../src/Components/StopWatch/StopWatch';

/*
    This file tests the essential functionality of the StopWatch component
    It is important to remember the StopWatchButton and Laps components are rendered within the StopWatch component
    Thus file tests the functionality of everything within the StopWatch component, including the buttons and lap list
*/

describe('Stopwatch', () => {
    test("renders initial state with 00:00:00", () => {
        render(<StopWatch />);
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });

    test("starts the stopwatch and makes sure time is not 00:00:00", async () => {
        render(<StopWatch />);
         fireEvent.click(screen.getByText('Start'));

         //Make sure the timer started and is not 00:00:00
        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent
            expect(time).not.toBe("00:00:00");
            }, { timeout: 1000 }
        );
    });
    
    test("reset button resets the timer to 00:00:00 after confirmed starting", async () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText('Start'));

        //Make sure the timer started and is not 00:00:00
        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent
            expect(time).not.toBe("00:00:00");
            }, { timeout: 1000 }
        );

        //Reset the timer and make sure it is 00:00:00
        fireEvent.click(screen.getByText('Reset'));
        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent
            expect(time).toBe("00:00:00");
            }, { timeout: 1000 }
        );
    });

    test("stop button stops the timer after confirmed start", async () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText('Start'));

        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent
            expect(time).not.toBe("00:00:00");
            }, { timeout: 1000 }
        );

        //Stop the timer and get the current time
        fireEvent.click(screen.getByText('Stop'));
        let timePressStop = screen.getByTestId('stopwatch-time').textContent;

        //Wait a second and see if the timer hasn't changed since the stop button was pressed
        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent
            expect(time).toBe(timePressStop);
            }, { timeout: 1000 }
        );
    });

    test('adds lap to the lap list when lap button is clicked', async () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText('Start'));
    
        //Make sure the timer started and is not 00:00:00
        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent;
            expect(time).not.toBe("00:00:00");
        }, { timeout: 1000 });
    
        //Get the current stopwatch time
        const stopwatchTime = screen.getByTestId('stopwatch-time').textContent;
        fireEvent.click(screen.getByText('Lap'));
    
        //It will be lap-time-0 because it is the first lap, and the id is made based of the index (starts at 0)
        const lapTime = screen.getByTestId('lap-time-0').textContent;

        //Verify that the lap time is the same as the current stopwatch time
        expect(lapTime).toBe(stopwatchTime);
    });

    test('deletes a lap that was confirmed to be added from the list when delete button is clicked', async () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText('Start'));
    
        //Make sure the timer started and is not 00:00:00
        await waitFor(() => {
            const time = screen.getByTestId('stopwatch-time').textContent;
            expect(time).not.toBe("00:00:00");
        }, { timeout: 1000 });
    
        fireEvent.click(screen.getByText('Lap'));
    
        //Confirm a lap was added, will be lap-time-0 because it is the first lap, and the id is made based of the index (starts at 0)
        const lapTime = screen.getByTestId('lap-time-0');

        expect(lapTime).not.toBeNull();
        
        // Delete the lap
        fireEvent.click(screen.getByText('Delete'));
    
        // Confirm that same lap-item-0 we confirmed was there, is deleted as now the element won't be there
        const deletedLap = screen.queryByTestId('lap-time-0');
        expect(deletedLap).toBeNull();
    });
    

});
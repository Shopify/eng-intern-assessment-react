import React from 'react';
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '../__mocks__/matchMedia.mock'
import App from '../App';
import { AppProvider } from '@shopify/polaris';

/*
The tests below are used to determine if the App component correctly starts, stops,
resets, and records lap times. There are also tests to check if the aforementioned
processes work for the LiveWatch component and there is a test to see if the component
renders properly.
*/


describe('App', () => {
    test('testing if all values are 0 before app starts', () => {
        render(<AppProvider><App/></AppProvider>)
        // Current time should be 0.
        expect((screen.getAllByText('00:00:00'))[0]).toBeInTheDocument();
        // Lap time should be 0.
        expect((screen.getAllByText('00:00:00'))[1]).toBeInTheDocument();

    })

    test('testing start and stop', async() => {
        render(<AppProvider><App/></AppProvider>)
        jest.useFakeTimers()
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        act(() => {
            jest.advanceTimersByTime(1000);
          });
        
        expect((screen.getByText('Stop'))).toBeInTheDocument();
        
        fireEvent.click(startButton);
        
        await waitFor(() => {
            // Current time should be 1 second.
            expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:01/);
            // Total time should be 1 second.
            expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:01/);
          });
        expect((screen.getByText('Start'))).toBeInTheDocument();
    })

    test('testing reset', async() => {
        render(<AppProvider><App/></AppProvider>)
        jest.useFakeTimers()
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        act(() => {
            jest.advanceTimersByTime(1000);
          });
        
        expect((screen.getByText('Stop'))).toBeInTheDocument();

        await waitFor(() => {
            // Current time should be 1 second.
            expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:01/);
            // Total time should be 1 second.
            expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:01/);
          });
        
        fireEvent.click(screen.getByText('Reset'));
        
        await waitFor(() => {
            // Current time should be reset to 0 seconds.
            expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:00/);
            // Total time should be reset to 0 seconds.
            expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:00/);
          });
        expect((screen.getByText('Start'))).toBeInTheDocument();
       
    })

    test('testing lap', async() => {
        render(<AppProvider><App/></AppProvider>)
        jest.useFakeTimers()
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        act(() => {
            jest.advanceTimersByTime(1000);
          });
        
        expect((screen.getByText('Stop'))).toBeInTheDocument();

        await waitFor(() => {
            // Current time should be 1 second.
            expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:01/);
            // Total time should be 1 second.
            expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:01/);
          });
        
        fireEvent.click(screen.getByText('Lap'));

        act(() => {
            jest.advanceTimersByTime(1000);
          });
        
        await waitFor(() => {
            // Current time should be reset to 0 seconds.
            expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:01/);
            // Total time should be 2 seconds.
            expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:02/);

            // To check that the correct lap number was recorded.
            const rowHeaderOne = screen.getByRole("rowheader", { name: /Lap 1/i })
            expect(rowHeaderOne).toBeInTheDocument()

            // Checks that the lap times were correctly recorded for Lap 1. 
            // Both the total and current lap time will be 1 second.
            const cellOne = screen.getAllByRole("cell", { name: /00:00:01/i })
            expect(cellOne.some(cell => cell.textContent === '00:00:01')).toBe(true)
          });


        fireEvent.click(screen.getByText('Lap'));

        await waitFor(() => {
            // Current time should be reset to 0 seconds.
            expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:00/);
            // Total time should be 2 seconds (since he fake timer did not increment).
            expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:02/);

            // To check that the correct lap number was recorded.
            const rowHeaderTwo = screen.getByRole("rowheader", { name: /Lap 2/i })
            expect(rowHeaderTwo).toBeInTheDocument()

            // Checks that the lap times were correctly recorded for Lap 1. 
            // The recorded current lap time will be 1 second and total lap time will be 2 seconds.
            const checkCells = screen.getAllByRole("cell", { name: /00:00:01/i })
            expect(checkCells.some(cell => cell.textContent === '00:00:01')).toBe(true)

            const checkCellTwo = screen.getAllByRole("cell", { name: /00:00:02/i })
            expect(checkCellTwo.some(cell => cell.textContent === '00:00:02')).toBe(true)
          });

        expect((screen.getByText('Stop'))).toBeInTheDocument();

        // Laps will not be recorded once stop is pressed.
        fireEvent.click(screen.getByText('Stop'));

    })

    test('testing switch between lap display and analog time display on button click', () => {
        render(<AppProvider><App/></AppProvider>)

        // Initially the lap times display is rendered.
        expect(screen.getByText("Current Lap Time")).toBeInTheDocument()
        
        fireEvent.click(screen.getByText('Show Live Clock'));

        // Checks if the analog display was rendered.
        expect(screen.getByText("Show Lap Times")).toBeInTheDocument()
        expect(screen.getByTestId("curr-second-hand")).toBeInTheDocument()

    })

    test('testing rotation of analog clock hands', async() => {
        render(<AppProvider><App/></AppProvider>)

        fireEvent.click(screen.getByText('Show Live Clock'))

        const currSecondHand = screen.getByTestId('curr-second-hand');
        const totalSecondHand = screen.getByTestId('total-second-hand');

        expect(currSecondHand).toHaveStyle('transform: rotateZ(0deg)');
        expect(totalSecondHand).toHaveStyle('transform: rotateZ(0deg)');

        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        act(() => {
            jest.advanceTimersByTime(1000);
            
          });
        
        await waitFor(() => {
            expect(currSecondHand).toHaveStyle('transform: rotateZ(6deg)');
            expect(totalSecondHand).toHaveStyle('transform: rotateZ(6deg)');
        })

        act(() => {
            jest.advanceTimersByTime(1000);
            
          });
        
        await waitFor(() => {
            expect(currSecondHand).toHaveStyle('transform: rotateZ(12deg)');
            expect(totalSecondHand).toHaveStyle('transform: rotateZ(12deg)');
        })

        fireEvent.click(screen.getByText('Lap'));
        act(() => {
            jest.advanceTimersByTime(1000);
            
          });
        
        // There is a 1 second lag during lap, so 1 second (6 degrees) is automatically added when lap is clicked.
        await waitFor(() => {
            expect(currSecondHand).toHaveStyle('transform: rotateZ(6deg)');
            expect(totalSecondHand).toHaveStyle('transform: rotateZ(18deg)');
        })

        fireEvent.click(screen.getByText('Stop'));

        fireEvent.click(screen.getByText('Reset'));
        expect(currSecondHand).toHaveStyle('transform: rotateZ(0deg)');
        expect(totalSecondHand).toHaveStyle('transform: rotateZ(0deg)');
    })

})
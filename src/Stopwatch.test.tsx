import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import App from './App';
// import './style.css'



describe('StopWatch Component', () => {

    // Test to check if all components correctly render on the document
    test("renders all components on the document", () => {
        render(<App />);
        expect(screen.getByText('00:00.00')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Stop')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Lap')).toBeInTheDocument();
    });

    // Test to check if the StopWatch component correctly renders time
    test("renders time correctly in StopWatch component", () => {
        render(<StopWatch time={5} />);
        expect(screen.getByText('00:05.00')).toBeInTheDocument();
    });

    // Test to check if start, stop buttons, and timer work correctly
    test("start, stop buttons, and timer work", async () => {
        render(<App />);
        const startButton = screen.getByText('Start');
        const stopButton = screen.getByText('Stop');
        expect(startButton).toBeInTheDocument();
        expect(stopButton).toBeInTheDocument();
        const watchScreen = screen.getByText('00:00.00');
        fireEvent.click(startButton);

        await waitFor(() => {
            const currentTime = watchScreen.textContent;
            expect(currentTime).toMatch(/00:0[1-2]\.[5-9][0-9]|00:02\.[0-5][0-9]/);
        }, { timeout: 2000 });
        fireEvent.click(stopButton);
    });

    // Test to check if the reset button resets the stopwatch
    test('reset button resets the stopwatch', async () => {
        render(<App />);
        const startButton = screen.getByText('Start');
        const resetButton = screen.getByText('Reset');
        fireEvent.click(startButton);
        await waitFor(() => { }, { timeout: 2000 });
        fireEvent.click(resetButton);
        const stopwatchDisplay = screen.getByText('00:00.00');
        expect(stopwatchDisplay).toBeInTheDocument();
    });

    // Test to check if lap button adds elements to the lap list
    test('lap button adds elements to the lap list', async () => {
        render(<App />);
        const startButton = screen.getByText('Start');
        const lapButton = screen.getByText('Lap');
        fireEvent.click(startButton);
        await waitFor(() => { }, { timeout: 2000 });
        fireEvent.click(lapButton);
        const lapItems = screen.getAllByRole('listitem');
        expect(lapItems.length).toEqual(1);
        fireEvent.click(lapButton);

        const updatedLapItems = screen.getAllByRole('listitem');
        expect(updatedLapItems.length).toEqual(2);
    });
});



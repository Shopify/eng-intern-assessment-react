import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { formatTime } from './StopWatch';

/**
 * A helper function to check if the time counter is changing by checking the time counter every 100ms for 5 iterations
 * @returns true if the time counter is changing, false otherwise
 */
const timeIsChanging = async () => {
    let previousTime = screen.getByTestId('stopwatch-display').textContent;
    let iterations = 0;
    while (iterations < 5) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const currentTime = screen.getByTestId('stopwatch-display').textContent;
        if (currentTime !== previousTime) {
            previousTime = currentTime;
        } else {
            return false;
        }
        iterations++;
    }
    return true;
}

describe('App', () => {
    test('renders the app correctly', () => {
        render(<App />);
        
        // Assert that the app renders the stopwatch component
        expect(screen.getByTestId('stopwatch')).toBeTruthy();

        const stopwatchButtonIDs = [
            "stopwatch-startstop",
            "stopwatch-lap",
            "stopwatch-reset",
        ];

        // Assert that all buttons are rendered and clickable
        stopwatchButtonIDs.forEach((id) => {
            expect(screen.getByTestId(id)).toBeTruthy();
        });
    });

    test('clicking the stop/start button toggles the running state', async () => {
        render(<App />);
        const stopStartButton = screen.getByTestId('stopwatch-startstop');

        // Assert that the time counter is changing after clicking the button
        expect(stopStartButton.textContent).toBe('Start');
        await act(async () => {
            fireEvent.click(stopStartButton);
        });

        // We have to wait for state to update before we can check the time counter
        await waitFor(async () => {
            expect(await timeIsChanging()).toBeTruthy();

            // Assert that the time counter is not changing after clicking the button again
            expect(stopStartButton.textContent).toBe('Stop');
            await act(async () => {
                fireEvent.click(stopStartButton);
            });
            expect(await timeIsChanging()).toBeFalsy();
            expect(stopStartButton.textContent).toBe('Start');
        })
    });
});

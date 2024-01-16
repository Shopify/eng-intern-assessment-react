import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

const initialTimeDisplay = "00:00.00";

// testing all components together (dependencies)
describe('<App/>', () => {
    test('should render display stopwatch and initial buttons', () => {
        const { getByTestId } = render(<App />);

        const stopWatchHeaderTitle = getByTestId('stopwatch-header');
        const stopWatchTimeDisplay = getByTestId('stopwatch-time-display');
        const stopWatchStartButton = getByTestId('stopwatch-button-Start');
        const stopWatchResetButton = getByTestId('stopwatch-button-Reset');


        expect(stopWatchHeaderTitle).toHaveTextContent('Stopwatch');
        expect(stopWatchTimeDisplay).toHaveTextContent(initialTimeDisplay);
        expect(stopWatchStartButton).toHaveTextContent('Start');
        expect(stopWatchResetButton).toHaveTextContent('Reset');
    });


    test('should update time display after running', async () => {
        const { getByTestId } = render(<App />);

        const startButton = getByTestId('stopwatch-button-Start')
        fireEvent.click(startButton);

        // 2 second wait
        await waitFor(() => {
            const stopWatchTimeDisplay = getByTestId('stopwatch-time-display');
            expect(stopWatchTimeDisplay.textContent).not.toBe('00:00.00');
        }, { timeout: 2100 });
    });

    test('should not display laps table given on initial state', () => {
        const { queryByTestId } = render(<App />);

        const stopWatchLapsContainer = queryByTestId('laps-table-container');

        expect(stopWatchLapsContainer).toBeNull()
    });

    test('should render correct buttons when Start button is clicked', () => {
        const { getByTestId, queryByTestId } = render(<App />);

        const startButtonBeforeClick = getByTestId('stopwatch-button-Start');
        const stopButtonBeforeClick = queryByTestId('stopwatch-button-Stop');
        const lapButtonBeforeClick= queryByTestId('stopwatch-button-Lap');

        expect(stopButtonBeforeClick).toBeNull()
        expect(lapButtonBeforeClick).toBeNull()

        fireEvent.click(startButtonBeforeClick);

        const stopButtonAfterClick = queryByTestId('stopwatch-button-Stop');
        const lapButtonAfterClick= queryByTestId('stopwatch-button-Lap');
        const startButtonAfterClick = queryByTestId('stopwatch-button-Start')

        expect(stopButtonAfterClick).toBeInTheDocument()
        expect(lapButtonAfterClick).toBeInTheDocument()
        expect(startButtonAfterClick).toBeNull()
    });

    test('should stop the stopwatch after Stop button is clicked', () => {
        const { getByTestId, queryByTestId } = render(<App />);

        const startWatchStartButton = getByTestId('stopwatch-button-Start');

        fireEvent.click(startWatchStartButton);

        const stopButtonAfterStart = getByTestId('stopwatch-button-Stop');
        const startButtonAfterStart = queryByTestId('stopwatch-button-Start')

        expect(stopButtonAfterStart).toBeInTheDocument()
        expect(startButtonAfterStart).toBeNull()

        fireEvent.click(stopButtonAfterStart);

        const stopButtonAfterStop = queryByTestId('stopwatch-button-Stop');
        const startButtonAfterStop = queryByTestId('stopwatch-button-Start')

        expect(stopButtonAfterStop).toBeNull()
        expect(startButtonAfterStop).toBeInTheDocument()
    });

    test('should reset display time and laps after reset is clicked', () => {
        const { getByTestId, queryByTestId, queryAllByTestId } = render(<App />);

        const startWatchStartButton = getByTestId('stopwatch-button-Start');

        fireEvent.click(startWatchStartButton);

        const stopButton = getByTestId('stopwatch-button-Stop');
        const lapButton = getByTestId('stopwatch-button-Lap');

        fireEvent.click(stopButton);
        fireEvent.click(lapButton);

        const resetButton = getByTestId('stopwatch-button-Reset');

        expect(resetButton).toBeInTheDocument()
        fireEvent.click(resetButton);

        const stopWatchTimeDisplay = getByTestId('stopwatch-time-display');
        expect(stopWatchTimeDisplay).toHaveTextContent(initialTimeDisplay);
    });

    test('should render laps when laps is clicked a number of times', () => {
        const lapClicks = 5;
        const { getByTestId, queryAllByTestId } = render(<App />);

        const startButton = getByTestId('stopwatch-button-Start');

        fireEvent.click(startButton);

        const lapButton = getByTestId('stopwatch-button-Lap');

        for (let i = 0; i < lapClicks; i++) {
            fireEvent.click(lapButton);
        }

        const laps = queryAllByTestId((content, element) =>
            element.getAttribute('data-testid')?.startsWith('lap-')
        );
        expect(laps.length).toBe(lapClicks);
    });
});

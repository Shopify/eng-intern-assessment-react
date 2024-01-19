import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import StopWatch from '../src/StopWatch';

describe('StopWatch', () => {
    test('renders initial state', () => {
        render(<StopWatch/>)

        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });

    test('start/stop stopwatch', () => {
        render(<StopWatch/>)
        // start stopwatch
        fireEvent.click(screen.getByText('Start'));
        setTimeout(() => {
            // once stopwatch has started check for correct buttons (button labels should be lap and stop)
            expect(screen.getByText('Lap')).toBeInTheDocument();
            expect(screen.getByText('Stop')).toBeInTheDocument();
            fireEvent.click(screen.getByText('Stop')); // pause the stopwatch after 5 seconds
            expect(screen.getByText('00:05:00')); 
        }, 5000)

        // wait another second to make sure the watch has successfully stopped
        setTimeout(() => {
            expect(screen.getByText('00:05:00'));
        }, 1000)
    });

    test('pause/resume stopwatch', () => {
        render(<StopWatch/>)

        // start stopwatch
        fireEvent.click(screen.getByText('Start'));

        // once stopwatch has started check for correct button labels (should be lap and stop)
        expect(screen.getByText('Lap')).toBeInTheDocument();
        expect(screen.getByText('Stop')).toBeInTheDocument();

        // pause the stopwatch after 5 seconds
        setTimeout(() => {
            fireEvent.click(screen.getByText('Stop'));
            // stopwatch should display 5 seconds
            const stopwatchElement = screen.getByTestId('stopwatch');
            expect(stopwatchElement.textContent).toBe('00:05:00'); 
            // button labels should go back to the initial state
            expect(screen.getByText('Start')).toBeInTheDocument();
            expect(screen.getByText('Reset')).toBeInTheDocument();
            // lap 1 should display with the time displayed by stopwatch
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap 1:')
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:05:00');
        }, 5000)

        // wait another second to make sure the watch has successfully stopped and nothing has changed
        setTimeout(() => {
            const stopwatchElement = screen.getByTestId('stopwatch');
            expect(stopwatchElement.textContent).toBe('00:05:00');
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap 1:')
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:05:00');
        }, 1000)

        // resume stopwatch 
        setTimeout(() => {
            fireEvent.click(screen.getByText('Start'))
        }, 1000)

        // pause stopwatch after another 5 seconds
        setTimeout(() => {
            fireEvent.click(screen.getByText('Stop'));
            // stopwatch and lap 1 should display 10 seconds
            const stopwatchElement = screen.getByTestId('stopwatch');
            expect(stopwatchElement.textContent).toBe('00:10:00');
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap: 1');
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:10:00');
        }, 5000);

        // wait another second to make sure the watch has successfully paused and nothing has changed
        setTimeout(() => {
            const stopwatchElement = screen.getByTestId('stopwatch');
            expect(stopwatchElement.textContent).toBe('00:10:00');
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap 1:')
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:10:00');
        }, 1000)        
    });

    test('record and display laps', () => {
        render(<StopWatch/>)
        
        // start stopwatch
        fireEvent.click(screen.getByText('Start'));

        // record lap 1 after 5 seconds
        setTimeout(() => {
            fireEvent.click(screen.getByText('Lap'));
        }, 5000)

        // pause stopwatch after another second
        setTimeout(() => {
            fireEvent.click(screen.getByText('Stop'));
            // check if lap 1 displays 5 seconds
            const lapNumberOneElement = screen.getByTestId('lap-number-1');
            expect(lapNumberOneElement.textContent).toBe('Lap 1:');
            const lapTimeOneElement = screen.getByTestId('lap-time-1');
            expect(lapTimeOneElement.textContent).toBe('0:05:00');
            // check if lap 2 (current) is displaying current lap time
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap 2:')
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:01:00');
        }, 1000);

        // resume stopwatch after another second
        setTimeout(() => {
            fireEvent.click(screen.getByText('Start'));
        }, 1000);

        // record lap 2 after 1 second
        setTimeout(() => {
            fireEvent.click(screen.getByText('Lap'));
        }, 1000);

        // pause stopwatch after another second
        setTimeout(() => {
            fireEvent.click(screen.getByText('Stop'));
            // check if lap 2 displays 1 second
            const lapNumberTwoElement = screen.getByTestId('lap-number-2');
            expect(lapNumberTwoElement.textContent).toBe('Lap 2:');
            const lapTimeTwoElement = screen.getByTestId('lap-time-2');
            expect(lapTimeTwoElement.textContent).toBe('0:01:00');
            // check if lap 3 (current) is displaying current lap time
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap 3:');
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:01:00');
        }, 1000);

        // resume stopwatch after another second
        setTimeout(() => {
            fireEvent.click(screen.getByText('Start'));
        }, 1000);

        // record lap 3 after 3 seconds
        setTimeout(() => {
            fireEvent.click(screen.getByText('Lap'));
        }, 3000);

        // pause stopwatch after another second
        setTimeout(() => {
            fireEvent.click(screen.getByText('Stop'));
            // check if lap 3 displays 3 seconds
            const lapNumberThreeElement = screen.getByTestId('lap-number-3');
            expect(lapNumberThreeElement.textContent).toBe('Lap 3:');
            const lapTimeThreeElement = screen.getByTestId('lap-time-3');
            expect(lapTimeThreeElement.textContent).toBe('0:03:00');
            // check if lap 2 is shortest
            const shortestLapNumber = screen.getByTestId('lap-number-2-shortest');
            expect(shortestLapNumber.textContent).toBe('Lap 2:');
            const shortestLapTime = screen.getByTestId('lap-time-2-shortest');
            expect(shortestLapTime.textContent).toBe('00:01:00');
            // check if lap 1 is longest
            const longestLapNumber = screen.getByTestId('lap-number-1-longest');
            expect(longestLapNumber.textContent).toBe('Lap 1:');
            const longestLapTime = screen.getByTestId('lap-time-1-longest');
            expect(longestLapTime.textContent).toBe('00:05:00');
            // check if lap 4 (current) is displaying current lap time
            const currentLapNumberElement = screen.getByTestId('current-lap-number');
            expect(currentLapNumberElement.textContent).toBe('Lap 4:');
            const currentLapTimeElement = screen.getByTestId('current-lap-time');
            expect(currentLapTimeElement.textContent).toBe('00:01:00');
        }, 1000);
    });

    test('reset stopwatch', () => {
        render(<StopWatch/>)
        
        // start stopwatch
        fireEvent.click(screen.getByText('Start'));

        // record 2 laps, one at 1 second and another at 2 seconds
        setTimeout(() => {
            fireEvent.click(screen.getByText('Lap'));
        }, 1000);

        setTimeout(() => {
            fireEvent.click(screen.getByText('Lap'));
        }, 2000);

        // pause stopwatch after another second and reset
        setTimeout(() => {
            fireEvent.click(screen.getByText('Stop'));
            fireEvent.click(screen.getByText('Reset'));
            // check if stopwatch has returned to initial state
            const stopwatchElement = screen.getByTestId('stopwatch');
            expect(stopwatchElement.textContent).toBe('00:00:00');
            expect(screen.getByText('Start'));
            expect(screen.getByText('Reset'));
            const currentLapElement = screen.getByText('Lap 1:');
            expect(currentLapElement).toBeNull();
        }, 1000)
    });
});
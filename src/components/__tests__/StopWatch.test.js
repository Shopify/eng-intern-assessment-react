import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, within } from '@testing-library/react'; // Import within

import Stopwatch from '../StopWatch';

describe('Stopwatch component', () => {
    test('renders time correctly with initial time', () => {
        const time = 0;
        const laps = [];

        render(<Stopwatch time={time} laps={laps} />);

        const stopwatchElement = screen.getByText('00:00:00.00');
        expect(stopwatchElement).toBeInTheDocument();
    });

    test('renders time correctly with non-zero initial time', () => {
        const time = 60000; // 1 minute in milliseconds
        const laps = [];

        render(<Stopwatch time={time} laps={laps} />);

        const stopwatchElement = screen.getByText('00:01:00.00');
        expect(stopwatchElement).toBeInTheDocument();
    });

    test('renders lap times correctly', () => {
        const laps = [3000, 6000, 9000]; // Lap times in milliseconds
        const time = 0; // Initial time in milliseconds

        render(<Stopwatch time={time} laps={laps} />);

        laps.forEach((lapTime, index) => {
            const lapTimeFormatted = new Date(lapTime).toISOString().substr(11, 8);
            const expectedText = `Lap ${index + 1}: ${lapTimeFormatted}`;

            // Query the lap item by its index and class name
            const lapItem = screen.getByTestId('laps-list').querySelector(`.lap-item:nth-child(${index + 1})`);

            // Query the lap number and lap time elements within the lap item using within
            const lapNumberElement = within(lapItem).getByText(/Lap \d+/);
            const lapTimeElement = within(lapItem).getByText(/\d{2}:\d{2}:\d{2}\.\d{2}/);

            // Assert that lap number and lap time elements contain the expected content
            expect(lapNumberElement).toHaveTextContent(`Lap ${index + 1}`);
            expect(lapTimeElement).toHaveTextContent(lapTimeFormatted);
        });
    });
});
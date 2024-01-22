/**
 * @jest-environment jsdom
 */

import React from 'react';
import StopWatch, { formatTime } from './StopWatch'
import './StopWatchInterface'
import { WatchContext } from './WatchContext';
import { render, screen } from '@testing-library/react';

describe('formatTime', () => {
    it('formats milliseconds into HH:MM:SS.mmm', () => {
        expect(formatTime(0)).toBe('00:00:00.000');
        expect(formatTime(987)).toBe('00:00:00.987');
        expect(formatTime(65000)).toBe('00:01:05.000'); // 1 minute and 5 seconds
        expect(formatTime(3661000)).toBe('01:01:01.000'); // 1 hour, 1 minute, and 1 second
    });
});

describe('StopWatch Lap Times', () => {
    it('displays all lap times correctly', () => {
        // Mock data for the laps
        const mockLaps = [
            { elapsedTime: 10000 }, // 10 seconds
            { elapsedTime: 20000 }, // 20 seconds
            { elapsedTime: 30000 }  // 30 seconds
        ];

        // Mocking the context value
        const contextValue: ContextType = {
            elapsedTime: 0,
            laps: mockLaps,
            slowestLap: null,
            fastestLap: null,
            isRunning: false,
            handleStart: function (): void {
                throw new Error('Function not implemented.');
            },
            handleStop: function (): void {
                throw new Error('Function not implemented.');
            },
            handleLap: function (): void {
                throw new Error('Function not implemented.');
            },
            handleReset: function (): void {
                throw new Error('Function not implemented.');
            }
        };

        // Render the component with the mocked context
        render(
            <WatchContext.Provider value={contextValue}>
                <StopWatch />
            </WatchContext.Provider>
        );

        // Check if all lap times are displayed
        expect(screen.getAllByText('00:00:10.000')).toHaveLength(1); // 10 seconds formatted
        expect(screen.getAllByText('00:00:20.000')).toHaveLength(1); // 20 seconds formatted
        expect(screen.getAllByText('00:00:30.000')).toHaveLength(1); // 30 seconds formatted
    });
});

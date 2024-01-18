import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatchButton from '../src/StopWatchButton';

const mockFn = jest.fn();

describe('StopwatchButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('correctly renders the StopWatchButton and correctly reacts on click', () => {
        render(<StopWatchButton isRunning={false} title="Test" onClick={mockFn} />);

        expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();
        for (let i = 0; i < 5; i++) {
            fireEvent.click(screen.getByRole('button', { name: 'Test' }));
        }
        expect(mockFn).toHaveBeenCalledTimes(5);
    });

    it('should dynamically render the text of the StopWatchButton correctly', () => {
        render(
            <StopWatchButton
                isRunning={true}
                title="Test"
                secondaryTitle="Secondary"
                onClick={mockFn}
            />
        );

        expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
    });
});

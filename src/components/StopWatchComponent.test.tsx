import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { formatTime } from '../utils/stopWatchUtils';

jest.mock('../utils/stopWatchUtils');

describe('StopWatch', () => {
    it('renders time and laps correctly', () => {
        const { getByText } = render(<StopWatch time={0} laps={[30, 60, 90]} />);
        expect(formatTime).toHaveBeenCalledWith(0);
        expect(getByText(/Lap 1:/)).not.toBeNull();
        expect(getByText(/Lap 2:/)).not.toBeNull();
        expect(getByText(/Lap 3:/)).not.toBeNull();
    });
});

describe('StopWatchButton', () => {
    it('renders all buttons correctly', () => {
        const { getByText } = render(<StopWatchButton onStart={() => {}} onStop={() => {}} onReset={() => {}} onLap={() => {}} />);
        expect(getByText('Start')).not.toBeNull();
        expect(getByText('Stop')).not.toBeNull();
        expect(getByText('Reset')).not.toBeNull();
        expect(getByText('Lap')).not.toBeNull();
    });

    it('calls onStart when Start button is clicked', () => {
        const mockOnStart = jest.fn();
        const { getByText } = render(<StopWatchButton onStart={mockOnStart} onStop={() => {}} onReset={() => {}} onLap={() => {}} />);
        fireEvent.click(getByText('Start'));
        expect(mockOnStart).toHaveBeenCalled();
    });
});
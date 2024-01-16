import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import StopWatchButton from '../StopWatchButton';

describe('StopWatchButton', () => {

    test('start button renders when not running', () => {
        render(<StopWatchButton onStartStopClick={() => {}} onResetLapClick={() => {}} isRunning={false} />);
        const startButton = screen.getByText('Start');
        expect(startButton).toBeInTheDocument();
    });

    test('stop button renders when not running', () => {
        render(<StopWatchButton onStartStopClick={() => {}} onResetLapClick={() => {}} isRunning={true} />);
        const stopButton = screen.getByText('Stop');
        expect(stopButton).toBeInTheDocument();
    });

    test('reset button renders when not running', () => {
        render(<StopWatchButton onStartStopClick={() => {}} onResetLapClick={() => {}} isRunning={false} />);
        const resetButton = screen.getByText('Reset');
        expect(resetButton).toBeInTheDocument();
    });

    test('lap button renders when not running', () => {
        render(<StopWatchButton onStartStopClick={() => {}} onResetLapClick={() => {}} isRunning={true} />);
        const lapButton = screen.getByText('Lap');
        expect(lapButton).toBeInTheDocument();
    });

    test('calls onStartStopClick when Start/Stop button is clicked', () => {
        const onStartStopClickMock = jest.fn();
        render(<StopWatchButton onStartStopClick={onStartStopClickMock} onResetLapClick={() => {}} isRunning={false} />);
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        expect(onStartStopClickMock).toHaveBeenCalledTimes(1);
    });

    test('calls onResetLapClick when Reset/Lap button is clicked', () => {
        const onResetLapClickMock = jest.fn();
        render(<StopWatchButton onStartStopClick={() => {}} onResetLapClick={onResetLapClickMock} isRunning={false} />);
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        expect(onResetLapClickMock).toHaveBeenCalledTimes(1);
    });
});

import '@testing-library/jest-dom/'
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useStopWatch } from '../hooks/useStopWatch';
import {StopWatchButtonGroup}  from './StopWatchButtonGroup'; // Adjust the import path as needed.

describe('StopWatchButtonGroupProps Component', () => {
    const mockActions = {
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
        lap: jest.fn(),
    };

    it('renders correctly with required props', () => {
        render(<StopWatchButtonGroup darkTheme actions={mockActions} running={false} />);
        // Assertions to check if the component renders correctly
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Lap')).toBeInTheDocument();
    });

    it('Start button changes to stop when running', () => {
        render(<StopWatchButtonGroup darkTheme actions={mockActions} running={true} />);

        // Assertions to check if the component renders correctly
        expect(screen.getByText('Stop')).toBeInTheDocument();
    });
    it('Stop button changes to start button when not running', () => {
        render(<StopWatchButtonGroup darkTheme actions={mockActions} running={false} />);

        // Assertions to check if the component renders correctly
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    it('calls the correct action handlers', () => {
        render(<StopWatchButtonGroup darkTheme actions={mockActions} running={false} />);

        fireEvent.click(screen.getByText('Start'));
        expect(mockActions.start).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Reset'));
        expect(mockActions.reset).toHaveBeenCalled();

        fireEvent.click(screen.getByText('Lap'));
        expect(mockActions.lap).toHaveBeenCalled();
    });

    it('applies custom styles', () => {
        const customStyles = { backgroundColor: 'blue' };
        render(<StopWatchButtonGroup darkTheme actions={mockActions} running={false} startButtonStyles={customStyles} />);

        const startButton = screen.getByText('Start');
        expect(startButton).toHaveStyle('backgroundColor: blue');
    });
});
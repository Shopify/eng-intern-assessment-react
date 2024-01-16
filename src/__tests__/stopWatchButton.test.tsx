import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';

const mockOnClick = jest.fn()

// testing the StopWatchButton component (on click functionality and type detection)
describe('<StopWatchButton/>', () => {
    test('should render button type Stop and call input function on click', () => {
        const { getByTestId } = render(<StopWatchButton  type="Stop" onClick={mockOnClick}/>);
        const stopButton = getByTestId('stopwatch-button-Stop');
        fireEvent.click(stopButton);
        expect(mockOnClick).toBeCalled();
    });
    test('should render button type Start and call input function on click', () => {
        const { getByTestId } = render(<StopWatchButton  type="Start" onClick={mockOnClick}/>);
        const startButton = getByTestId('stopwatch-button-Start');
        fireEvent.click(startButton);
        expect(mockOnClick).toBeCalled();
    });
    test('should render button type Reset and call input function on click', () => {
        const { getByTestId } = render(<StopWatchButton  type="Reset" onClick={mockOnClick}/>);
        const resetButton = getByTestId('stopwatch-button-Reset');
        fireEvent.click(resetButton);
        expect(mockOnClick).toBeCalled();
    });
    test('should render button type Lap and call input function on click', () => {
        const { getByTestId } = render(<StopWatchButton  type="Lap" onClick={mockOnClick}/>);
        const lapButton = getByTestId('stopwatch-button-Lap');
        fireEvent.click(lapButton);
        expect(mockOnClick).toBeCalled();
    });

});

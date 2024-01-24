import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';


const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
    ...dom.window.navigator,
    userAgent: 'node.js',
};
jest.useFakeTimers();
describe('StopWatchButton', () => {
    test('renders without crashing', () => {
        render(<StopWatchButton />);
    });

    test('use jsdom in this test file', () => {
        const element = document.createElement('div');
        expect(element).not.toBeNull();
    });

    test('clicking start button updates lap counter', () => {
        render(<StopWatchButton />);
        const startButton = screen.getByTestId('start-button1');
        fireEvent.click(startButton);
        expect(screen.getByText("Lap 1")).toBeInTheDocument();
    });

    test('clicking stop button maintains lap time', () => {
        render(<StopWatchButton />);
        const startButton = screen.getByTestId('start-button1');
        const stopButton = screen.getByTestId('stop-button1');
        fireEvent.click(startButton);
        fireEvent.click(stopButton);
        const elapsedTimeAfterStop = screen.getByText("Lap 1:").textContent;
        jest.advanceTimersByTime(500);
        expect(screen.getByText("Lap 1").textContent).toEqual(elapsedTimeAfterStop);
    });

    test('clicking reset button resets stopwatch', () => {
        render(<StopWatchButton />);
        const startButton = screen.getByTestId('start-button1');
        const resetButton = screen.getByTestId('reset-button1');
        fireEvent.click(startButton);
        jest.advanceTimersByTime(1000); 
        fireEvent.click(resetButton);
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });


    test('lap items are displayed in the correct format', () => {
        render(<StopWatchButton />);
        const startButton = screen.getByTestId('start-button1');
        const lapButton = screen.getByTestId('lap-button1');
        fireEvent.click(startButton);
        fireEvent.click(lapButton);
        expect(screen.getByText(/^Lap \d: \d{2}:\d{2}:\d{2}$/)).toBeInTheDocument();
    });
});
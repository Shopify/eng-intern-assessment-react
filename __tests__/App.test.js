/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

function convertTime(s) {
    let tempArr = s.split(':')
    const minute = tempArr[0]
    const second = tempArr[1].split('.')[0]
    const millisecond = tempArr[1].split('.')[1]

    return (minute * 60000) + (second * 1000) + (millisecond * 10);
}
describe('Stopwatch test', () => {

    jest.useFakeTimers();
    test('initial render', () => {
        render(<App />);

        expect(screen.getByText('00:00.00')).toBeInTheDocument();
        expect(screen.getByText('Start', {selector: 'button'})).toBeInTheDocument();
        expect(screen.getByText('Reset', {selector: 'button'})).toBeInTheDocument();
        expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
    })

    test('start button should change to stop button after being pressed, and reset button should change to lap button', () => {
        render (<App />);
        fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        expect(screen.getByText('Stop', {selector: 'button'})).toBeInTheDocument();
        expect(screen.queryByText('Start', {selector: 'button'})).not.toBeInTheDocument();

        expect(screen.getByText('Lap', {selector: 'button'})).toBeInTheDocument();
        expect(screen.queryByText('Reset', {selector: 'button'})).not.toBeInTheDocument();
    })

    test('stop button should change to start button after being pressed, and lap button should change back to reset button', () => {
        render (<App />);
        fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        fireEvent.click(screen.getByText('Stop', {selector: 'button'}));
        expect(screen.getByText('Start', {selector: 'button'})).toBeInTheDocument();
        expect(screen.queryByText('Stop', {selector: 'button'})).not.toBeInTheDocument();

        expect(screen.getByText('Reset', {selector: 'button'})).toBeInTheDocument();
        expect(screen.queryByText('Lap', {selector: 'button'})).not.toBeInTheDocument();
    })

    test('start and stop the stopwatch', async () => {
        render(<App />);

        let stopTime = 0

        await act(() => {
            fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        });

        await act(() => {
            jest.advanceTimersByTime(100);

        });
        fireEvent.click(screen.getByText('Stop', {selector: 'button'}));

        stopTime = convertTime(screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent);
            

        expect(stopTime).toBeGreaterThan(0);
    })

    test('pauses and resumes stopwatch', async () => {
        render(<App />);

        let stopTime = 0

        await act(() => { 
            fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        });
        await act (() => { 
            jest.advanceTimersByTime(100);
        });
        fireEvent.click(screen.getByText('Stop', {selector: 'button'}));
        stopTime = screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent;

        await act(() => { 
            fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        });
        await act (() => { 
            jest.advanceTimersByTime(100);
        });
        expect(screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent).not.toBe(stopTime);
    })

    test('displays lap times', async () => {
        render(<App />);

        fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        fireEvent.click(screen.getByText('Lap', {selector: 'button'}));
        expect(screen.getByTestId('lap-list')).toContainElement(screen.getByText(/\d{2}:\d{2}\.\d{2}$/, {selector: 'li'}));

        fireEvent.click(screen.getByText('Lap', {selector: 'button'}));
        expect(screen.getByTestId('lap-list').children.length).toBe(2);
    })

    test('reset button should reset the stopwatch to 0', async () => {
        render(<App />);

        await act(() => { 
            fireEvent.click(screen.getByText('Start', {selector: 'button'}));
        });
        
        await act (() => { 
            jest.advanceTimersByTime(100);
        });

        fireEvent.click(screen.getByText('Stop', {selector: 'button'}));
        fireEvent.click(screen.getByText('Reset', {selector: 'button'}));
        let stopTime = convertTime(screen.getByText(/^\d{2}:\d{2}\.\d{2}$/).textContent);

        expect(stopTime).toBe(0);
    })

})
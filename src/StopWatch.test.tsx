import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import StopWatch from './StopWatch';

describe('Tests the StopWatch', () => {
    it('renders the StopWatch', () => {
        const { getByText } = render(<StopWatch />);

        expect(getByText('Start')).toBeTruthy();
        expect(getByText('Lap')).toBeTruthy();
        expect(getByText('Reset')).toBeTruthy();
        expect(getByText('Lap Times')).toBeTruthy();
    });

    test('starts/stops the StopWatch', () => {
        jest.useFakeTimers()
        const setIntervalSpy = jest.spyOn(global, 'setInterval');
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        const { getByText } = render(<StopWatch />);
        
        expect(screen.getByText('0:00:00:00').textContent).toBeTruthy();

        fireEvent.click(getByText('Start'));
        expect(setIntervalSpy).toHaveBeenCalledTimes(1);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        fireEvent.click(getByText('Stop'));
        expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    });

    test('records lab times correctly', () => {
        jest.useFakeTimers()
        const { getByText, queryByText } = render(<StopWatch />);

        fireEvent.click(getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
    
        fireEvent.click(getByText('Lap'));
        expect(queryByText(/Lap 0:/)).toBeFalsy();
        expect(queryByText(/Lap 1:/)).toBeTruthy();
        expect(queryByText(/Lap 2:/)).toBeFalsy();
    });

    test('resets correctly', () => {
        jest.useFakeTimers()
        const { getByText, queryByText } = render(<StopWatch />);

        expect(getByText('0:00:00:00').textContent).toBeTruthy();
        fireEvent.click(getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(1000);
        });
    
        fireEvent.click(getByText('Lap'));
        expect(queryByText(/Lap 1:/)).toBeTruthy();
        expect(queryByText("0:00:00:00")).toBeFalsy();

        fireEvent.click(getByText('Reset'));
        expect(queryByText(/Lap 1:/)).toBeFalsy();
        expect(getByText('0:00:00:00').textContent).toBeTruthy();
    });
});

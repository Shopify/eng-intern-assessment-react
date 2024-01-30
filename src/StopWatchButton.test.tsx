import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

//Testing if the play button works
it('tests playButton ', () => {
    const setIsRunning = jest.fn();
    const setTimeInMilliseconds = jest.fn();
    let isRunning = false;

    const playButton = () => {
        if (isRunning) return;

        setIsRunning(true);
        isRunning = true;

        setInterval(() => {
            setTimeInMilliseconds((previousState:number) => previousState + 10);
        }, 10);
    }

    // Simulate a button click
    act(() => {
        playButton();
    });

    // Assert setIsRunning was called
    expect(setIsRunning).toHaveBeenCalledWith(true);

    // Fast-forward timers
    act(() => {
        jest.advanceTimersByTime(50);
    });

    // Assert setTimeInMilliseconds was called 5 times
    expect(setTimeInMilliseconds).toHaveBeenCalledTimes(5);
});


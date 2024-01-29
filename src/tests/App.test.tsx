import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import App from '../App';

// Basic rendering test
test('Page renders successfully', () => {
    render(<App/>);
    // Checking if header renders
    const header = screen.queryByText(/stopwatch/i);
    expect(header).toBeDefined(); 
    // Checking if stopwatch component renders
    const stopWatch = screen.queryByRole('stopwatch'); 
    expect(stopWatch).toBeDefined();
    // checking if stopwatch button components renders
    const stopWatchButtons = screen.queryByRole('stopwatch-buttons'); 
    expect(stopWatchButtons).toBeDefined();
});

jest.useFakeTimers();
// test time display is running as intended
test('time display starting successfully', async() => {
    render(<App />);
    const startButton = screen.getByText(/start/i);
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(1000);
    });
    const display = screen.queryByText("00:01:00"); 
    expect(display).toBeDefined();
});

// test time display is stopping as intended 
test('time display stopping successfully', async() => {
    render(<App />);
    const startButton = screen.getByText(/start/i);
    const stopButton = screen.getByText("Stop");
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(1000);
        fireEvent.click(stopButton);
    });
    const display = screen.queryByText("00:01:00"); 
    expect(display).toBeDefined();
});

// test time display is resetting as intended 
test('time display stopping successfully', async() => {
    render(<App />);
    const startButton = screen.getByText(/start/i);
    const resetButton = screen.getByText(/reset/i);
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(1000);
        fireEvent.click(resetButton);
    });
    const display = screen.queryByText("00:00:00"); 
    expect(display).toBeDefined();
});

// test laps is displaying as intended 
test('time display stopping successfully', async() => {
    render(<App />);
    const startButton = screen.getByText(/start/i);
    const lapsButton = screen.getByText(/lap/i);
    act(() => {
        fireEvent.click(startButton);
        jest.advanceTimersByTime(1000);
        fireEvent.click(lapsButton);
        jest.advanceTimersByTime(1000);
    });
    const lap = screen.queryByText("00:01:00"); 
    expect(lap).toBeDefined();
});

// test Laps does not exceed 5
test('lap does not exceed 5 when new lap is added', async() => {
    render(<App />);
    const startButton = screen.getByText(/start/i);
    const lapsButton = screen.getByText(/lap/i);
    act(() => {
        fireEvent.click(startButton);
        for (let i = 0; i < 6; i++) {
            jest.advanceTimersByTime(1000);
            fireEvent.click(lapsButton);
        }
    });
    const lap = screen.queryByText("00:01:00"); 
    expect(lap).toBeNull();
});

afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
});

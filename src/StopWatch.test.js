import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './StopWatch';


describe('Stopwatch', () => {
    beforeEach(() => {
        render(<StopWatch />);
    });

    // TEST 1 landing page display

    test('renders initial state correctly', () => {
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
        expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Lap')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
    });

    // TEST 2 Start and stop button functionality

    test('starts and stops the stopwatch', () => {
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        // the text changes to 'Stop' when the stopwatch starts
        expect(screen.getByText('Stop')).toBeInTheDocument();
        const stopButton = screen.getByText('Stop');
        fireEvent.click(stopButton);
        //  the text changes back to 'Start' when the stopwatch stops
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    // TEST 3  reset functionality

    test('reset functionality', () => {
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        // the text changes to 'Stop' when the stopwatch starts
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });

    // TEST 4 lap functionality

    test('lap button functionality', () => {
        //start button to reocrd a -- LAP LIST -- 
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        //click lap
        const lapButton = screen.getByText('Lap');
        //laps added to list
        // i equal one if i is lesser than or eqaul to 3, increment
        for(let i = 1; i <= 3; i++) {
            fireEvent.click(lapButton);
            const laps = screen.getAllByText(/Lap \d:/);
            expect(laps.length).toBe(i);
        }
        // expect 3 laps
        expect(screen.getAllByText(/Lap \d:/).length).toBe(3);
    })

    // TEST 5 display record -- LAP TIME --  

    test('display recorded lap time', () => {
    jest.useFakeTimers();
    //check button
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    // to simulate time passing
    jest.advanceTimersByTime(1000);
    const lapButton = screen.getByText('Lap');
    fireEvent.click(lapButton);
    // Check for the lap time
    const lapTime = screen.getByText(/Lap 1: \d\d:\d\d:\d\d/);
    expect(lapTime).toBeInTheDocument();
    jest.useRealTimers();
});
    
    
});

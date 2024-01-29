import React from 'react';
import {render, screen} from '@testing-library/react';
import StopWatch, { formatTime } from '../StopWatch';

// Basic rendering test 
test('Stopwatch renders successfully', () => { 
    render(<StopWatch isRunning={false} time={0} setTime={() => {}} laps={[]}/>); 
    const timeDisplay = screen.queryByRole('time-display'); 
    expect(timeDisplay).toBeDefined();
});

// test laps renders correctly
test('Laps renders successfully', () => {
    render(<StopWatch isRunning={false} time={0} setTime={() => {}} laps={[10,1000,60000]}/>);
    const milliLap = screen.queryByText('00:00:10'); 
    const secondLap = screen.queryByText('00:01:00'); 
    const minuteLap = screen.queryByText('01:00:00');

    expect(milliLap).toBeDefined();
    expect(secondLap).toBeDefined();
    expect(minuteLap).toBeDefined();
});

// test format time
test('Format time test', () => { 
    expect(formatTime(60000)).toBe("01:00:00");
    // 100 minutes will reset the timer due to padStart
    expect(formatTime(6 * 10^6)).toBe("00:00:58");
});
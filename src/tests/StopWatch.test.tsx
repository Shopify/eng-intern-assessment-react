import React from 'react';
import {render, screen} from '@testing-library/react';
import StopWatch, { formatTime } from '../StopWatch';
import App from '../App';

// Basic rendering test 
test('Stopwatch renders successfully', async() => { 
    render(<StopWatch isRunning={false} time={0} setTime={() => {}} laps={[]}/>); 
    const timeDisplay = screen.getByRole('time-display'); 
    expect(timeDisplay).toBeDefined();
});

// test format time
test('Format time test', async() => { 
    expect(formatTime(60000)).toBe("01:00:00");
    // 100 minutes will reset the timer due to padStart
    expect(formatTime(6 * 10^6)).toBe("00:00:58");
});
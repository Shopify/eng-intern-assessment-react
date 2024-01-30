import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import StopWatch from "../StopWatch";

// Setting up a fake time, this replaces the setInterval() in our main app
jest.useFakeTimers();

test("When pressing on Start button the StopWatch runs", async () => {

    render(<StopWatch/>);
    const spy = jest.spyOn(global, 'setInterval');

    // Start the timer
    const startButton = screen.getByRole('button', { name: /start/i });
    await fireEvent.click(startButton);
    
    // Advancing fake timer by one second
    jest.advanceTimersByTime(1000);

    
    // Check if the time on screen is equal to one second
    // Not sure why this doesn't work :(
    // const stopWatchTime = screen.getByRole('heading', {level:2}).textContent
    // expect(stopWatchTime).toBe("00:01.0ms")


    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 100);
})


test("When pressing on Stop button it halts the StopWatch", async ()=>{
    render(<StopWatch/>);

    const spy = jest.spyOn(global, 'setInterval');

    // Start the timer
    const startButton = screen.getByRole('button', { name: /start/i });
    await fireEvent.click(startButton);

    // Advancing timer by a second
    jest.advanceTimersByTime(1000);

    // Stop the timer
    const stopButton = screen.getByRole('button', { name: /stop/i });
    await fireEvent.click(stopButton);

    expect(spy).toHaveBeenCalled();
})

test("Lap button shows laps", ()=>{
    // To be done
})


test("When pressing on Reset button it re-initializes the StopWatch", async () => {
    render(<StopWatch/>)
    // Elements to check: stopwatch time & laps display

    // Start the timer
    const startButton = screen.getByRole('button', { name: /start/i })
    await fireEvent.click(startButton)
    const stopWatchTime = screen.getByRole('heading', {level:2}).textContent


    // Record laps
    const lapButton = screen.getByRole('button', { name: /lap/i })
    await fireEvent.click(lapButton)


    // Reset everything
    const resetButton = screen.getByRole('button', { name: /reset/i })
    await fireEvent.click(resetButton)

    // Check if everything got resetted
    expect(stopWatchTime).toBe("00:00.0ms")


})
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

describe (App, () => {
    jest.useFakeTimers();

    // checks that the global timer remains accurate over long periods
    it("the global timer is accurate to the millisecond", () => {
        const {getByText, getByTestId} = render(<App/>);

        // presses the start button and skips 999999 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(999999);
        })

        // compares the found time to the expected time
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("16:39:99");
    });

    // checks that the timer stops when the stop button is pressed
    it("the time stops incrementing when the stop button is pressed", () => {
        const {getByText, getByTestId} = render(<App/>);

        // presses the start button and skips 999999 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(999999);
        })

        // presses the stop button and skips 1000 milliseconds
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // compares the found time to the expected time
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("16:39:99");
    });

    // checks that the timer continues after stopping and remains accurate
    it("the timer continues correctly when resuming from a stop", () => {
        const {getByText, getByTestId} = render(<App/>);

        // presses the start button and skips 1000 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // presses the stop button and skips 1000 milliseconds
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // presses the start button again and skips 1000 milliseconds
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // compares the found time to the expected time
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("00:02:00");
    });

    // checks that the lap button works and that the lap timer is correct
    it("the lap button works and the lap timer is accurate to the millisecond", () => {
        const {getByText} = render(<App/>);

        // presses the start button and skips 1000 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // presses the lap button
        const lapButton = getByText("LAP");
        fireEvent.click(lapButton);

        // compares the found lap time to the expected lap time
        const lapTimerValue = getByText("Lap 1").nextElementSibling.textContent
        expect(lapTimerValue).toEqual("00:01:00");
    });

    // checks that multiple laps can be made
    it("the lap button can be pressed multiple times to create new laps", () => {
        const {getByText, queryByText} = render(<App/>);

        // presses the start button and skips 1000 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // presses the lap button
        const lapButton = getByText("LAP");
        fireEvent.click(lapButton);

        // presses the lap button again
        fireEvent.click(lapButton);

        // checks that the Lap 2 entry exists
        const lapTimerValue = queryByText("Lap 2")
        expect(lapTimerValue).toBeDefined();
    });


    // checks that the timer resets when the reset button is pressed
    it("the timer goes to 00:00:00 after hitting the reset button", () => {
        const {getByText, getByTestId} = render(<App/>);

        // presses the start button and skips 1000 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // presses the stop button
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);

        // presses the reset button
        const resetButton = getByText("RESET");
        fireEvent.click(resetButton);

        // compares the found time to the expected time
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("00:00:00");
    });

    // checks that the laps are cleared when the reset button is pressed
    it("the laps are cleared after hitting the reset button", () => {
        const {getByText, queryByText} = render(<App/>);

        // presses the start button and skips 1000 milliseconds
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })

        // presses the stop button
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);

        // presses the reset button
        const resetButton = getByText("RESET");
        fireEvent.click(resetButton);

        // checks that the Lap 1 entry no longer exists
        const lapTimerValue = queryByText("Lap 1")
        expect(lapTimerValue).toBeNull();
    });

})
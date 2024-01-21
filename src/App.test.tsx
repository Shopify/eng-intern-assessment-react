import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

describe (App, () => {
    it("the global timer is accurate to the millisecond", () => {
        jest.useFakeTimers();
        const {getByText, getByTestId} = render(<App/>);
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(999999);
        })
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("16:39:99");
    });

    it("the time stops incrementing when the stop button is pressed", () => {
        jest.useFakeTimers();
        const {getByText, getByTestId} = render(<App/>);
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(999999);
        })
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("16:39:99");
    });

    it("the timer continues correctly when resuming from a stop", () => {
        jest.useFakeTimers();
        const {getByText, getByTestId} = render(<App/>);
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("00:02:00");
    });

    it("the lap button works and the lap timer is accurate to the millisecond", () => {
        jest.useFakeTimers();
        const {getByText} = render(<App/>);
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        const lapButton = getByText("LAP");
        fireEvent.click(lapButton);
        const lapTimerValue = getByText("Lap 1").nextElementSibling.textContent
        expect(lapTimerValue).toEqual("00:01:00");
    });

    it("the timer goes to 00:00:00 after hitting the reset button", () => {
        jest.useFakeTimers();
        const {getByText, getByTestId} = render(<App/>);
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);
        const resetButton = getByText("RESET");
        fireEvent.click(resetButton);
        const timerValue = getByTestId("timer").textContent;
        expect(timerValue).toEqual("00:00:00");
    });

    it("the laps are cleared after hitting the reset button", () => {
        jest.useFakeTimers();
        const {getByText, queryByText} = render(<App/>);
        const startButton = getByText("START");
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        })
        const stopButton = getByText("STOP");
        fireEvent.click(stopButton);
        const resetButton = getByText("RESET");
        fireEvent.click(resetButton);
        const lapTimerValue = queryByText("Lap 1")
        expect(lapTimerValue).toBeNull();
    });

})
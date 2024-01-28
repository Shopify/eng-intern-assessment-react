import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatchButton from "../StopWatchButton";

test("Start button is rendered on screen and clicking triggers the stopwatch", () => {
    const setIsRunningMock = jest.fn();
    render(
        <StopWatchButton
            isRunning={false}
            setIsRunning={setIsRunningMock}
            time={0}
            setTime={() => {}}
            laps={[]}
            setLaps={() => {}}
        />
    );

    const startButton = screen.getByText(/start/i);
    fireEvent.click(startButton);

    expect(setIsRunningMock).toHaveBeenCalledWith(true);
});

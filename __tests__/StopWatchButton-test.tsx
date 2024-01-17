/**
 * @jest-environment jsdom
 */

import {
    cleanup,
    fireEvent,
    getByTestId,
    render,
} from "@testing-library/react";
import React, { useState } from "react";
import { TimerState } from "../src/App";
import StopWatchButton from "../src/StopWatchButton";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

afterEach(cleanup);

describe("StopWatchButton", () => {
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(
            jest.requireActual("react").useState
        );
    });

    it("Clicking start button changes timerState to TimerState.RUNNING", () => {
        const setTimerStateMock = jest.fn();

        jest.spyOn(React, "useState").mockImplementation(() => [
            TimerState.PAUSED,
            setTimerStateMock,
        ]);

        const { container } = render(
            <StopWatchButton
                timerState={TimerState.PAUSED}
                setTimerState={setTimerStateMock}
                setLapSignal={() => null}
            />
        );

        fireEvent.click(getByTestId(container, "start-button"));

        expect(setTimerStateMock).toHaveBeenCalledWith(TimerState.RUNNING);
    });

    it("Clicking stop button changes timerState to TimerState.PAUSED", () => {
        const setTimerStateMock = jest.fn();

        jest.spyOn(React, "useState").mockImplementation(() => [
            TimerState.RUNNING,
            setTimerStateMock,
        ]);

        const { container } = render(
            <StopWatchButton
                timerState={TimerState.RUNNING}
                setTimerState={setTimerStateMock}
                setLapSignal={() => null}
            />
        );

        fireEvent.click(getByTestId(container, "stop-button"));

        expect(setTimerStateMock).toHaveBeenCalledWith(TimerState.PAUSED);
    });

    it("Clicking reset button changes timerState to TimerState.RESETTING", () => {
        const setTimerStateMock = jest.fn();

        jest.spyOn(React, "useState").mockImplementation(() => [
            TimerState.RUNNING,
            setTimerStateMock,
        ]);

        const { container } = render(
            <StopWatchButton
                timerState={TimerState.RUNNING}
                setTimerState={setTimerStateMock}
                setLapSignal={() => null}
            />
        );

        fireEvent.click(getByTestId(container, "reset-button"));

        expect(setTimerStateMock).toHaveBeenCalledWith(TimerState.RESETTING);
    });

    it("Clicking lap button sets lapSignal to true", () => {
        const setLapSignalMock = jest.fn();

        jest.spyOn(React, "useState").mockImplementation(() => [
            false,
            setLapSignalMock,
        ]);

        const { container } = render(
            <StopWatchButton
                timerState={TimerState.RUNNING}
                setTimerState={() => null}
                setLapSignal={setLapSignalMock}
            />
        );

        fireEvent.click(getByTestId(container, "lap-button"));

        expect(setLapSignalMock).toHaveBeenCalledWith(true);
    });
});

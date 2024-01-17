/**
 * @jest-environment jsdom
 */

import {
    act,
    cleanup,
    getByTestId,
    queryByTestId,
    render,
} from "@testing-library/react";
import React, { JSXElementConstructor, ReactElement } from "react";
import { TimerState } from "../src/App";
import StopWatch from "../src/StopWatch";

afterEach(cleanup);

const sleep = (sleepLength: number) =>
    new Promise((resolve) => setTimeout(resolve, sleepLength));

describe("StopWatch", () => {
    it("Time starts with a value of 00:00:00:000", () => {
        let rendered: HTMLElement;
        act(() => {
            const { container } = render(
                <StopWatch
                    timerState={TimerState.RUNNING}
                    lapSignal={false}
                    setLapSignal={() => null}
                />
            );
            rendered = container;
        });

        expect(getByTestId(rendered, "time").innerHTML).toEqual("00:00:00:000");
    });

    it("Setting timerState to TimerState.RUNNING begins timer", async () => {
        let rendered: HTMLElement;
        act(() => {
            const { container } = render(
                <StopWatch
                    timerState={TimerState.RUNNING}
                    lapSignal={false}
                    setLapSignal={() => null}
                />
            );
            rendered = container;
        });
        await act(async () => {
            await sleep(1000);
        });

        expect(getByTestId(rendered, "time").innerHTML).not.toEqual(
            "00:00:00:000"
        );
    });

    it("Setting timerState to TimerState.PAUSED stops the timer", async () => {
        let rendered: HTMLElement;
        let rerenderFunction: (
            ui: ReactElement<any, string | JSXElementConstructor<any>>
        ) => void;
        act(() => {
            const { container, rerender } = render(
                <StopWatch
                    timerState={TimerState.RUNNING}
                    lapSignal={false}
                    setLapSignal={() => null}
                />
            );
            rendered = container;
            rerenderFunction = rerender;
        });

        await act(async () => {
            await sleep(1000);
        });

        expect(getByTestId(rendered, "time").innerHTML).not.toEqual(
            "00:00:00:000"
        );

        rerenderFunction(
            <StopWatch
                timerState={TimerState.PAUSED}
                lapSignal={false}
                setLapSignal={() => null}
            />
        );
        const stoppedTime = getByTestId(rendered, "time").innerHTML;
        expect(getByTestId(rendered, "time").innerHTML).toEqual(stoppedTime);

        await act(async () => {
            await sleep(1000);
        });

        //wait 1 second and test again to ensure clock isn't still ticking
        expect(getByTestId(rendered, "time").innerHTML).toEqual(stoppedTime);
    });

    it("Setting timerState to TimerState.RESETTING stops and resets the timer", async () => {
        let rendered: HTMLElement;
        let rerenderFunction: (
            ui: ReactElement<any, string | JSXElementConstructor<any>>
        ) => void;
        act(() => {
            const { container, rerender } = render(
                <StopWatch
                    timerState={TimerState.RUNNING}
                    lapSignal={false}
                    setLapSignal={() => null}
                />
            );
            rendered = container;
            rerenderFunction = rerender;
        });

        await act(async () => {
            await sleep(1000);
        });

        expect(getByTestId(rendered, "time").innerHTML).not.toEqual(
            "00:00:00:000"
        );

        rerenderFunction(
            <StopWatch
                timerState={TimerState.RESETTING}
                lapSignal={false}
                setLapSignal={() => null}
            />
        );

        expect(getByTestId(rendered, "time").innerHTML).toEqual("00:00:00:000");
    });

    it("Setting lapSignal to true should create a new lap and set lapSignal to false", async () => {
        let rendered: HTMLElement;
        let rerenderFunction: (
            ui: ReactElement<any, string | JSXElementConstructor<any>>
        ) => void;
        const setLapSignalMock = jest.fn();

        jest.spyOn(React, "useState").mockImplementation(() => [
            false,
            setLapSignalMock,
        ]);

        act(() => {
            const { container, rerender } = render(
                <StopWatch
                    timerState={TimerState.RUNNING}
                    lapSignal={false}
                    setLapSignal={setLapSignalMock}
                />
            );
            rendered = container;
            rerenderFunction = rerender;
        });

        await act(async () => {
            await sleep(1000);
        });

        expect(queryByTestId(rendered, "lap")).toBeNull();

        rerenderFunction(
            <StopWatch
                timerState={TimerState.RESETTING}
                lapSignal={true}
                setLapSignal={setLapSignalMock}
            />
        );

        expect(setLapSignalMock).toHaveBeenCalledWith(false);
        expect(getByTestId(rendered, "lap")).not.toBeNull();
    });
});

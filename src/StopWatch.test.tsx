import React from "react";
import {render, fireEvent, act, getByTestId, getAllByText, getByRole} from "@testing-library/react";
import "@testing-library/jest-dom/";
import StopWatch from "./StopWatch";
import {buttonContent} from "./StopWatchConstants";
import {randomInt} from "crypto";


describe("StopWatch", () => {
    it("renders basic elements", () => {
        const {getByText, queryByText} = render(<StopWatch/>);

        //buttons that should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();
        expect(getByText(buttonContent["lap"])).toBeInTheDocument();

        //0 time that should be there
        expect(getByText("00:00.00")).toBeInTheDocument();

        //buttons that should not appear
        expect(queryByText(buttonContent["stop"])).not.toBeInTheDocument();
        expect(queryByText(buttonContent["reset"])).not.toBeInTheDocument();
    });

    it("handles start/stop toggle changing button", () => {
        const {getByText, queryByText} = render(<StopWatch/>);

        //start button should appear, and should be green
        expect(getByText(buttonContent["start"])).toBeInTheDocument();
        expect(getByText(buttonContent["start"])).toHaveStyle("backgroundColor: #0A2A12")

        //start button should disappear and stop button should appear, and should be red
        fireEvent.click(getByText(buttonContent["start"]));
        expect(queryByText(buttonContent["start"])).not.toBeInTheDocument();
        expect(getByText(buttonContent["stop"])).toBeInTheDocument();
        expect(getByText(buttonContent["stop"])).toHaveStyle("backgroundColor: #330E0A")

        //stop button should disappear and start button should appear
        fireEvent.click(getByText(buttonContent["stop"]));
        expect(getByText(buttonContent["start"])).toBeInTheDocument();
        expect(getByText(buttonContent["start"])).toHaveStyle("backgroundColor: #0A2A12")
        expect(queryByText(buttonContent["stop"])).not.toBeInTheDocument();
    });

    it("handles lap/reset toggle changing button", () => {
        const {getByText, queryByText} = render(<StopWatch/>);
        jest.useFakeTimers();

        //start button should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();

        //expect lap button to be disabled, reset should not appear
        expect(queryByText(buttonContent["reset"])).not.toBeInTheDocument();
        expect(getByText(buttonContent["lap"])).toBeDisabled();
        expect(getByText(buttonContent["lap"])).toHaveStyle("backgroundColor: #1C1B1E");


        //lap button should still appear and be enabled when the timer is running
        fireEvent.click(getByText(buttonContent["start"]));
        act(() => {
            jest.advanceTimersByTime(100);
        });
        expect(queryByText(buttonContent["reset"])).not.toBeInTheDocument();
        expect(getByText(buttonContent["lap"])).toBeInTheDocument();
        expect(getByText(buttonContent["lap"])).toBeEnabled();
        expect(getByText(buttonContent["lap"])).toHaveStyle("backgroundColor: #323232");

        //reset button should appear when the timer is not running
        expect(getByText(buttonContent["stop"])).toBeInTheDocument();
        fireEvent.click(getByText(buttonContent["stop"]));
        expect(getByText(buttonContent["reset"])).toBeInTheDocument();
        expect(getByText(buttonContent["reset"])).toHaveStyle("backgroundColor: #323232");
        expect(queryByText(buttonContent["lap"])).not.toBeInTheDocument();
    });

    it("handle timer functionality", () => {
        const {getByText, queryByText, container} = render(<StopWatch/>);
        jest.useFakeTimers();

        //start button should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();
        expect(getByText("00:00.00")).toBeInTheDocument();


        //start timer and see if timer is running
        fireEvent.click(getByText(buttonContent["start"]));
        act(() => {
            jest.advanceTimersByTime(100);
        });
        expect(queryByText("00:00.00")).not.toBeInTheDocument();

        //stop button should appear
        expect(getByText(buttonContent["stop"])).toBeInTheDocument();
        fireEvent.click(getByText(buttonContent["stop"]));

        //record the time when the timer is stopped
        const time = container.querySelector("h1.stopWatchTime");

        //wait for some time and see if timer is still the same
        for (let i = 0; i < 10; i++) {
            act(() => {
                jest.advanceTimersByTime(randomInt(1, 10000000));
            });
            const timeAfter = container.querySelector("h1.stopWatchTime");
            expect(time).toBe(timeAfter);
        }

    });

    it("handle timer accuracy", () => {
        const {getByText, container} = render(<StopWatch/>);
        jest.useFakeTimers();

        //start button should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();
        expect(getByText("00:00.00")).toBeInTheDocument();

        //start timer and wait for 10 second, check if timer is accurate
        fireEvent.click(getByText(buttonContent["start"]));
        act(() => {
            jest.advanceTimersByTime(10000);
        });
        expect(getByText(buttonContent["stop"])).toBeInTheDocument();
        fireEvent.click(getByText(buttonContent["stop"]));
        expect(container.querySelector("h1.stopWatchTime").textContent).toBe("00:10.00");

        //timer should not be running and should remain the same time after some periods of time
        jest.advanceTimersByTime(3000);
        jest.advanceTimersByTime(randomInt(1, 10000));
        expect(container.querySelector("h1.stopWatchTime").textContent).toBe("00:10.00");
    });

    it("handle first lap after start", () => {
        const {getByText, getAllByText} = render(<StopWatch/>);
        jest.useFakeTimers();

        //start button should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();
        expect(getByText("00:00.00")).toBeInTheDocument();

        //once timer starts, Lap 1 should appear
        fireEvent.click(getByText(buttonContent["start"]));
        expect(getByText("Lap 1")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(100);
        });
        fireEvent.click(getByText(buttonContent["stop"]));

        //should sync with elapsed time
        expect(getAllByText("00:00.10").length).toBe(2);
    });

    it("handle latest lap after several laps recorded", () => {
        const {getByText, getByRole, container, queryByText} = render(<StopWatch/>);
        jest.useFakeTimers();

        //start button should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();

        //lap button should appear when the timer is running
        fireEvent.click(getByText(buttonContent["start"]));
        expect(queryByText(buttonContent["reset"])).not.toBeInTheDocument();
        expect(getByText(buttonContent["lap"])).toBeInTheDocument();

        //press lap button for some times with 0.5 seconds interval
        const lapCounter = randomInt(1, 10);
        for (let i = 0; i < lapCounter; i++) {
            fireEvent.click(getByText(buttonContent["lap"]));
            act(() => {
                jest.advanceTimersByTime(500);
            });
        }

        fireEvent.click(getByText(buttonContent["stop"]));

        //latest one should sync with elapsed time after certain laps recorded
        expect(getByText(`Lap ${lapCounter + 1}`)).toBeInTheDocument();
        const latestLapTime = getByRole("currentLapTime").textContent;
        expect(latestLapTime).toBe("00:00.50");
    });

    it("handles lap recording", () => {
        const {getByText, getAllByText, queryByText} = render(<StopWatch/>);
        jest.useFakeTimers();

        //start button should appear
        expect(getByText(buttonContent["start"])).toBeInTheDocument();

        //lap button should appear when the timer is running
        fireEvent.click(getByText(buttonContent["start"]));
        expect(queryByText(buttonContent["reset"])).not.toBeInTheDocument();
        expect(getByText(buttonContent["lap"])).toBeInTheDocument();

        //press lap button for 10 times with 0.5 seconds interval, check if 10 laps are recorded
        for (let i = 0; i < 10; i++) {
            fireEvent.click(getByText(buttonContent["lap"]));
            act(() => {
                jest.advanceTimersByTime(500);
            });
            expect(getByText(`Lap ${i + 1}`)).toBeInTheDocument();
        }

        //check if laps are accurate
        const lapsRecorded = getAllByText("00:00.50");
        expect(lapsRecorded.length).toBe(10);

        //some not-supposed-to-be-there elements
        expect(queryByText("Lap -1")).not.toBeInTheDocument();
        expect(queryByText("Lap 0")).not.toBeInTheDocument();
        expect(queryByText("Lap 12")).not.toBeInTheDocument();
        expect(queryByText("Lap 100")).not.toBeInTheDocument();
    });
});
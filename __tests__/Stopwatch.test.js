import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stopwatch from "../src/StopWatch";

describe("Stopwatch", () => {
    test("renders initial state correctly", () => {
        render(<Stopwatch />);

        expect(screen.getByText("00:00:00.000")).toBeInTheDocument();
        expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
    });

    test("starts and stops the stopwatch", async () => {
        render(<Stopwatch />);

        // Starting the stopwatch
        const startTime = screen.getByText(
            /(\d{2}:){2}\d{2}\.\d{3}/
        ).textContent;
        fireEvent.click(screen.getByText("Start"));

        // Waiting a bit to stop the stopwatch
        let pausedTime;
        setTimeout(() => {
            fireEvent.click(screen.getByText("Stop"));
            pausedTime = screen.getByText(
                /(\d{2}:){2}\d{2}\.\d{3}/
            ).textContent;
        }, 500);

        // Waiting to make sure stopwatch doesn't change while stopped
        setTimeout(() => {
            const newPausedTime = screen.getByText(
                /(\d{2}:){2}\d{2}\.\d{3}/
            ).textContent;
            expect(newPausedTime).toBe(pausedTime);
            expect(newPausedTime).not.toBe(startTime);
        }, 500);
    });

    test("pauses and resumes the stopwatch", () => {
        render(<Stopwatch />);

        // Starting stopwatch
        fireEvent.click(screen.getByText("Start"));
        let pausedTime;
        // Stopping stopwatch after some time
        setTimeout(() => {
            fireEvent.click(screen.getByText("Stop"));
            pausedTime = screen.getByText(
                /(\d{2}:){2}\d{2}\.\d{3}/
            ).textContent;

            // Re-starting stopwatch
            fireEvent.click(screen.getByText("Start"));
        }, 500);

        // Waiting longer to make sure that time has run after re-starting
        setTimeout(() => {
            expect(
                screen.getByText(/(\d{2}:){2}\d{2}\.\d{3}/).textContent
            ).not.toBe(pausedTime);
        }, 500);
    });

    test("records and displays lap times", () => {
        render(<Stopwatch />);

        // Checking if first lap created a lap
        fireEvent.click(screen.getByText("Start"));
        fireEvent.click(screen.getByText("Lap"));
        expect(screen.getByTestId("lap-list")).toContainElement(
            screen.getByTestId("lap-1")
        );

        // Checking if second lap press creates a new lap
        fireEvent.click(screen.getByText("Lap"));
        expect(screen.getByTestId("lap-list").children.length).toBe(2);
    });

    test("resets the stopwatch", () => {
        render(<Stopwatch />);

        fireEvent.click(screen.getByText("Start"));
        fireEvent.click(screen.getByText("Lap"));
        fireEvent.click(screen.getByText("Reset"));

        expect(screen.getByText("00:00:00.000")).toBeInTheDocument();
        expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
    });
});

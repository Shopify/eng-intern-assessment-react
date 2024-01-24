import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../src/StopWatch";

describe("StopWatch Component Tests", () => {
    test("renders initial state correctly", () => {
        render(<StopWatch />);
        expect(
            // Match text content by concatenating the content of all time-box divs since text was split up
            screen.getByText((_, element) => {
                if (element.classList.contains("stopwatch-container")) {
                    const timeElements = element.querySelectorAll(".time-box");
                    const timeString = Array.from(timeElements)
                        .map((el) => el.textContent)
                        .join("");
                    return timeString === "000000";
                }
                return false;
            })
        ).toBeInTheDocument();
    });

    test("tests the start and stop", async () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText("Start"));
        fireEvent.click(screen.getByText("Stop"));

        // Map each element into proper form and make sure it matches the regex
        const timeDisplay = screen.getByTestId("time-display");
        const timeBoxes = timeDisplay.querySelectorAll(".time-box");
        const timeString = `${timeBoxes[0].textContent}:${timeBoxes[1].textContent}.${timeBoxes[2].textContent}`;
        expect(timeString).toMatch(/\d{2}:\d{2}\.\d{2}/);
    });

    test("records and displays lap times", () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText("Start"));
        fireEvent.click(screen.getByText("Lap"));

        const lapElements = screen.getAllByTestId("lap-container");
        expect(lapElements.length).toBeGreaterThan(1);

        // Map each element into proper form and make sure it matches the regex
        lapElements.forEach((container) => {
            const timeElements = container.querySelectorAll(".lap-time");
            const lapTimeString = `${timeElements[0].textContent}:${timeElements[1].textContent}.${timeElements[2].textContent}`;
            expect(lapTimeString).toMatch(/\d{2}:\d{2}\.\d{2}/);
        });
    });

    test("test the reset the stopwatch", () => {
        render(<StopWatch />);
        fireEvent.click(screen.getByText("Start"));
        fireEvent.click(screen.getByText("Lap"));
        fireEvent.click(screen.getByText("Stop"));
        fireEvent.click(screen.getByText("Reset"));

        // Text matcher to concatenate the content of all time-box divs
        expect(
            screen.getByText((_, element) => {
                if (element.classList.contains("stopwatch-container")) {
                    const timeElements = element.querySelectorAll(".time-box");
                    const timeString = Array.from(timeElements)
                        .map((el) => el.textContent)
                        .join("");
                    return timeString === "000000";
                }
                return false;
            })
        ).toBeInTheDocument();

        // Check if the laps list is cleared
        const lapsList = screen.queryByTestId("laps");
        expect(lapsList).toBeNull();
    });
});

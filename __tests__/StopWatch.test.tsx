import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../src/StopWatch";

jest.useFakeTimers();

describe("StopWatch", () => {
  it("should start, stop, reset, and record laps correctly", () => {
    render(<StopWatch />);

    // Start the stopwatch
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3000); // Simulate 3 seconds elapsed
    });

    // Check if the time is increasing
    expect(screen.queryByText("00:00:03")).toBeInTheDocument();

    // Stop the stopwatch
    fireEvent.click(screen.getByText("Stop"));
    act(() => {
      jest.advanceTimersByTime(3000); // Simulate 3 seconds elapsed (should not increase)
    });

    // Check if the time remains the same after stopping
    expect(screen.queryByText("00:00:03")).toBeInTheDocument();

    // Reset the stopwatch
    fireEvent.click(screen.getByText("Reset"));

    // Check if the time is reset to 0
    expect(screen.queryByText("00:00:00")).toBeInTheDocument();

    // Start the stopwatch again
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(5000); // Simulate 5 seconds elapsed
    });

    // Record a lap
    fireEvent.click(screen.getByRole("button", { name: "Laps" }));

    // Check if there is at least one lap recorded
    const lapItems = screen.getAllByRole("listitem");
    expect(lapItems.some((lapItem) => lapItem.textContent === "00:00:05")).toBe(
      true
    );

    // Stop the stopwatch
    fireEvent.click(screen.getByText("Stop"));

    // Check if laps are still displayed after stopping
    expect(
      screen.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "li" && content === "00:00:05"
      )
    ).toBeInTheDocument();
  });
});

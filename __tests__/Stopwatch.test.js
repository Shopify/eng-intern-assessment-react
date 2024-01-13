import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Stopwatch from "../src/StopWatch";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", () => {
    render(<Stopwatch />);

    // Start the stopwatch
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    // Stop the stopwatch
    fireEvent.click(screen.getByText("Stop"));

    // Check if the time display is still present, indicating that the stopwatch has stopped
    // but the time is still displayed
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch with time difference", () => {
    render(<Stopwatch />);

    act(() => {
      fireEvent.click(screen.getByText("Start"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Stop"));
    });

    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    act(() => {
      fireEvent.click(screen.getByText("Resume"));
    });

    // Wait for two seconds
    return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      // Check if the time has changed from the paused time
      const resumedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
      expect(resumedTime).not.toBe(pausedTime);
    });
  });

  test("records and displays lap times", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list")).toContainElement(
      // Right now both the main clock and the lap formats are the same.
      // Should target the direct children of the labs array instead
      screen.getByTestId("lap-list").querySelector("li")
    );

    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});

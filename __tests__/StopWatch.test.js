import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Stopwatch from "../src/StopWatch";
import "@testing-library/jest-dom";
import { within } from "@testing-library/dom";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));

    // Wait for a moment to ensure the time is changing
    await waitFor(() => jest.advanceTimersByTime(100));

    // Ensure start button switches to stop
    expect(screen.queryByText("Start")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));

    // Ensure stop button switches to start
    expect(screen.queryByText("Stop")).not.toBeInTheDocument();

    // When some time is passed timer should not show 00:00:00
    expect(screen.queryByText("00:00:00")).not.toBeInTheDocument();
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));

    // Wait for a moment to ensure the time is changing
    await waitFor(() => jest.advanceTimersByTime(100));

    // Click Stop and record the time into paused time
    fireEvent.click(screen.getByText("Stop"));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText("Start"));

    // Wait for a moment to ensure the time is changing
    await waitFor(() => jest.advanceTimersByTime(100));

    // Click Stop and check if time changed
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));

    // Check if lap displayed within lap-list when timer is running
    expect(
      within(screen.getByTestId("lap-list")).getByText(/(\d{2}:){2}\d{2}/)
    );

    // Check if second lap displayed
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(2);

    // Wait for a moment to ensure the time is changing
    await waitFor(() => jest.advanceTimersByTime(100));

    // Check if lap is recorded when timer is stopped
    fireEvent.click(screen.getByText("Stop"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(3);

    // Check if time recorded is the same as at timer
    const pausedTime = within(screen.getByTestId("time-display")).getByText(
      /(\d{2}:){2}\d{2}/
    ).textContent;
    expect(
      within(screen.getByTestId("lap-list")).getAllByText(/(\d{2}:){2}\d{2}/)[0]
        .textContent
    ).toBe(pausedTime);
  });

  test("resets the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Reset"));

    // Check if time is reset
    expect(
      within(screen.getByTestId("time-display")).getByText("00:00:00")
    ).toBeInTheDocument();

    // Check if laps are deleted
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});
jest.useFakeTimers();

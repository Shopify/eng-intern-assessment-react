/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../src/components/StopWatch";

jest.useFakeTimers();

describe("StopWatch", () => {
  beforeEach(() => {
    render(<StopWatch />);
  });

  test("Should render timer state initially at 0", () => {
    const timerTextElement = screen.getByTestId("timer-text");

    expect(timerTextElement).toBeInTheDocument();
    expect(timerTextElement).toHaveTextContent("00:00:00.00");
  });

  test("Should contain no lapped times in intial state", () => {
    const tBody = screen.getByRole("tbody");
    // should be empty array - no children
    expect(tBody.children).toHaveLength(0);
  });

  test("Should render the correct time passed when the start button is pressed", () => {
    const startButton = screen.getByRole("button", { name: "Start" });
    const timerTextElement = screen.getByTestId("timer-text");

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(6500);
    });

    expect(timerTextElement).toHaveTextContent("00:00:06.50");
  });

  test("Should stop processing time once the stop button is pressed", () => {
    const startButton = screen.getByRole("button", { name: "Start" });
    const stopButton = screen.getByRole("button", { name: "Stop" });
    const timerTextElement = screen.getByTestId("timer-text");

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(6500);
    });
    fireEvent.click(stopButton);
    // timer should stop processing now
    // Advancing timers should not render a new time
    act(() => {
      jest.advanceTimersByTime(6500);
    });

    // Check second time period is not added and that time stayed constant
    expect(timerTextElement).toHaveTextContent("00:00:06.50");
  });

  test("Should continue processing time if stop is followed by start button press", () => {
    const startButton = screen.getByRole("button", { name: "Start" });
    const stopButton = screen.getByRole("button", { name: "Stop" });
    const timerTextElement = screen.getByTestId("timer-text");

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(6500);
    });
    fireEvent.click(stopButton);

    const intermediateTime = timerTextElement.textContent;

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(6500);
    });

    // Second time period should be processed and added to original time period
    expect(timerTextElement).toHaveTextContent("00:00:13.00");
    // Time after the first time period (after pressing stop)
    expect(intermediateTime).toBe("00:00:06.50");
  });

  test("Should render correct lapped time when the lap button is pressed", () => {
    const startButton = screen.getByRole("button", { name: "Start" });
    const lapButton = screen.getByRole("button", { name: "Lap" });

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(6500);
    });

    fireEvent.click(lapButton);

    const tBody = screen.getByRole("tbody");
    // table bodies contain a structure as: <tr> <th> </tr>
    // <th> has the lapped text of interest
    const row = tBody.querySelector("tr.tableBody");

    // Access the th elements
    const lapNumber = row.children[0];
    const lapLocalTime = row.children[1];
    const totalTime = row.children[2];

    expect(lapNumber).toHaveTextContent("1");
    expect(lapLocalTime).toHaveTextContent("00:00:06.50");
    expect(totalTime).toHaveTextContent("00:00:06.50");
  });

  test("Should reset the time to 0 when Restart button is pressed", () => {
    const startButton = screen.getByRole("button", { name: "Start" });
    const stopButton = screen.getByRole("button", { name: "Stop" });
    const RestartButton = screen.getByRole("button", { name: "Restart" });
    const timerTextElement = screen.getByTestId("timer-text");

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(6500);
    });

    // stop button needs to be pressed to enable the restart button
    fireEvent.click(stopButton);
    fireEvent.click(RestartButton);

    expect(timerTextElement).toHaveTextContent("00:00:00.00");
  });

  test("Should remove rendered lapped times once Restart button is pressed", () => {
    const startButton = screen.getByRole("button", { name: "Start" });
    const stopButton = screen.getByRole("button", { name: "Stop" });
    const RestartButton = screen.getByRole("button", { name: "Restart" });
    const lapButton = screen.getByRole("button", { name: "Lap" });

    fireEvent.click(startButton);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    fireEvent.click(lapButton);

    fireEvent.click(stopButton);
    fireEvent.click(RestartButton);

    const tBody = screen.getByRole("tbody");
    // should be empty array - no children
    expect(tBody.children).toHaveLength(0);
  });
});

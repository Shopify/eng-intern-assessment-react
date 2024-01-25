import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StopWatch } from "../src/components/StopWatch";

const delayDuration = 1000;

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<StopWatch />);

    expect(screen.getByText("00:00.00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, delayDuration));
    expect(screen.getByText(/\d{2}:\d{2}\.\d{2}$/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));
    expect(screen.queryByText("00:00.00")).not.toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, delayDuration));
    fireEvent.click(screen.getByText("Stop"));
    const pausedTime = screen.getByText(/\d{2}:\d{2}\.\d{2}$/).textContent;

    fireEvent.click(screen.getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, delayDuration));
    expect(screen.getByText(/\d{2}:\d{2}\.\d{2}$/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.getByTestId("lap-item-1")
    );

    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.getByTestId("lap-item-2")
    );
  });

  test("resets the stopwatch", () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00.00")).toBeInTheDocument();
  });
});

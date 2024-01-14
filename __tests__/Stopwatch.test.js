import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Stopwatch from "../src/StopWatch";
import "@testing-library/jest-dom";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", () => {
    jest.useFakeTimers();
    render(<Stopwatch />);
    // start the stopwatch and let it run for 1 second
    fireEvent.click(screen.getByText("Start"));
    const startTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    act(() => {
      jest.advanceTimersByTime(10);
    });
    // expect the stopwatch to have advanced
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      startTime
    );
    fireEvent.click(screen.getByText("Stop"));
    const stopTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    act(() => {
      jest.advanceTimersByTime(10);
    });
    // expect the stopwatch to have not advanced since it was stopped
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).toBe(stopTime);
  });

  test("pauses and resumes the stopwatch", async () => {
    jest.useFakeTimers();
    render(<Stopwatch />);
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Stop"));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText("Start"));
    // run the stopwatch
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.getByTestId("lap-0")
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

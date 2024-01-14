import "@testing-library/jest-dom";

import { act, fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import Stopwatch from "../src/StopWatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));
    // Check that time has stopped, rather than removing time on screen
    const stoppedTime = screen.getAllByText(/(\d{2}:){2}\d{2}/)[0].textContent;

    // timeout
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });

    // expect time to be the same
    expect(screen.getAllByText(/(\d{2}:){2}\d{2}/)[0].textContent).toBe(
      stoppedTime
    );
  });

  test("pauses and resumes the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Stop"));
    const pausedTime = screen.getAllByText(/(\d{2}:){2}\d{2}/)[0].textContent;
    fireEvent.click(screen.getByText("Start"));
    // timeout
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });
    // since laps on screen, use getAllByText to get all times. first item is always the current time display
    expect(screen.getAllByText(/(\d{2}:){2}\d{2}/)[0].textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    // elements after 0th index in getAllByText are laps
    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.getAllByText(/(\d{2}:){2}\d{2}/)[1]
    );

    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    // in my UI (mimicing apple), we need to press "stop" for the "reset" button to appear
    fireEvent.click(screen.getByText("Stop"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});

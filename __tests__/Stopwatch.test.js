import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import StopWatch from "../src/components/StopWatch/";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<StopWatch />);

    expect(screen.queryByTestId("timer")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).not.toBeInTheDocument();
  });

  test("starts and stops the stopwatch", () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Stop"));

    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    fireEvent.click(screen.getByText("Start"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const resumedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    expect(resumedTime).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));

    const laps = screen.getByTestId("lap-list");
    const lapTimeElements = within(laps).queryAllByText(/(\d{2}:){2}\d{2}/);

    expect(lapTimeElements.length).toBeGreaterThan(0);

    lapTimeElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Lap"));
    expect(laps.children.length).toBe(2);
  });

  test("resets the stopwatch", async () => {
    const DEFAULT_TIME = "00:00:00";

    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));

    expect(screen.queryByTestId("timer")).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    const currentTime = screen.queryByTestId("timer").textContent;
    expect(currentTime).not.toEqual(DEFAULT_TIME);
    expect(screen.queryByTestId("lap-list")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Reset"));

    expect(screen.queryByTestId("timer")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("timer").textContent).toEqual(DEFAULT_TIME);
  });
});

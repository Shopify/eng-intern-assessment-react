import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Stopwatch from "../src/StopWatch/StopWatch";
import "@testing-library/jest-dom";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<Stopwatch />);
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).not.toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Pause"));

    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText("Resume"));

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Lap"));

    //In this case, I looked for the second element becasuse the
    //first element is the main time!
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
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});

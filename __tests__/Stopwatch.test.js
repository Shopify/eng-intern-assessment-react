import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Stopwatch from "../src/Stopwatch";

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

  test("pauses and resumes the stopwatch", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Pause"));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText("Resume"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(1);
    expect(screen.getByTestId("lap-list")).toHaveTextContent(
      /(\d{2}:){2}\d{2}/
    );

    const timeDisplay = screen.getByTestId("time-display");
    const lapList = screen.getByTestId("lap-list");
    const lastLapListItem = lapList.querySelector("li:last-child");

    // Assert that the last lap-list item contains the exact text from time-display
    expect(lastLapListItem.textContent).toBe(timeDisplay.textContent);

    // expect(screen.getByTestId("lap-list")).toContainElement(
    //   screen.getByTestId("time-display").getByText(/(\d{2}:){2}\d{2}/)
    // );
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

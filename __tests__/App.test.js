import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import { act } from "react-dom/test-utils";

const countDownRegex = /(\d{2}:){2}\d{2}/;
const initialTime = "00:00:00";

const incrementTimers = (ms) => {
  // advanceTimersByTime must be wrapped in act() to work properly
  // as setInterval is used in the Stopwatch component to update the state
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

const getCountDown = () => screen.getByText(countDownRegex).textContent;

describe("Stopwatch App", () => {
  beforeAll(() => {
    // using fake timers allows us to control the passage of time
    jest.useFakeTimers();
  });

  test("renders initial state correctly", () => {
    render(<App />);

    expect(screen.getByText(initialTime)).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).not.toBeInTheDocument();
  });

  test("starts and stops the stopwatch", () => {
    render(<App />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(initialTime)).toBeInTheDocument();

    // wait for 1 sec to allow the counter to get past 00:00:00
    incrementTimers(1000);

    fireEvent.click(screen.getByText("Stop"));
    expect(screen.queryByText(countDownRegex)).toBeInTheDocument();

    const pausedTime = getCountDown();
    expect(pausedTime).not.toBe(initialTime);
  });

  test("pauses and resumes the stopwatch", () => {
    render(<App />);

    fireEvent.click(screen.getByText("Start"));
    incrementTimers(1000);
    fireEvent.click(screen.getByText("Stop"));

    const pausedTime = getCountDown();
    expect(pausedTime).not.toBe(initialTime);

    fireEvent.click(screen.getByText("Resume"));

    incrementTimers(1000);

    expect(getCountDown()).not.toBe(pausedTime);
  });

  test("records and displays lap times", () => {
    render(<App />);

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));

    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.getByText(/\d: (\d{2}:){2}\d{2}/)
    );

    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    render(<App />);

    fireEvent.click(screen.getByText("Start"));
    incrementTimers(1000);

    expect(getCountDown()).not.toBe(initialTime);

    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText(initialTime)).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).not.toBeInTheDocument();
  });
});

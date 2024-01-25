// unit tests for StopWatch component

import React from "react";
import StopWatch from "../src/components/StopWatch";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("StopWatch", () => {
  it("stopwatch renders initially", () => {
    const { getByText } = render(<StopWatch />);

    expect(getByText("0h")).toBeInTheDocument();
    expect(getByText("0m")).toBeInTheDocument();
    expect(getByText("0s")).toBeInTheDocument();
    expect(getByText("Start")).toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
    expect(getByText("Laps")).toBeInTheDocument();

    // check stop and lap 0 doesn't exist
    expect(screen.queryByText("Stop")).toBeNull();
    expect(screen.queryByText("Lap 0")).toBeNull();
  });

  it("stopwatch button text changes when button clicked", () => {
    const { getByText } = render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(getByText("Stop")).toBeInTheDocument();
  });

  it("timer resets to 0 and stops running when reset button clicked on", async () => {
    const { getByText } = render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));

    // check last digit for time isn't 0s after 50 milliseconds
    await waitFor(
      () => {
        expect(screen.getByTestId("subsecond-digit").textContent).not.toEqual(
          "0"
        );
      },
      { timeout: 50 }
    );

    fireEvent.click(screen.getByText("Reset"));

    // check time has been reset
    expect(getByText("0h")).toBeInTheDocument();
    expect(getByText("0m")).toBeInTheDocument();
    expect(getByText("0s")).toBeInTheDocument();

    // check after 0.1 second time is still stopped
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(getByText("0h")).toBeInTheDocument();
    expect(getByText("0m")).toBeInTheDocument();
    expect(getByText("0s")).toBeInTheDocument();
    expect(screen.getByTestId("subsecond-digit").textContent).toEqual("0");
  });

  it("click on laps 3 times and make sure only 3 lap items show", () => {
    const { getByText } = render(<StopWatch />);

    fireEvent.click(screen.getByText("Laps"));
    expect(getByText("Lap 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Laps"));
    expect(getByText("Lap 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Laps"));
    expect(getByText("Lap 2")).toBeInTheDocument();

    expect(screen.queryByText("Lap 3")).toBeNull();
  });
});

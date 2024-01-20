import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import StopWatch from "../src/StopWatch";
import App from "../src/App";

jest.setTimeout(5000)

describe("StopWatch Component", () => {
  test("render stopwatch in initial state", () => {
    //render stopwatch with default props
    render(<StopWatch isRunning={false} time={0} laps={[]} />);
    //verify that the stopwatch displays 00:00:00 at start
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  test("handle start and stop correctly", () => {
    //render stopwatch with default props
    const { getByText } = render(<App />);

    //click 'start' button
    fireEvent.click(screen.getByText("Start"));

    //verify that the stopwatch is runnning
    // Note: You may need to wait for a moment to allow the time to change
    expect(getByText(/^(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    // Click the "Stop" button
    fireEvent.click(screen.getByText("Stop"));

    // Verify that the stopwatch stops
    expect(getByText(/^(\d{2}:){2}\d{2}/)).toBeInTheDocument();
  });

  test("handle lap correctly", () => {
    //render app component
    const { getByText } = render(<App />);

    //click the "start" button
    fireEvent.click(screen.getByText("Start"));

    // click the "Lap" button
    fireEvent.click(screen.getByText("Lap"));

    // verify that a lap is recorded
    expect(getByText("#1 00:00:00")).toBeInTheDocument();
  });
});

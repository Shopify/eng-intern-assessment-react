import React from "react";
import { render, screen } from "@testing-library/react";
import StopWatch from "./StopWatch";

describe("StopWatch component", () => {
  it("renders laps with corresponding times", () => {
    const timer = 120000; // 2 minutes in milliseconds
    const laps = [60000, 90000, 110000]; // 1 minute, 1 minute and 30 seconds, 1 minute and 50 seconds in milliseconds

    render(<StopWatch timer={timer} laps={laps} />);

    // Check if the main timer is rendered
    expect(screen.getByText("02:00:00")).toBeTruthy();

    // Check if each lap time is rendered
    expect(screen.getByText("Lap 1: 01:00:00")).toBeTruthy();
    expect(screen.getByText("Lap 2: 01:30:00")).toBeTruthy();
    expect(screen.getByText("Lap 3: 01:50:00")).toBeTruthy();
  });
});

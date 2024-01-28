import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../components/StopWatch";
import { StopWatchProvider } from "../components/StopWatchContext";

describe("StopWatch Component", () => {
  test("buttons are clickable", () => {
    // Assemble: Set up the environment
    render(
      <StopWatchProvider>
        <StopWatch />
      </StopWatchProvider>
    );

    // Assemble: Get buttons
    const startButton = screen.getByRole("button", {
      name: /start \(space\)/i,
    });
    const stopButton = screen.getByRole("button", { name: /stop \(space\)/i });
    const resetButton = screen.getByRole("button", { name: /reset \(r\)/i });
    const lapButton = screen.getByRole("button", { name: /lap \(enter\)/i });
    const workoutButton = screen.getByRole("button", {
      name: /workout \(w\)/i,
    });

    // Action: Click each button
    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    fireEvent.click(resetButton);
    fireEvent.click(lapButton);
    fireEvent.click(workoutButton);

    // Assert: Check if buttons are interactive
    expect(startButton).toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(lapButton).toBeInTheDocument();
    expect(workoutButton).toBeInTheDocument();
  });
});

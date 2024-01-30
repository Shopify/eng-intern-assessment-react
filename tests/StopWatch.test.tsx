import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import StopWatch from "../src/StopWatch";

it("initial state", () => {
  const { queryByText } = render(<StopWatch />);

  expect(queryByText(/00:00:00/i)).toBeTruthy();
});


it("initial state", () => {
    const { queryByText } = render(<StopWatch />);
  
    expect(queryByText(/00:00:00/i)).toBeTruthy();
    expect(screen.getByText("Start")).toBeInTheDocument();
    const stopButton = screen.getByText("Stop");
    expect(stopButton).toBeInTheDocument();
    expect(stopButton).toBeDisabled();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    const lapButton = screen.getByText("Lap");
    expect(lapButton).toBeInTheDocument();
    expect(lapButton).toBeDisabled();
  });

  it("press start", () => {
    const { queryByText } = render(<StopWatch />);
  
    expect(queryByText(/00:00:00/i)).toBeTruthy();
    expect(screen.getByText("Start")).toBeInTheDocument();
    const stopButton = screen.getByText("Stop");
    expect(stopButton).toBeInTheDocument();
    expect(stopButton).toBeDisabled();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    const lapButton = screen.getByText("Lap");
    expect(lapButton).toBeInTheDocument();
    expect(lapButton).toBeDisabled();
  });
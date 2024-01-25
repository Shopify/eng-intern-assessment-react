import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

describe("StopWatchButton Component", () => {
  it("renders the start/stop button and handles click", () => {
    const mockStartStop = jest.fn();
    const { getByText } = render(
      <StopWatchButton
        isRunning={false}
        onStartStop={mockStartStop}
        onReset={() => {}}
        onLap={() => {}}
      />
    );

    const startButton = getByText("Start");
    expect(startButton.textContent).toBe("Start"); // Verify start button text
    fireEvent.click(startButton);
    expect(mockStartStop).toHaveBeenCalledTimes(1); // Verify start button text
  });

  it("renders the lap button and handles click when stopwatch is running", () => {
    const mockLap = jest.fn();
    const { getByText } = render(
      <StopWatchButton
        isRunning={true}
        onStartStop={() => {}}
        onReset={() => {}}
        onLap={mockLap}
      />
    );

    const lapButton = getByText("Lap");
    expect(lapButton.textContent).toBe("Lap"); // Verify Lap button text
    fireEvent.click(lapButton);
    expect(mockLap).toHaveBeenCalledTimes(1); // Verify lap handler is called
  });

  it('renders the reset button and handles click', () => {
    const mockReset = jest.fn();
    const { getByText } = render(
      <StopWatchButton
        isRunning={false}
        onStartStop={() => {}}
        onReset={mockReset}
        onLap={() => {}}
      />
    );

    const resetButton = getByText('Reset');
    expect(resetButton.textContent).toBe('Reset'); // Verify Reset button text
    fireEvent.click(resetButton);
    expect(mockReset).toHaveBeenCalledTimes(1); // Verify reset handler is called
  });
});

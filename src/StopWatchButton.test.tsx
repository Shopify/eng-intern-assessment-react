import { render, fireEvent, act } from "@testing-library/react";
import StopwatchButton from "./StopWatchButton";
import React from "react";

describe("StopwatchButton Component", () => {
  it("renders without crashing", () => {
    render(
      <StopwatchButton
        isRunning={false}
        onStart={() => {}}
        onStop={() => {}}
        onReset={() => {}}
        onLap={() => {}}
      />
    );
  });

  it("triggers onStart when start button is clicked", () => {
    const onStartMock = jest.fn();
    const { getByText } = render(
      <StopwatchButton
        isRunning={false}
        onStart={onStartMock}
        onStop={() => {}}
        onReset={() => {}}
        onLap={() => {}}
      />
    );
    const startButton = getByText("Start");

    act(() => {
      fireEvent.click(startButton);
    });

    expect(onStartMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onStop when stop button is clicked", () => {
    const onStopMock = jest.fn();
    const { getByText } = render(
      <StopwatchButton
        isRunning={true}
        onStart={() => {}}
        onStop={onStopMock}
        onReset={() => {}}
        onLap={() => {}}
      />
    );
    const stopButton = getByText("Stop");

    act(() => {
      fireEvent.click(stopButton);
    });

    expect(onStopMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onReset when reset button is clicked", () => {
    const onResetMock = jest.fn();
    const { getByText } = render(
      <StopwatchButton
        isRunning={true}
        onStart={() => {}}
        onStop={() => {}}
        onReset={onResetMock}
        onLap={() => {}}
      />
    );
    const resetButton = getByText("Reset");

    act(() => {
      fireEvent.click(resetButton);
    });

    expect(onResetMock).toHaveBeenCalledTimes(1);
  });

  it("triggers onLap when lap button is clicked", () => {
    const onLapMock = jest.fn();
    const { getByText } = render(
      <StopwatchButton
        isRunning={true}
        onStart={() => {}}
        onStop={() => {}}
        onReset={() => {}}
        onLap={onLapMock}
      />
    );
    const lapButton = getByText("Lap");

    act(() => {
      fireEvent.click(lapButton);
    });

    expect(onLapMock).toHaveBeenCalledTimes(1);
  });
});

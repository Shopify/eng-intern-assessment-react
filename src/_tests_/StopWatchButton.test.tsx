import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

test("calls onStart when start button is clicked", () => {
  const onStartMock = jest.fn();
  render(
    <StopWatchButton
      onStart={onStartMock}
      onStop={() => {}}
      onReset={() => {}}
      onLap={() => {}}
    />
  );
  const startButton = screen.getByTestId("start-button");
  fireEvent.click(startButton);
  expect(onStartMock).toHaveBeenCalledTimes(1);
});

test("calls onStop when stop button is clicked", () => {
  const onStopMock = jest.fn();
  render(
    <StopWatchButton
      onStart={() => {}}
      onStop={onStopMock}
      onReset={() => {}}
      onLap={() => {}}
    />
  );
  const stopButton = screen.getByTestId("stop-button");
  fireEvent.click(stopButton);
  expect(onStopMock).toHaveBeenCalledTimes(1);
});

/*
The below is to add test to StopWatchButton.tsx Component
<button className="btn btn-start" title="Start" onClick={onStart} data-testid="start-button" />
<button className="btn btn-stop" title="Stop" onClick={onStop} data-testid="stop-button" />
Add data-testid attributes for other buttons as needed
*/

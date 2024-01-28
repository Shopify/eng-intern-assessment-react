import React from "react";
import { fireEvent, render, act } from "@testing-library/react";
import StopWatch from "./StopWatch";
jest.useFakeTimers();

//Start/Stop Button Test
test("starts timer, after 1 second, displays 1s on timer", () => {
  const { getByTestId, getByText } = render(<StopWatch />);
  const startStopButton = getByText("Start");

  act(() => fireEvent.click(startStopButton));

  expect(startStopButton.textContent).toBe("Stop");

  act(() => jest.advanceTimersByTime(1000));
  act(() => fireEvent.click(startStopButton));

  expect(startStopButton.textContent).toBe("Start");

  act(() => jest.advanceTimersByTime(1000));

  expect(getByTestId("displayed-time").textContent).toBe("00:01:00");
});

//Reset Button Test
test("resets total time and stops timer", () => {
  const { getByTestId, getByText } = render(<StopWatch />);
  const startStopButton = getByText("Start");
  const ResetButton = getByText("Reset");
  act(() => {
    fireEvent.click(startStopButton);
  });

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  act(() => {
    fireEvent.click(ResetButton);
  });

  expect(getByTestId("displayed-time").textContent).toBe("00:00:00");
});

//Lap Button Test
test("Lap button appends laps after timer start", () => {
  const { getByTestId, getByText } = render(<StopWatch />);
  const startStopButton = getByText("Start");
  const lapButton = getByText("Lap");

  act(() => {
    fireEvent.click(startStopButton);
  });
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  act(() => {
    fireEvent.click(lapButton);
  });
  const firstListItem = getByTestId("list-item-0").textContent;
  expect(firstListItem).toBe("00:01:00");
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  act(() => {
    fireEvent.click(lapButton);
  });
  const secondListItem = getByTestId("list-item-1").textContent;
  expect(secondListItem).toBe("00:02:00");
});

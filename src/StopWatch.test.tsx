import React from "react";
import { fireEvent, render, act } from "@testing-library/react";
import StopWatch from "./StopWatch";
jest.useFakeTimers();

//After updating TIME_INTERVAL being set to 60fps, it was not gaurenteed that '00:00:01:00' would be displayed after a setInterval of 1000ms, So I changed my test to ensure once the timer had start, the displayed time would not be equal to "00:00:00:00"

describe("Testing button functionality for timer", () => {
  //Start/Stop Button Test
  test("starts timer, after 1 second, does not display starting time", () => {
    const { getByTestId, getByText } = render(<StopWatch />);
    const startStopButton = getByText("Start");

    act(() => fireEvent.click(startStopButton));

    expect(startStopButton.textContent).toBe("Stop");

    act(() => jest.advanceTimersByTime(1000));
    act(() => fireEvent.click(startStopButton));

    expect(startStopButton.textContent).toBe("Start");

    act(() => jest.advanceTimersByTime(1000));

    expect(getByTestId("displayed-time").textContent).not.toBe("00:00:00:00");
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
    expect(startStopButton.textContent).toBe("Start");
    expect(getByTestId("displayed-time").textContent).toBe("00:00:00:00");
  });

  //Lap Button Test
  test("Lap button appends multiple laps after timer start of different times", () => {
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
    expect(firstListItem).not.toBe("00:00:00:00");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(lapButton);
    });
    const secondListItem = getByTestId("list-item-1").textContent;
    expect(secondListItem).not.toBe("00:00:00:00");
    expect(secondListItem).not.toBe(firstListItem);
  });

  // Lap Clear Test
  test("Clears Lap List", () => {
    const { getByTestId, getByText } = render(<StopWatch />);
    const startStopButton = getByText("Start");
    const lapButton = getByText("Lap");
    const lapReset = getByText("Clear Lap");
    const lapList = getByTestId("lap-list");

    act(() => {
      fireEvent.click(startStopButton);
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(lapButton);
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(lapButton);
    });
    act(() => {
      fireEvent.click(lapReset);
    });

    expect(lapList.children).toHaveLength(0);
  });
});

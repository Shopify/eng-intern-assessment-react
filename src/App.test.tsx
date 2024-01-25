import React from "react";
import { fireEvent, render, act } from "@testing-library/react";
import App, { formatMs } from "./App";

it("formatMs calculates 1000ms correctly", () => {
  expect(formatMs(1000)).toEqual("00:01:000");
});

it("App timer measures 1 second correctly", async () => {
  jest.useFakeTimers();

  const { queryByText } = render(<App />);

  expect(queryByText("Start")).toBeTruthy();
  expect(queryByText("Stop")).toBeTruthy();

  act(() => {
    fireEvent.click(queryByText("Start"));
  });

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  act(() => {
    fireEvent.click(queryByText("Stop"));
  });

  expect(queryByText("00:01:000")).toBeTruthy();
});

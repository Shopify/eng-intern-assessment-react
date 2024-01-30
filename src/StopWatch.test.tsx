import StopWatch from "./StopWatch";
import { fireEvent, render } from "@testing-library/react";
import React from "react";

describe("Start timer function", () => {
  test("timer starts when start is called", () => {
    const stopWatchDom = render(<StopWatch />);
    // const setIntervalSpy = jest.spyOn(global, "setInterval");
    // const startButton = stopWatchDom.container.querySelector("#startButton");
  });
});

// test('starts timer when start button is clicked', () => {
//   const setIntervalSpy = jest.spyOn(global, 'setInterval');
//   render(<StopWatch />);

import { render, screen } from "@testing-library/react";
import React from "react";
import StopWatch from "../StopWatch";

describe("StopWatch renders properly", () => {
  it("StopWatch renders formatted time correctly", () => {
    render(<StopWatch formattedTime='14:23:54' />);
    const stopwatchTime = screen.getByTestId("stopwatch-time") as HTMLHeadingElement;
    expect(stopwatchTime.textContent).toEqual("14:23:54");
  });
});

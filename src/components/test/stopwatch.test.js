import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import StopWatch from "../StopWatch";

describe("<StopWatch />", () => {
  it("App initially renders", () => {
    const { getByText } = render(<StopWatch />);

    expect(getByText("Stopwatch App")).toBeInTheDocument();
    expect(getByText("Lap")).toBeInTheDocument();
    expect(getByText("Start")).toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
  });
});

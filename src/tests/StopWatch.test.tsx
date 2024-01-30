import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import StopWatch from "../components/StopWatch";

describe("Stopwatch", () => {
  test("render initial state", () => {
    render(<StopWatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  it.todo("should render 00:00:00");
  it.todo("should stop counting when the user clicks the stop button");
  it.todo("should reset to zero when the user clicks the reset button.");
  it.todo("should record and display laps when user clicks the lap button.");
});

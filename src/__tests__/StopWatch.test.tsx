import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../components/StopWatch";

test("renders StopWatch correctly", () => {
  const { getByText } = render(<StopWatch time={0} />);
  expect(getByText(/0.00/)).toBeInTheDocument();
});

// Test if the stopwatch displays the correct time when a non-zero time is passed as a prop
test("displays the correct time", () => {
  const { getByText } = render(<StopWatch time={60} />);
  expect(getByText(/1.00/)).toBeInTheDocument();
});

// Test if the stopwatch displays the correct time format
test("displays the correct time format", () => {
  const { getByText } = render(<StopWatch time={65} />);
  expect(getByText(/1.05/)).toBeInTheDocument();
});

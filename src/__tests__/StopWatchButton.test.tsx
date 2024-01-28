import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatchButton from "../components/StopWatchButton";

// Test if the StopWatchButton component calls the onClick handler when clicked
test("calls onClick handler when clicked", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <StopWatchButton label="Start" onClick={handleClick} />
  );
  fireEvent.click(getByText("Start"));
  expect(handleClick).toHaveBeenCalled();
});

// Test if the StopWatchButton component renders correctly with different labels
test("renders correctly with different labels", () => {
  const { getByText, rerender } = render(
    <StopWatchButton label="Start" onClick={() => {}} />
  );
  expect(getByText("Start")).toBeInTheDocument();

  rerender(<StopWatchButton label="Stop" onClick={() => {}} />);
  expect(getByText("Stop")).toBeInTheDocument();
});

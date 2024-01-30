/**
 * @jest-environment jsdom
 */

import React from "react";

import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import StopWatchButton from "../StopWatchButton";

test("string children are rendered", async () => {
  // ARRANGE
  render(<StopWatchButton>Start</StopWatchButton>);

  // ASSERT
  expect(screen.getByText("Start")).toBeInTheDocument();
});

test("jsx children are rendered", async () => {
  // ARRANGE
  render(
    <StopWatchButton>
      <div>
        <span>Start</span>
      </div>
    </StopWatchButton>
  );

  // ASSERT
  expect(screen.getByText("Start")).toBeInTheDocument();
});

test("onClick is called when clicked", async () => {
  // ARRANGE
  const onClick = jest.fn();
  render(<StopWatchButton onClick={onClick}>Start</StopWatchButton>);

  // ACT
  act(() => fireEvent.click(screen.getByText("Start")));

  // ASSERT
  expect(onClick).toHaveBeenCalled();
});

test("classNames extend pre-defined classNames", async () => {
  // ARRANGE
  render(<StopWatchButton className="bg-red-500">Start</StopWatchButton>);

  // ASSERT
  expect(screen.getByText("Start")).toHaveClass("bg-red-500");
});

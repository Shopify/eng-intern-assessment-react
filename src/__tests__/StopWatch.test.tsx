/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "./../StopWatch";
import React from "react";

test("loads and displays the correct time in mm:ss:msms", async () => {
  // ARRANGE
  render(<StopWatch timeInTenMillis={6000} />);

  // ASSERT
  expect(screen.getByText("01:00:00")).toBeInTheDocument();
});

test("loads and displays the correct time in mm:ss:msms", async () => {
  // ARRANGE
  render(<StopWatch timeInTenMillis={4512} />);

  // ASSERT
  expect(screen.getByText("00:45:12")).toBeInTheDocument();
});

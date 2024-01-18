import "@testing-library/jest-dom/";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StopWatch from "../src/StopWatch";

describe("Stopwatch", () => {
  it("renders initial state correctly", () => {
    render(<StopWatch />); // ARRANGE
    const timeElements = screen.getAllByText("00:"); // ACT
    expect(timeElements.length).toBe(2); // ASSERT - Expecting 2 elements for minutes and seconds
    const millisecondsElement = screen.getByText("00"); // For milliseconds
    expect(millisecondsElement).toBeInTheDocument();
  });
});

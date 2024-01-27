import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../StopWatch";

jest.useFakeTimers();

describe("StopWatch Component", () => {
  test("initially displays 00:00:00:00", () => {
    render(<StopWatch />);
    const timeElements = screen.getAllByText("00");
    expect(timeElements.length).toBeGreaterThanOrEqual(3);
  });
});

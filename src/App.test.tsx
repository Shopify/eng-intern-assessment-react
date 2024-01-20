/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Stopwatch Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should start the stopwatch", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    jest.advanceTimersByTime(1500);
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByText("00:00:01:50")).toBeInTheDocument();
  });

  test("should stop the stopwatch", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    jest.advanceTimersByTime(3250);
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByText("00:00:03:25")).toBeInTheDocument();
    jest.advanceTimersByTime(1250);
    expect(screen.getByText("00:00:03:25")).toBeInTheDocument(); // Time should not change
  });

  test("should reset the stopwatch", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    jest.advanceTimersByTime(5000);
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByText("00:00:05:00")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("00:00:00:00")).toBeInTheDocument();
  });

  test("should record laps", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    jest.advanceTimersByTime(1000);
    fireEvent.click(screen.getByText("Lap"));
    jest.advanceTimersByTime(2000);
    fireEvent.click(screen.getByText("Lap"));
    jest.advanceTimersByTime(0);
    fireEvent.click(screen.getByText("Lap"));
    const laps = screen.getAllByText(/\d+: \d+\:\d+\:\d+\:\d+/);
    expect(laps).toHaveLength(3);
    expect(laps[1]).toHaveTextContent("2: 00:00:01:00");
    expect(laps[2]).toHaveTextContent("3: 00:00:02:00");
  });
});

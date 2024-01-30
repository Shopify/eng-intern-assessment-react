import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import App from "../src/App";

describe("Reset Functionality Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("timer resets when reset button is clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Reset"));
    const timeAfterReset = screen.getByTestId("timer-display").textContent;
    expect(timeAfterReset).toBe("00:00:00:00");
  });

  test("pause and reset buttons dissapear after reset and main button text displays start", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByText("Pause")).not.toBeInTheDocument();
    expect(screen.queryByText("Lap")).not.toBeInTheDocument();
    expect(screen.queryByText("Reset")).not.toBeInTheDocument();
  });

  test("laps table no longer displayed after reset", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByText("Total Time")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByText("Pause")).not.toBeInTheDocument();
    expect(screen.queryByText("Lap")).not.toBeInTheDocument();
    expect(screen.queryByText("Reset")).not.toBeInTheDocument();
    expect(screen.queryByText("Total Time")).not.toBeInTheDocument();
  });
});

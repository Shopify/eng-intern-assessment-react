/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom"
import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react"
import StopWatch from "../StopWatch";

jest.useFakeTimers();

describe("StopWatch", () => {
  beforeEach(() => {
    render(<StopWatch/>);
  });

  test("Initial state at 0", () => {
    expect(screen.getByTestId("time-text")).toHaveTextContent("00:00.00");
  });

  // START BUTTON TEST
  test("Run stopwatch and display the correct time after pressing Start", () => {
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
    })
    act(() => {
      jest.advanceTimersByTime(10010);
    });
    expect(screen.getByTestId("time-text")).toHaveTextContent("00:10.01");
  });

  // STOP BUTTON TEST
  test("Freeze time after pressing Stop", () => {
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
    });
    act(() => {
      jest.advanceTimersByTime(1110);
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Stop" }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("time-text")).toHaveTextContent("00:01.11");
  });

  // START & STOP BUTTON TEST
  test("Start, Stop, Start", () => {
    const start = screen.getByRole("button", { name: "Start" });
    act(() => {
      fireEvent.click(start);
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Stop" }));
    });
    act(() => {
      fireEvent.click(start);
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByTestId("time-text")).toHaveTextContent("00:10.00");
  });

  // RESET BUTTON TEST
  test("Set time to 00:00.00 after pressing Reset", () => {
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Stop" }));
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    });
    expect(screen.getByTestId("time-text")).toHaveTextContent("00:00.00");
  });

  // LAP BUTTON TEST
  test("Display correct time after pressing Lap", () => {
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
    });
    act(() => {
      jest.advanceTimersByTime(1110);
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Lap" }));
    });
    // list item elements are dynamically loaded AFTER pressing "Lap"
    const listItemElements = screen.getAllByRole('listitem');    
    expect(listItemElements).toHaveLength(1);
    expect(listItemElements[0]).toHaveTextContent('LAP 1 00:01.11');
  });
});

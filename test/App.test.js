import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import React from "react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<App />);
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("render the initial StopWatch view", () => {
    expect(screen.getByText("00: 00: 00"));
  });
  test("render the intitial Buttons", () => {
    expect(screen.getByText("Start")).toBeTruthy();
    expect(screen.getByText("Reset")).toBeTruthy();
  });
  test("click the stop Button after start the timer", () => {
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText("Stop")).toBeTruthy();
    expect(screen.getByText("Lap")).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Stop"));
    //check if the button is changed to start and
    expect(screen.getByText("Start")).toBeTruthy();
    expect(screen.getByText("Reset")).toBeTruthy();
    expect(screen.getByText("00: 01: 00")).toBeTruthy();
  });
  test("click the lap Button after start the timer for 1 seconds", () => {
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText("Lap")).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByText("lap time: 00: 01: 00")).toBeTruthy();
  });
  test("click the start Button after stopping the timer", () => {
    fireEvent.click(screen.getByText("Start"));
    // advance the timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByText("00: 01: 00")).toBeTruthy();
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00: 02: 00")).toBeTruthy();
  });
  test("click the reset Button after stopping the timer", () => {
    fireEvent.click(screen.getByText("Start"));
    // advance the timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Stop"));
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("00: 00: 00")).toBeTruthy();
  });
});

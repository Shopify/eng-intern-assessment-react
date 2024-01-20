import React from "react";
import App from "../src/App";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";

describe("Stopwatch App Component", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("Render 00:00:00.000 starting state", () => {
    render(<App />);
    screen.getByText("Stopwatch");
    // Check each part of the starting time separately, starting with hours
    expect(screen.getByTestId("hours-1").textContent).toBe("0");
    expect(screen.getByTestId("hours-2").textContent).toBe("0");
    // Check minutes
    expect(screen.getByTestId("min-1").textContent).toBe("0");
    expect(screen.getByTestId("min-2").textContent).toBe("0");
    // Check seconds
    expect(screen.getByTestId("seconds-1").textContent).toBe("0");
    expect(screen.getByTestId("seconds-2").textContent).toBe("0");
    // Check Milliseconds
    expect(screen.getByTestId("ms-1").textContent).toBe("0");
    expect(screen.getByTestId("ms-2").textContent).toBe("0");
    expect(screen.getByTestId("ms-3").textContent).toBe("0");
  });

  test("Test reset button resets the timer", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByTestId("hours-1").textContent).toBe("0");
    expect(screen.getByTestId("hours-2").textContent).toBe("0");
    expect(screen.getByTestId("min-1").textContent).toBe("0");
    expect(screen.getByTestId("min-2").textContent).toBe("0");
    expect(screen.getByTestId("seconds-1").textContent).toBe("0");
    expect(screen.getByTestId("seconds-2").textContent).toBe("0");
    expect(screen.getByTestId("ms-1").textContent).toBe("0");
    expect(screen.getByTestId("ms-2").textContent).toBe("0");
    expect(screen.getByTestId("ms-3").textContent).toBe("0");
  });

  test("Test 1ms has passed", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1);
    });
    fireEvent.click(screen.getByText("Stop"));
    await waitFor(() => {
      expect(screen.getByTestId("ms-1").textContent).toBe("0");
      expect(screen.getByTestId("ms-2").textContent).toBe("0");
      expect(screen.getByTestId("ms-3").textContent).toBe("1");
    });
  });

  test("Test 1 second has passed", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByTestId("seconds-1").textContent).toBe("0");
    expect(screen.getByTestId("seconds-2").textContent).toBe("1");
  });

  test("Test 1 minute has passed", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByTestId("min-1").textContent).toBe("0");
    expect(screen.getByTestId("min-2").textContent).toBe("1");
  });

  test("Test 1 hour has passed", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3600000);
    });
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByTestId("hours-1").textContent).toBe("0");
    expect(screen.getByTestId("hours-2").textContent).toBe("1");
  });

  test("Test lap button records lap times", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Lap"));
    // Check if the lap time is displayed
    const lapTime = screen.getByText("00:00:01.000");
    expect(lapTime).toBeTruthy();
  });

  test("Test stopwatch accumulated time", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText("Stop"));
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByText("Stop"));
    expect(screen.getByTestId("seconds-1").textContent).toBe("0");
    expect(screen.getByTestId("seconds-2").textContent).toBe("3");
  });
});

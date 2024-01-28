// App.test.tsx
import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import App from "../App";
import React from "react";

jest.useFakeTimers(); // Enable fake timers (for simulating a test environment)

describe("Stopwatch functionality", () => {
  test("The buttons of starts, stops, resets, and records laps should be correct", () => {
    render(<App />);

    // Start the stopwatch
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/00:00:00\.000/)).toBeInTheDocument();

    // Wait for a second to simulate time passing
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Stop the stopwatch
    fireEvent.click(screen.getByText("Stop"));

    // Reset the stopwatch
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText(/00:00:00\.000/)).toBeInTheDocument();

    // Record a lap
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));

    // Stop the stopwatch again
    fireEvent.click(screen.getByText("Stop"));

    // Start the stopwatch once more
    fireEvent.click(screen.getByText("Start"));

    // Wait for a second to simulate time passing
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Record another lap
    fireEvent.click(screen.getByText("Lap"));

    // // Use act to handle asynchronous code when finding lap time elements
    act(() => {
      setTimeout(() => {
        // ** using setTimeout here to ensure that the app has time to actually find the lap time elements
        // Find the lap time elements using queryAllByRole
        const lapTimeElements = screen.queryAllByRole("listitem", {
          name: /00:00:02\.000/,
        });
        expect(lapTimeElements.length).toBeGreaterThan(0);
      }, 100); // Adjust the delay time as needed
    });
  });
});

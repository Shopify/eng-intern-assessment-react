import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import StopWatch from "../components/StopWatch/StopWatch";
import { getFormattedTime } from "../utils/time-formatter";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

// Setup fake timers before each test and clear all mocks after each test
beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllTimers();
});

// Test for conditional rendering of laps
test("renders laps conditionally", () => {
   render(<StopWatch />);

   // Initially, no laps should be displayed
   expect(screen.queryByTestId("laps-container")).not.toBeInTheDocument();

   // Start the timer
   fireEvent.click(screen.getByRole("button", { name: /start/i }));

   // Simulate time passage (e.g., 5 seconds)
   jest.advanceTimersByTime(5000);

   // Record a lap
   fireEvent.click(screen.getByRole("button", { name: /lap/i }));

   // Check if laps container is now present
   const lapsContainer = screen.getByTestId("laps-container");
   expect(lapsContainer).toBeInTheDocument();

   // Check if a lap is recorded inside the laps container
   const lapsList = within(lapsContainer).getAllByRole("listitem");
   expect(lapsList.length).toBe(1); // Expecting one lap recorded

   // Simulate more time passage and record another lap
   jest.advanceTimersByTime(5000);
   fireEvent.click(screen.getByRole("button", { name: /lap/i }));

   // Check if the second lap is recorded
   expect(within(lapsContainer).getAllByRole("listitem").length).toBe(2); // Now expecting two laps recorded
});

test("validates that the timer starts when the start button is activated", () => {
   const mockSetInterval = jest.spyOn(global, "setInterval");
   render(<StopWatch />);
   const buttonToStart = screen.getByRole("button", { name: /start/i });
   fireEvent.click(buttonToStart);
   jest.advanceTimersByTime(2000);
   expect(mockSetInterval).toBeCalledTimes(1);
   expect(mockSetInterval).lastCalledWith(expect.any(Function), 10);
});

test("validates that the timer halts when the stop button is activated", () => {
   const mockClearInterval = jest.spyOn(global, "clearInterval");
   const mockSetInterval = jest.spyOn(global, "setInterval").mockImplementation(() => 123 as unknown as NodeJS.Timeout);
   render(<StopWatch />);
   const buttonToStart = screen.getByRole("button", { name: /start/i });
   fireEvent.click(buttonToStart);
   jest.advanceTimersByTime(2000);
   const buttonToStop = screen.getByRole("button", { name: /stop/i });
   fireEvent.click(buttonToStop);
   expect(mockClearInterval).toBeCalledWith(123);
});

test("validates that the timer resets to initial state when the reset button is activated", () => {
   const { getByRole, getByText } = render(<StopWatch />);
   const buttonToStart = getByRole("button", { name: /start/i });
   fireEvent.click(buttonToStart);
   jest.advanceTimersByTime(2000);
   const buttonToReset = getByRole("button", { name: /reset/i });
   fireEvent.click(buttonToReset);
   expect(getByText("00:00.00")).toBeInTheDocument();
});
// Test get formatted time function~
describe("formatTime", () => {
   test("formats time less than an hour correctly", () => {
      // Testing times well below one hour
      expect(getFormattedTime(100)).toBe("00:01.00"); // 1 second
      expect(getFormattedTime(1500)).toBe("00:15.00"); // 15 seconds
      expect(getFormattedTime(30500)).toBe("05:05.00"); // 5 minutes, 5 seconds

      // Testing times approaching one hour
      expect(getFormattedTime(4700)).toBe("00:47.00"); // 47 seconds
      expect(getFormattedTime(6000)).toBe("01:00.00"); // 1 minute
      expect(getFormattedTime(359800)).toBe("59:58.00"); // 59 minutes, 58 seconds
   });

   test("formats time greater than an hour correctly", () => {
      // Testing times just over one hour
      expect(getFormattedTime(360100)).toBe("01:00:01.00"); // 1 hour, 1 second
      expect(getFormattedTime(366100)).toBe("01:01:01.00"); // 1 hour, 1 minute, 1 second

      // Testing times well over one hour
      expect(getFormattedTime(720000)).toBe("02:00:00.00"); // 2 hours
      expect(getFormattedTime(1080100)).toBe("03:00:01.00"); // 3 hours, 1 second
      expect(getFormattedTime(1440100)).toBe("04:00:01.00"); // 4 hours, 1 second
   });
});

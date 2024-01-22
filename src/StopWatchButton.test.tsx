import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import StopWatch from "./StopWatch";
import "@testing-library/jest-dom";

describe("StopWatch", () => {
  jest.useFakeTimers();

  test("starts timer when start button is clicked, pauses at 3 seconds, and verifies display", async () => {
    render(<StopWatch />);
    const start_pauseButton = screen.getByTestId("toggle-timer-button");
    fireEvent.click(start_pauseButton);

    act(() => {
      jest.advanceTimersByTime(1000); // Advance the timer by 1 second
    });

    const timeDisplayContainer = screen.getByTestId("time-display");
    expect(timeDisplayContainer.textContent).toMatch(/00:01:00/); //  regex to match time after 1s

    act(() => {
      jest.advanceTimersByTime(2000); // Advance the timer by 1 second
    });

    fireEvent.click(start_pauseButton);
    expect(timeDisplayContainer.textContent).toMatch(/00:03:00/); //  regex to match time after 1s
  });

  test("logs lap times correctly and updates current lap display", async () => {
    render(<StopWatch />);
    const start_pauseButton = screen.getByTestId("toggle-timer-button");
    fireEvent.click(start_pauseButton);

    const currentLapDisplay = screen.getByTestId("current-lap-display") //grab current lap timer


    act(() => {
      jest.advanceTimersByTime(1000); // Advance the timer by 1 second
    });

    expect(currentLapDisplay.textContent).toMatch(/00:01:00/); //  current lap should show 1s


    //grab lap button
    const lapButton = screen.getByTestId("toggle-timer-lap");

    fireEvent.click(lapButton); //log first lap time after 1s

    act(() => {
      jest.advanceTimersByTime(2000); // Advance the timer by 2s second
    });

    fireEvent.click(lapButton); //log 2nd lap time after 2s

    const allLaps = screen.getAllByTestId("lap-list-display"); //grab grab list of lap times

    expect(allLaps[0].textContent).toMatch(/00:01:00/); 
    expect(allLaps[1].textContent).toMatch(/00:02:00/); 

  });

  test("reset button resets state to 0, and stop timer", async () => {
    render(<StopWatch />);
    const timeDisplayContainer = screen.getByTestId("time-display");
    const start_pauseButton = screen.getByTestId("toggle-timer-button");
    const currentLapDisplay = screen.getByTestId("current-lap-display") //grab current lap timer

    fireEvent.click(start_pauseButton);

    const reset_button = screen.getByTestId("toggle-timer-reset") //grab reset button

    //elapse timer and log laps
    act(() => {
      jest.advanceTimersByTime(1000); // Advance the timer by 1 second
    });

    const lapButton = screen.getByTestId("toggle-timer-lap");

    fireEvent.click(lapButton);

    act(() => {
      jest.advanceTimersByTime(2000); // Advance the timer by 2s second
    });

    fireEvent.click(lapButton); //log 2nd lap time after 2s

    const allLaps = screen.getAllByTestId("lap-list-display"); //grab grab list of lap times

    fireEvent.click(reset_button);

    act(() => {
      jest.advanceTimersByTime(2000); // time display after reset should show 00:00:00 even after 2s
    });
    expect(timeDisplayContainer.textContent).toMatch(/00:00:00/); // prove timer remains 0 after reset
    expect(allLaps[0]).not.toBeInTheDocument();; //prove no lap list rendered after reset button
    expect(currentLapDisplay.textContent).toMatch(/00:00:00/); //current lap timer reset
  });

  

  afterEach(() => {
    jest.clearAllTimers();
  });
});

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import StopWatchButton from "../components/StopWatchButton";
import StopWatch from "../components/StopWatch";

describe("Rendering Stopwatch App", () => {
  test("Test 1: renders stopwatch and initial state correctly", () => {
    // on initial render, page should have the title "Stopwatch", "00:00:00.00", the start and reset buttons and the "Laps" title
    render(<App />);
    expect(screen.getByText(/stopwatch/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00:00.00/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByText(/laps/i)).toBeInTheDocument();
  });
});

describe("Rendering StopWatch", () => {
  test("Test 2: renders StopWatch component correctly for 1000ms", () => {
    // if the current time on the stopwatch is 1000ms, then it should be displayed as 00:00:01.00
    render(<StopWatch time={1000} />);
    expect(screen.getByText(/00:00:01.00/i)).toBeInTheDocument();
  });
  test("Test 3: renders StopWatch component correctly for 1234567ms", () => {
    render(<StopWatch time={1234567} />);
    expect(screen.getByText(/00:20:34.57/i)).toBeInTheDocument();
  });
});

describe("Rendering StopWatchButton", () => {
  test("Test 4: renders start button", () => {
    // if stopwatch is not currently counting up, then we should see the start button
    render(
      <StopWatchButton
        isCounting={false}
        currentLap={0}
        setIsCounting={() => {}}
        setTime={() => {}}
        setLaps={() => {}}
        setHasStartedStopwatch={() => {}}
        setCurrentLap={() => {}}
      />
    );
    const startButtonElement = screen.getByText(/start/i);
    expect(startButtonElement).toBeInTheDocument();
  });

  test("Test 5: renders reset button", () => {
    // if stopwatch is not currently counting up, then we should see the reset button
    render(
      <StopWatchButton
        isCounting={false}
        currentLap={0}
        setIsCounting={() => {}}
        setTime={() => {}}
        setLaps={() => {}}
        setHasStartedStopwatch={() => {}}
        setCurrentLap={() => {}}
      />
    );
    const resetButtonElement = screen.getByText(/reset/i);
    expect(resetButtonElement).toBeInTheDocument();
  });

  test("Test 6: renders stop button", () => {
    // if stopwatch is currently counting up, then we should see the stop button
    render(
      <StopWatchButton
        isCounting={true}
        currentLap={0}
        setIsCounting={() => {}}
        setTime={() => {}}
        setLaps={() => {}}
        setHasStartedStopwatch={() => {}}
        setCurrentLap={() => {}}
      />
    );
    const stopButtonElement = screen.getByText(/stop/i);
    expect(stopButtonElement).toBeInTheDocument();
  });

  test("Test 7: renders lap button", () => {
    // if stopwatch is currently counting up, then we should see the lap button
    render(
      <StopWatchButton
        isCounting={true}
        currentLap={0}
        setIsCounting={() => {}}
        setTime={() => {}}
        setLaps={() => {}}
        setHasStartedStopwatch={() => {}}
        setCurrentLap={() => {}}
      />
    );
    const lapButtonElement = screen.getByText(/lap/i);
    expect(lapButtonElement).toBeInTheDocument();
  });
});

// Before all tests, enable fake timers
beforeAll(() => {
  jest.useFakeTimers();
});

// After all tests, clear and reset fake timers
afterAll(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

// Test cases for functionality
describe("Stopwatch App - Start, Stop, Reset Functionalities", () => {
  test("Test 8: starts timer when start button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    act(() => {
      jest.advanceTimersByTime(1000); // Advance fake timers by 1 second
    });
    const timeDisplays = screen.getAllByText(/00:00:01.00/i);
    expect(timeDisplays.length).toBeGreaterThan(0); // Check that there is at least one element (same time could be displayed as overall time and the first lap)
  });

  test("Test 9: stops and resets the timer", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    // Simulate some time passing
    act(() => {
      jest.advanceTimersByTime(3000); // Advance fake timers by 3 seconds
    });
    fireEvent.click(screen.getByRole("button", { name: /stop/i })); // stop timer
    let timeDisplays = screen.getAllByText(/00:00:03.00/i); // should display 00:00:03.00
    expect(timeDisplays.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(screen.getByText(/00:00:00.00/i)).toBeInTheDocument();
  });
});

describe("Stopwatch App - Lap Functionality", () => {
  test("Test 10: records and resets lap correctly", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start/i })); // start stopwatch
    act(() => {
      jest.advanceTimersByTime(3000); // Advance timer by 3 seconds
    });
    fireEvent.click(screen.getByRole("button", { name: /lap/i })); // click lap at 3 seconds
    let timeDisplays = screen.getAllByText(/00:00:03.00/i);
    expect(timeDisplays.length).toEqual(2); // displayed as overall time and as the first lap time
    act(() => {
      jest.advanceTimersByTime(6000); // Advance timers by another 6 seconds
    });
    fireEvent.click(screen.getByRole("button", { name: /lap/i }));
    expect(screen.getByText(/00:00:09.00/i)).toBeInTheDocument(); // Check total time
    expect(screen.getByText(/00:00:06.00/i)).toBeInTheDocument(); // Check second lap time
  });

  test("Test 11: stops and resumes timer with correct lap time", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start/i })); // start stopwatch
    act(() => {
      jest.advanceTimersByTime(5000); // Advance timer by 5 seconds
    });
    fireEvent.click(screen.getByRole("button", { name: /stop/i }));
    let timeDisplays = screen.getAllByText(/00:00:05.00/i);
    expect(timeDisplays.length).toEqual(2); // displayed as overall time and as current lap time
    fireEvent.click(screen.getByText(/start/i)); // Resume timer
    act(() => {
      jest.advanceTimersByTime(3000); // Advance timer by another 3 seconds
    });
    fireEvent.click(screen.getByRole("button", { name: /lap/i })); // click lap (at 8 seconds)
    timeDisplays = screen.getAllByText(/00:00:08.00/i);
    expect(timeDisplays.length).toEqual(2); // displayed as the total time elapsed and as the first lap
  });
});

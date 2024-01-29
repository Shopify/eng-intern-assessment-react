import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";

describe("Rendering Stopwatch App", () => {
  test("renders stopwatch and initial state correctly", () => {
    render(<App />);
    expect(screen.getByText(/stopwatch/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00:00.00/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByText(/laps/i)).toBeInTheDocument();
  });
});

describe("Rendering StopWatch", () => {
  test("renders StopWatch component correctly for 1000ms", () => {
    render(<StopWatch time={1000} />);
    expect(screen.getByText(/00:00:01.00/i)).toBeInTheDocument();
  });
  test("renders StopWatch component correctly for 1234567ms", () => {
    render(<StopWatch time={1234567} />);
    expect(screen.getByText(/00:20:34.57/i)).toBeInTheDocument();
  });
});

describe("Rendering StopWatchButton", () => {
  test("renders start button", () => {
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

  test("renders reset button", () => {
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

  test("renders stop button", () => {
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

  test("renders lap button", () => {
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
  test("starts timer when start button is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    act(() => {
      jest.advanceTimersByTime(1000); // Advance fake timers by 1 second
    });
    const timeDisplays = screen.getAllByText(/00:00:01.00/i);
    expect(timeDisplays.length).toBeGreaterThan(0); // Check that there is at least one element (same time could be displayed as overall time and the first lap)
  });

  test("stops and resets the timer", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));
    // Simulate some time passing
    act(() => {
      jest.advanceTimersByTime(3000); // Advance fake timers by 1 second
    });
    fireEvent.click(screen.getByRole("button", { name: /stop/i }));
    let timeDisplays = screen.getAllByText(/00:00:03.00/i);
    expect(timeDisplays.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));
    expect(screen.getByText(/00:00:00/i)).toBeInTheDocument();
  });
});

describe("Stopwatch App - Lap Functionality", () => {
  test("records and resets lap correctly", () => {
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

  test("stops and resumes timer with correct lap time", () => {
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

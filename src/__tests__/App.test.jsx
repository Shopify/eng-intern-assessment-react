import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

jest.useFakeTimers();

test("Renders buttons", () => {
    render(<App />);

    const startButton = screen.getByRole("button", {
        name: /Start/i,
    });
    const resetButton = screen.getByRole("button", {
        name: /Reset/i,
    });
    const lapButton = screen.getByRole("button", {
        name: /Lap/i,
    });
    // Assert that there are 3 buttons
    const allButtons = screen.getAllByRole("button");

    expect(allButtons.length).toEqual(3);

    // Assert that the buttons are in the document
    expect(startButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(lapButton).toBeInTheDocument();
});

test("Start and stop button functionality", () => {
    render(<App />);

    const startButton = screen.getByRole("button", {
        name: /Start/i,
    });
    const resetButton = screen.getByRole("button", {
        name: /Reset/i,
    });
    const lapButton = screen.getByRole("button", {
        name: /Lap/i,
    });
    fireEvent.click(startButton);

    // Test 1 second
    act(() => {
        jest.advanceTimersByTime(1000);
    });

    const stopButton = screen.getByRole("button", {
        name: /Stop/i,
    });

    // Assert stop button is present
    expect(stopButton).toBeInTheDocument();

    fireEvent.click(stopButton);

    // Assert the time is 0:1.00 and start button is present
    expect(screen.getByText(/0:1.00/i)).toBeInTheDocument();
    expect(
        screen.getByRole("button", {
            name: /Start/i,
        })
    ).toBeInTheDocument();

    // Test 2.5 seconds
    fireEvent.click(startButton);
    act(() => {
        jest.advanceTimersByTime(1500);
    });

    // Assert stop button is present
    expect(
        screen.getByRole("button", {
            name: /Stop/i,
        })
    ).toBeInTheDocument();

    fireEvent.click(stopButton);

    // Assert the time is 0:2.50 and start button is present
    expect(screen.getByText(/0:2.50/i)).toBeInTheDocument();
    expect(
        screen.getByRole("button", {
            name: /Start/i,
        })
    ).toBeInTheDocument();
});

test("Lap button functionality", () => {
    render(<App />);

    const startButton = screen.getByRole("button", {
        name: /Start/i,
    });
    const resetButton = screen.getByRole("button", {
        name: /Reset/i,
    });
    const lapButton = screen.getByRole("button", {
        name: /Lap/i,
    });

    // Assert that after 1000 milliseconds
    // The total time is 1 second and the lap time is 1 second
    fireEvent.click(startButton);

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    fireEvent.click(lapButton);
    // Time needed before screen updates
    act(() => {
        jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Lap 1:/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Time: 0:1.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Lap Time: 0:1.00/i)).toBeInTheDocument();

    // Assert that after 1000 milliseconds, 1000 milliseconds and 500 milliseconds
    // The total time is 2.50 seconds and the lap time is 1.50 seconds
    act(() => {
        jest.advanceTimersByTime(500);
    });

    fireEvent.click(lapButton);
    act(() => {
        jest.advanceTimersByTime(1);
    });
    expect(screen.getByText(/Lap 2:/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Time: 0:2.50/i)).toBeInTheDocument();
    expect(screen.getByText(/Lap Time: 0:1.50/i)).toBeInTheDocument();
});

test("Reset button functionality", () => {
    render(<App />);

    const startButton = screen.getByRole("button", {
        name: /Start/i,
    });
    const resetButton = screen.getByRole("button", {
        name: /Reset/i,
    });

    // Assert that reset button sets time back to 0
    fireEvent.click(startButton);

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    fireEvent.click(resetButton);

    expect(screen.getByText(/0:0.00/i)).toBeInTheDocument();

    // Assert that there are no laps times after reset button is triggered
    // Assert that start button is present after reset button is triggered
    const lapButton = screen.getByRole("button", {
        name: /Lap/i,
    });

    fireEvent.click(startButton);
    act(() => {
        jest.advanceTimersByTime(1000);
    });
    fireEvent.click(lapButton);
    fireEvent.click(resetButton);
    expect(screen.queryByText(/Lap 1:/i)).not.toBeInTheDocument();
    expect(
        screen.getByRole("button", {
            name: /Start/i,
        })
    ).toBeInTheDocument();
});

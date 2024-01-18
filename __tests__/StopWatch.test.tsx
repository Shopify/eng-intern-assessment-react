import "@testing-library/jest-dom/";
import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent, within } from "@testing-library/react";
import StopWatch from "../src/StopWatch";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

describe("Stopwatch", () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated but still in use in some browsers
        removeListener: jest.fn(), // Deprecated but still in use in some browsers
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });
  });
  it("renders initial state correctly", () => {
    render(<StopWatch />); // ARRANGE
    const timeElements = screen.getAllByText("00:"); // ACT
    expect(timeElements.length).toBe(2); // ASSERT - Expecting 2 elements for minutes and seconds
    const millisecondsElement = screen.getByText("00"); // For milliseconds
    expect(millisecondsElement).toBeInTheDocument();
  });
  it("starts and pauses the stopwatch correctly and displays time", async () => {
    jest.useFakeTimers();
    render(<StopWatch />);

    const startButton = await screen.findByTestId("playButton");
    fireEvent.click(startButton);

    // Wrap the timer advancement and assertions in act()
    act(() => {
      // Advance the timers by 2 seconds
      jest.advanceTimersByTime(2000);
    });

    // Click the pause button
    fireEvent.click(startButton);

    // Assertions
    const minutesElement = screen.getByText("00:");
    const secondsElement = screen.getByText("02:");
    const millisecondsElement = screen.getByText("00");

    expect(minutesElement).toBeInTheDocument();
    expect(secondsElement).toBeInTheDocument();
    expect(millisecondsElement).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("resets the stopwatch correctly", async () => {
    jest.useFakeTimers();
    render(<StopWatch />);

    const resetButton = await screen.findByTestId("resetButton");
    fireEvent.click(resetButton);

    // Wrap the timer advancement and assertions in act()
    act(() => {
      // Advance the timers by 2 seconds
      jest.advanceTimersByTime(2000);
    });

    // Click the pause button
    fireEvent.click(resetButton);

    // Assertions
    const timeElements = screen.getAllByText("00:"); // ACT
    expect(timeElements.length).toBe(2); // ASSERT - Expecting 2 elements for minutes and seconds
    const millisecondsElement = screen.getByText("00"); // For milliseconds
    expect(millisecondsElement).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("records laps correctly", async () => {
    jest.useFakeTimers();
    render(
      <AppProvider i18n={enTranslations}>
        <StopWatch />
      </AppProvider>
    );

    const startButton = await screen.findByTestId("playButton");
    fireEvent.click(startButton);

    // Advance the timers to 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const lapButton = await screen.findByTestId("lapButton");
    fireEvent.click(lapButton);

    // Check if the first lap is recorded correctly
    let lapRows = screen.getAllByRole("row");
    expect(lapRows).toHaveLength(2); // Including header row

    let lapData = within(lapRows[1]).getAllByRole("cell");
    expect(lapData[0]).toHaveTextContent("+00:02:00"); // Check the lap time
    expect(lapData[1]).toHaveTextContent("00:02:00"); // Check the total time

    // Advance the timers by another 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.click(lapButton);

    // Check if the second lap is recorded correctly
    lapRows = screen.getAllByRole("row");
    expect(lapRows).toHaveLength(3); // Now including two lap rows

    lapData = within(lapRows[1]).getAllByRole("cell");
    expect(lapData[0]).toHaveTextContent("+00:02:99"); // Check the second lap time
    expect(lapData[1]).toHaveTextContent("00:04:99"); // Check the total time after second lap

    jest.useRealTimers();
  });
});

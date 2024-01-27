import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../components/StopWatch";

jest.useFakeTimers();

describe("StopWatch Component", () => {
  beforeEach(() => {
    render(<StopWatch />);
  });

  test("initially displays 00:00:00", () => {
    expect(
      screen.getByText("00", { selector: ".minutes" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("00", { selector: ".seconds" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("00", { selector: ".milliseconds" })
    ).toBeInTheDocument();
  });

  test("starts timer when start button is clicked", () => {
    fireEvent.click(screen.getByLabelText("Start Timer"));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(
      screen.getByText("00", { selector: ".minutes" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("01", { selector: ".seconds" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("00", { selector: ".milliseconds" })
    ).toBeInTheDocument();
  });

  test("stops timer when stop button is clicked", () => {
    fireEvent.click(screen.getByLabelText("Start Timer"));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByLabelText("Stop Timer"));
    const minutes = screen.getByText("00", {
      selector: ".minutes",
    }).textContent;
    const seconds = screen.getByText("02", {
      selector: ".seconds",
    }).textContent;
    const milliseconds = screen.getByText("00", {
      selector: ".milliseconds",
    }).textContent;
    expect(minutes).toBe("00");
    expect(seconds).toBe("02");
    expect(milliseconds).toBe("00");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // Verify timer hasn't advanced
    expect(screen.getByText("02", { selector: ".seconds" }).textContent).toBe(
      seconds
    );
  });

  test("records multiple laps", () => {
    fireEvent.click(screen.getByLabelText("Start Timer"));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    fireEvent.click(screen.getByLabelText("Record Lap"));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByLabelText("Record Lap"));

    const firstLap = screen.getByTestId("lap-0");
    const secondLap = screen.getByTestId("lap-1");
    expect(firstLap).toBeInTheDocument();
    expect(secondLap).toBeInTheDocument();
  });

  test("resets the timer and laps when reset button is clicked", () => {
    fireEvent.click(screen.getByLabelText("Start Timer"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(screen.getByLabelText("Record Lap"));
    fireEvent.click(screen.getByLabelText("Reset Timer"));
    expect(
      screen.getByText("00", { selector: ".minutes" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("00", { selector: ".seconds" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("00", { selector: ".milliseconds" })
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId("lap").length).toBe(0);
  });
});

import "@testing-library/jest-dom";

import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";

import App from "../src/App";
import React from "react";

describe("App Component Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("laps table appears after the timer is started and the laps button is pressed", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByText("Total Time")).toBeInTheDocument();
  });

  test("laps are listed in the correct order and display the correct values", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Start"));

    for (let i = 1; i <= 5; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      act(() => {
        fireEvent.click(screen.getByRole("button", { name: "Lap" }));
      });
    }

    await waitFor(() => {
      const lapRows = screen.getAllByRole("row");

      lapRows.forEach((row, index) => {
        // Skip the header row by starting checks from the first data row
        if (index > 0) {
          const lapRow = row as HTMLTableRowElement;
          expect(lapRow.cells[0].textContent).toBe(`${index}`);
          expect(lapRow.cells[1].textContent).toBe(`00:00:01:00`);
          expect(lapRow.cells[2].textContent).toBe(`00:00:0${index}:00`);
        }
      });
    });
  });
});

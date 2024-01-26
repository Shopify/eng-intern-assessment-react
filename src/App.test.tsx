import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

jest.useFakeTimers();

describe("App", () => {
  it("increments the timer after start is pressed", async () => {
    const { getByText, getByTestId } = render(<App />);
    const startButton = getByText("start");

    // Press start button
    act(() => {
      fireEvent.click(startButton);
    });

    // Check that the timer is no longer 00:00:00
    await waitFor(
      () => {
        const timer = getByTestId("stopwatch-text");
        expect(timer.textContent).not.toBe("00:00:00");
      },
      { timeout: 1000 }
    );
  });
});

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Start button is functional", () => {
	// Use fake timers to jump time instantly.
	jest.useFakeTimers();

	// Render the component being tested.
	render(<StopWatch />);

	// Get the relevant items by their test IDs.
	const timer = screen.getByTestId("timer");
	const startButton = screen.getByTestId("start");

	// Wrap events that change state in the act() function
	act(() => {
		// Press the start button
		fireEvent.click(startButton);

		// Run the fake timer to skip the below 15 second wait.
		jest.runAllTimers();

		// Wait for 15 seconds and check if the timer shows that 15 seconds have elapsed
		setTimeout(() => {
			expect(timer.textContent).toContain("00:00:15.00");
		}, 15000);
	});
});

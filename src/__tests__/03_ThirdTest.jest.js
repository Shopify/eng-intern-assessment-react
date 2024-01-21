import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Stop button is functional", () => {
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

		// Wait for 6 seconds, press the stop button and check that the time elapsed is 6 seconds.
		setTimeout(() => {
			const stopButton = screen.getByTestId("stop");
			fireEvent.click(stopButton);
			expect(timer.textContent).toContain("00:00:06.00");
		}, 6000);
	});
});

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Lap button is functional", () => {
	// Use fake timers to jump time instantly.
	jest.useFakeTimers();

	// Render the component being tested.
	render(<StopWatch />);

	// Get the relevant items by their test IDs.
	const startButton = screen.getByTestId("start");
	const lapButton = screen.getByTestId("lap");
	const lapsList = screen.getByTestId("lapslist");

	// Wrap events that change state in the act() function
	act(() => {
		// Press the start button
		fireEvent.click(startButton);

		// Run the fake timer to skip the below 15 second wait.
		jest.runAllTimers();

		// Wait for 1 second, press the lap button 5 times and ensure that 5 laps have been added as children to the <ol> element.
		setTimeout(() => {
			let i = 0;
			setInterval(() => {
				if (i < 5) {
					fireEvent.click(lapButton);
				}
			}, 500);
			console.log(lapsList.childElementCount);
			expect(lapsList.childElementCount).toBe(5);
		}, 1000);
	});
});

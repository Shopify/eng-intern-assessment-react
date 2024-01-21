import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Stop button is functional", () => {
	jest.useFakeTimers();
	render(<StopWatch />);

	const timer = screen.getByTestId("timer");
	const startButton = screen.getByTestId("start");

	act(() => {
		fireEvent.click(startButton);
		jest.runAllTimers();

		setTimeout(() => {
			const stopButton = screen.getByTestId("stop");
			fireEvent.click(stopButton);
			expect(timer.textContent).toContain("00:00:06.00");
		}, 6000);
	});
});

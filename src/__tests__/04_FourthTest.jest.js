import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Reset button is functional", () => {
	jest.useFakeTimers();
	render(<StopWatch />);

	const timer = screen.getByTestId("timer");
	const startButton = screen.getByTestId("start");
	const resetButton = screen.getByTestId("reset");

	act(() => {
		fireEvent.click(startButton);
		jest.runAllTimers();

		setTimeout(() => {
			fireEvent.click(resetButton);
			expect(timer.textContent).toContain("00:00:00.00");
		}, 6000);
	});
});

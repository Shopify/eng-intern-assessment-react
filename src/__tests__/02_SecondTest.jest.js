import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Start button is functional", () => {
	jest.useFakeTimers();
	render(<StopWatch />);

	const timer = screen.getByTestId("timer");
	const startButton = screen.getByTestId("start");

	act(() => {
		fireEvent.click(startButton);
		jest.runAllTimers();

		setTimeout(() => {
			expect(timer.textContent).toContain("00:00:15.00");
		}, 15000);
	});
});

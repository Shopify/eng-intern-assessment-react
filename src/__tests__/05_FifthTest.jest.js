import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";
import { act } from "react-dom/test-utils";

/**
 * @jest-environment jsdom
 */

test("Lap button is functional", () => {
	render(<StopWatch />);
	jest.useFakeTimers();

	const startButton = screen.getByTestId("start");
	const lapButton = screen.getByTestId("lap");
	const lapsList = screen.getByTestId("lapslist");

	act(() => {
		fireEvent.click(startButton);
		jest.runAllTimers();

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

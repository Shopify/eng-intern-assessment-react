import StopWatch from "./StopWatch";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { screen } from "@testing-library/dom";

describe("Stopwatch", () => {
	// TEST START/STOP FUNCTIONALITY
	// test change of isRunning state upon clicking "Stop/Start" button
	it("converts button text to 'stop' on first click then 'start' on subsequent click", () => {
		render(<StopWatch />);
		const startButton = screen.getByText(/start/i);
		fireEvent.click(startButton);
		expect(screen.getByText(/stop/i)).toBeInTheDocument();

		fireEvent.click(startButton);
		expect(screen.getByText(/start/i)).toBeInTheDocument();
	});

	// test change of "time" state
	it("displays incrementing time", () => {
		const { container } = render(<StopWatch />);
		const timer = container.querySelector(".ms");
		const startButton = screen.getByText(/start/i);
		fireEvent.click(startButton);
		setTimeout(expect(timer).not.toBe("00"), 500);
	});

	//test reset function
	it("resets time to zero", () => {
		const { container } = render(<StopWatch />);
		let timer;
		const startButton = screen.getByText(/start/i);
		const resetButton = screen.getByText(/reset/i);
		fireEvent.click(startButton);
		setTimeout(() => {
			timer = container.querySelector(".ms");
			fireEvent.click(resetButton);
			expect(timer).toBe("00");
		}, 500);
	});

	//test change of isShowing with lap button
	it("shows laps when laps button is clicked", () => {
		const { container } = render(<StopWatch />);
		const lapButton = screen.getByText(/laps/i);
		fireEvent.click(lapButton);
		expect(container.querySelector(".laps")).toBeInTheDocument();
	});
});

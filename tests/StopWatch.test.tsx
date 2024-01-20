import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import StopWatch from "../src/StopWatch";

//Start and Stop testing
test("test start and stop", () => {
	let testData: string[] = [];
	const updateTimeshowcase = (lapData: string[]) => {
		testData = lapData;
	};
	const { getByText } = render(
		<StopWatch updateTimeshowcase={updateTimeshowcase} />
	);

	// Start the stopwatch
	fireEvent.click(getByText("Start"));

	// Check if the stopwatch is running
	expect(getByText("Stop")).toBeTruthy();

	// Stop the stopwatch
	fireEvent.click(getByText("Stop"));

	// Check if the stopwatch has stopped
	expect(getByText("Start")).toBeTruthy();
});

//Start and abrupt Reset testing
test("test start and reset", () => {
	let testData: string[] = [];
	const updateTimeshowcase = (lapData: string[]) => {
		testData = lapData;
	};
	const { getByText } = render(
		<StopWatch updateTimeshowcase={updateTimeshowcase} />
	);

	// Start the stopwatch
	fireEvent.click(getByText("Start"));

	// Check if the stopwatch is running
	expect(getByText("Stop")).toBeTruthy();

	// Reset the stopwatch
	fireEvent.click(getByText("Reset"));

	// Check if the stopwatch has stopped
	expect(getByText("Start")).toBeTruthy();
	expect(getByText("00:00:00.00")).toBeTruthy();
});

//Start and Lap testing
test("test lap functionality", () => {
	let testData: string[] = [];
	const updateTimeshowcase = (lapData: string[]) => {
		testData = lapData;
	};
	const { getByText } = render(
		<StopWatch updateTimeshowcase={updateTimeshowcase} />
	);

	// Start the stopwatch
	fireEvent.click(getByText("Start"));

	// Check if the stopwatch is running
	expect(getByText("Stop")).toBeTruthy();

	// Add a lap
	fireEvent.click(getByText("Lap"));

	// Check if a lap was added
	expect(testData.length).toBe(1);

	// Stop the stopwatch
	fireEvent.click(getByText("Stop"));

	// Check if the stopwatch has stopped
	expect(getByText("Start")).toBeTruthy();
});

//Start and Lap testing with multiple laps
test("test lap functionality", async () => {
	// Make the function async
	let testData: string[] = [];
	const updateTimeshowcase = (lapData: string[]) => {
		testData = lapData;
	};
	const { getByText } = render(
		<StopWatch updateTimeshowcase={updateTimeshowcase} />
	);

	await act(async () => {
		// Wrap your fireEvent calls in an act function
		// Start the stopwatch
		fireEvent.click(getByText("Start"));

		// Add 50 laps with a 300ms delay between each
		for (let i = 0; i < 50; i++) {
			fireEvent.click(getByText("Lap"));
			await new Promise((r) => setTimeout(r, 300)); // Add a delay
		}
	});

	// Check if 50 laps were added
	expect(testData.length).toBe(50);

	// Stop the stopwatch
	fireEvent.click(getByText("Stop"));

	// Check if the stopwatch has stopped
	expect(getByText("Start")).toBeTruthy();

	// Reset the stopwatch
	fireEvent.click(getByText("Reset"));
	// Check if the stopwatch has emptied the laps
	expect(testData.length).toBe(0);
	expect(getByText("00:00:00.00")).toBeTruthy();
}, 35000);

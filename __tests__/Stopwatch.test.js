import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import StopWatch from "../src/StopWatch";
import StopWatchButton from "../src/StopWatchButton";
import App from "../src/App";

const getFormattedTime = () => {
	const hours = screen.getByTestId("hours").textContent;
	const minutes = screen.getByTestId("minutes").textContent;
	const seconds = screen.getByTestId("seconds").textContent;
	const centiseconds = screen.getByTestId("centiseconds").textContent;

	return `${hours}:${minutes}:${seconds}:${centiseconds}`;
};

describe("Stopwatch", () => {
	test("renders initial state correctly", () => {
		render(<StopWatch />);

		// Check each individually since I am not displaying them as one string
		expect(screen.getByTestId("hours").textContent).toBe("00");
		expect(screen.getByTestId("minutes").textContent).toBe("00");
		expect(screen.getByTestId("seconds").textContent).toBe("00");
		expect(screen.getByTestId("centiseconds").textContent).toBe("00");

		const time = getFormattedTime();
		expect(time).toBe("00:00:00:00");
	});

	test("starts and stops the stopwatch", () => {
		render(<App />);
		expect(screen.queryByText("STOP")).not.toBeInTheDocument();
		fireEvent.click(screen.getByText("START"));
		expect(screen.queryByText("START")).not.toBeInTheDocument();
		fireEvent.click(screen.getByText("STOP"));
	});

	test("pauses and resumes the stopwatch", () => {
		render(<App />);

		fireEvent.click(screen.getByText("START"));
		fireEvent.click(screen.getByText("STOP"));

		const pausedTime = getFormattedTime();
		fireEvent.click(screen.getByText("START"));

		const time = getFormattedTime();
		expect(time).toBe(pausedTime);
	});

	test("records and displays lap times", () => {
		render(<App />);

		fireEvent.click(screen.getByText("START"));
		fireEvent.click(screen.getByText("LAP"));
		expect(screen.getByTestId("lap-list")).toContainElement(
			screen.getByText(/(\d{2}:){2}\d{2}/)
		);

		fireEvent.click(screen.getByText("LAP"));
		expect(screen.getByTestId("lap-list").children.length).toBe(2);
	});

	test("resets the stopwatch", () => {
		render(<App />);

		fireEvent.click(screen.getByText("START"));
		fireEvent.click(screen.getByText("LAP"));
		fireEvent.click(screen.getByText("STOP"));
		fireEvent.click(screen.getByText("RESET"));

		const time = getFormattedTime();
		expect(time).toBe("00:00:00:00");
		expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
	});
});

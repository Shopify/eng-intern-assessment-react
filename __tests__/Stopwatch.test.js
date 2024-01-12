/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Stopwatch from "../src/StopWatch";

const sleep = (ms) => new Promise((resolve, _) => setTimeout(resolve, ms));

describe("Stopwatch", () => {
	test("renders initial state correctly", () => {
		render(<Stopwatch />);

		expect(screen.getByText("00:00:00")).toBeInTheDocument();
		expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
	});

	test("starts and stops the stopwatch", async () => {
		render(<Stopwatch />);

		fireEvent.click(screen.getByText("Start"));
		await sleep(100);
		fireEvent.click(screen.getByText("Stop"));
		const pausedTime = screen.getByText(/\d{2}:\d{2}:\d{2}/).textContent;

		fireEvent.click(screen.getByText("Start"));
		await sleep(100);
		expect(screen.getByText(/\d{2}:\d{2}:\d{2}/).textContent).not.toBe(
			pausedTime,
		);
	});

	test("records and displays lap times", async () => {
		render(<Stopwatch />);

		fireEvent.click(screen.getByText("Start"));
		await sleep(100);
		fireEvent.click(screen.getByText("Lap"));
		expect(screen.getByTestId("lap-list")).toHaveTextContent(
			/\d{2}:\d{2}:\d{2}/,
		);

		fireEvent.click(screen.getByText("Lap"));
		await sleep(100);
		expect(screen.getByTestId("lap-list").children.length).toBe(2);
	});

	test("resets the stopwatch", () => {
		render(<Stopwatch />);

		fireEvent.click(screen.getByText("Start"));
		fireEvent.click(screen.getByText("Lap"));
		fireEvent.click(screen.getByText("Reset"));

		expect(screen.getByText("00:00:00")).toBeInTheDocument();
		expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
	});
});

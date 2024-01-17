/**
 * @jest-environment jsdom
 */

import React from "react";
import StopWatchButton from "./StopWatchButton";
import { render, screen } from "@testing-library/react";

test("stop and reset buttons hidden when timer does not exist", () => {
	render(
		<StopWatchButton
			timerState={{
				exists: false,
				time: 0,
				isPaused: true,
			}}
		/>
	);

	// only the start button should show
	expect(screen.queryByTestId("pause")).toBeNull();
	expect(screen.queryByTestId("lap")).toBeNull();
	expect(screen.queryByTestId("reset")).toBeNull();
	expect(screen.queryByTestId("start")).not.toBeNull();
});

test("pause button shows correct text when paused", () => {
	render(
		<StopWatchButton
			timerState={{
				exists: true,
				time: 1000,
				isPaused: true,
			}}
		/>
	);

	// should say unpause
	expect(screen.getByTestId("pause").textContent).toBe("Unpause");
});

test("pause button shows correct text when running", () => {
	render(
		<StopWatchButton
			timerState={{
				exists: true,
				time: 1000,
				isPaused: false,
			}}
		/>
	);

	// should say unpause
	expect(screen.getByTestId("pause").textContent).toBe("Stop");
});

import { fireEvent, render, screen } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";
import React from "react";

// CORRECT RENDER OF COMPONENTS

describe("Stopwatch button", () => {
	// BUTTON CLICK CALLS A FUNCTION
	it("calls clickHandler function", () => {
		const clickHandler = jest.fn();
		render(
			<StopWatchButton
				text="start"
				className="button--start"
				clickHandler={clickHandler}
			/>
		);
		fireEvent.click(screen.getByRole("button"));
		expect(clickHandler).toHaveBeenCalled();
	});
});

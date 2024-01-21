import React from "react";
import { render, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";

/**
 * @jest-environment jsdom
 */

test("Title is rendered", () => {
	// Render the component being tested.
	render(<StopWatch />);

	// Get the relevant items by their test IDs.
	const title = screen.getByTestId("title");
	// Check if the component renders correctly by seeing if the title renders correctly.
	expect(title.textContent).toBe("Frontend Engineering Technical Challenge");
});

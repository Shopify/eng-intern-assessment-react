import React from "react";
import { render, screen } from "@testing-library/react";
import StopWatch from "../StopWatch";

/**
 * @jest-environment jsdom
 */

test("Title is rendered", () => {
	render(<StopWatch />);

	const title = screen.getByTestId("title");
	expect(title.textContent).toBe("Frontend Engineering Technical Challenge");
});

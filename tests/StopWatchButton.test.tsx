import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "../src/StopWatchButton";

describe("Stopwatch Button Component", () => {
	it("Test: Render test", () => {
		render(<StopWatchButton label="Test" methodCall={() => {}} />);
	});
	it("Test: methodCall when button is clicked", () => {
		const mockMethodCall = jest.fn();
		const { getByText } = render(
			<StopWatchButton label="Test" methodCall={mockMethodCall} />
		);
		fireEvent.click(getByText("Test"));
		expect(mockMethodCall).toHaveBeenCalled();
	});
});

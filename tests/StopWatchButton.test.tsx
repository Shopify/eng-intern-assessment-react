import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "../src/StopWatchButton";

describe("StopWatchButton Component", () => {
	it("renders without crashing", () => {
		render(<StopWatchButton label="Test" methodCall={() => {}} />);
	});
	it("calls methodCall when button is clicked", () => {
		const mockMethodCall = jest.fn();
		const { getByText } = render(
			<StopWatchButton label="Test" methodCall={mockMethodCall} />
		);
		fireEvent.click(getByText("Test"));
		expect(mockMethodCall).toHaveBeenCalled();
	});
});

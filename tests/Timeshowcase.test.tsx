import React from "react";
import { render, fireEvent, act, getByText } from "@testing-library/react";
import Timeshowcase from "../src/Timeshowcase";

//Render test
describe("Timeshowcase Component", () => {
	it("Test: Render test", () => {
		let testData: string[] = [];

		render(<Timeshowcase lapData={testData} />);
	});
});

// Timeshowcase display test
test("Test: Timeshowcase display test", () => {
	let testData: string[] = [
		"00:00:01.23",
		"00:00:02.45",
		"00:00:03.67",
		"00:00:04.89",
		"00:00:06.01",
		"00:00:07.23",
		"00:00:08.45",
	];

	const { getByText } = render(<Timeshowcase lapData={testData} />);
	expect(getByText("00:00:01.23")).toBeTruthy();
	expect(getByText("00:00:07.23")).toBeTruthy();
});

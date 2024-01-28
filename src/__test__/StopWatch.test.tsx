import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../StopWatch";

test("Number display renders with initial value", () => {
    render(<StopWatch time={0} />);
    const numberDisplay = screen.getByText("00:00.00");
    expect(numberDisplay).toBeInTheDocument();
});

test("Number display updates with correct value", () => {
    render(<StopWatch time={1240} />);
    const updatedNumberDisplay = screen.getByText("00:01.24");
    expect(updatedNumberDisplay).toBeInTheDocument();
});

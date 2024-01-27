/**
* @jest-environment jsdom
*/

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopWatch from "../components/StopWatch";

test("Should render time component", () => {
    render(<StopWatch />);
    const timeElement = screen.getByTestId("timer-text");
    expect(timeElement).toBeInTheDocument();
})
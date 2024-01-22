import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import StopWatchButton from "./StopWatchButton";

const nameOfButton = "startButton";
const handleFn = jest.fn();

beforeEach(() => {
  render(<StopWatchButton name={nameOfButton} onClick={handleFn} />);
});

test("displays a button element with its name", () => {
  expect(screen.getByText(nameOfButton)).toBeInTheDocument();
});

test("calls the handle function when the button is clicked", async () => {
  await userEvent.click(screen.getByText(nameOfButton));
  expect(handleFn).toHaveBeenCalledTimes(1);
});

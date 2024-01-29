import React from "react";
import { StopWatchButton } from "../StopWatchButton";
import { render, screen, fireEvent } from "@testing-library/react";

test("renders a stop watch button", () => {
  render(<StopWatchButton>Stop</StopWatchButton>);
  const buttonElement = screen.getByText(/Stop/i);
  expect(buttonElement).toBeDefined();
});

test("handles an onClick", () => {
  // stub function -> helps track how often onClick is called
  const onClick = jest.fn();
  render(<StopWatchButton onClick={onClick}>Reset</StopWatchButton>);
  const buttonElement = screen.getByText(/Reset/i);
  // simulate a click on the button element
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

it("renders the text passed to it", () => {
  const { queryByText } = render(
    <StopWatchButton>Lorem Ipsum</StopWatchButton>,
  );

  expect(queryByText(/Lorem Ipsum/i)).toBeTruthy();
});

it("fires the callback passed to it when clicked", () => {
  const mockCallback = jest.fn((x) => 42 + x);

  const { queryByText } = render(
    <StopWatchButton onClick={mockCallback}>Lorem Ipsum</StopWatchButton>,
  );

  expect(queryByText(/Lorem Ipsum/i)).toBeTruthy();

  fireEvent.click(queryByText(/Lorem Ipsum/i));

  expect(mockCallback.mock.calls).toHaveLength(1);
});

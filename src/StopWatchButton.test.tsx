import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

describe("StopWatchButton functionality", () => {
  test("onClick function is called when button is clicked", () => {
    // Mock onClick function
    const onClick = jest.fn();

    // Render the button
    const { getByText } = render(
      <StopWatchButton onClick={onClick}>Start</StopWatchButton>
    );

    // Click the button
    fireEvent.click(getByText("Start"));

    // Verify onClick function is called
    expect(onClick).toHaveBeenCalled();
  });

  test("Button is disabled when disabled prop is true", () => {
    // Mock onClick function
    const onClick = jest.fn();

    // Render the button with disabled prop set to true
    const { getByText } = render(
      <StopWatchButton onClick={onClick} disabled={true}>
        Start
      </StopWatchButton>
    );

    // Verify button is disabled
    const button = getByText("Start") as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
  });

  test("Button is not disabled when disabled prop is false", () => {
    // Mock onClick function
    const onClick = jest.fn();

    // Render the button with disabled prop set to false
    const { getByText } = render(
      <StopWatchButton onClick={onClick} disabled={false}>
        Start
      </StopWatchButton>
    );

    // Verify button is not disabled
    const button = getByText("Start") as HTMLButtonElement;
    expect(button.disabled).toBeFalsy();
  });
});

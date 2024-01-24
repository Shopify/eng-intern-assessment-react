import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "../src/components/StopWatchButton";

describe("Test StopWatchButton", () => {
  it("renders with the correct icon", () => {
    const { getByText } = render(
      <StopWatchButton Icon={<span>777</span>} handleClick={() => {}} />
    );
    const iconElement = getByText("777");
    expect(iconElement.innerHTML).toBe("777");
  });

  it("calls the handleClick function when the button is clicked", () => {
    const handleClickMock = jest.fn();
    const { container } = render(
      <StopWatchButton Icon={<span>777</span>} handleClick={handleClickMock} />
    );
    const buttonElement = container.firstChild;
    fireEvent.click(buttonElement);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it("applies the custom button style if provided", () => {
    const { container } = render(
      <StopWatchButton Icon={<span></span>} handleClick={() => {}} buttonStyle="mock-style" />
    );
    const buttonElement = container.firstElementChild;
    expect(buttonElement.className).toBe("mock-style");
  });

  it("sets the title attribute with the provided alt text", () => {
    const { container } = render(
      <StopWatchButton Icon={<span></span>} handleClick={() => {}} alt="999" />
    );
    const buttonElement = container.firstElementChild;
    expect(buttonElement.hasAttribute("title")).toBeTruthy();
    expect(buttonElement.getAttribute("title")).toBe("999");
  });
});

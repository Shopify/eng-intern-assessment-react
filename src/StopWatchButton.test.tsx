import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

// Mocking the state setter functions
const mockSetToggle = jest.fn();
const mockSetTimer = jest.fn();
const mockSetLaps = jest.fn();

const setup = () => {
  return render(
    <StopWatchButton
      setToggle={mockSetToggle}
      setTimer={mockSetTimer}
      setLaps={mockSetLaps}
      timer={0}
    />
  );
};

describe("StopWatchButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle Start button click", () => {
    const { getByText } = setup();
    fireEvent.click(getByText("Start"));
    expect(mockSetToggle).toHaveBeenCalledWith(true);
  });

  it("should handle Stop button click", () => {
    const { getByText } = setup();
    fireEvent.click(getByText("Stop"));
    expect(mockSetToggle).toHaveBeenCalledWith(false);
  });

  it("should handle Reset button click", () => {
    const { getByText } = setup();
    fireEvent.click(getByText("Reset"));
    expect(mockSetToggle).toHaveBeenCalledWith(false);
    expect(mockSetTimer).toHaveBeenCalledWith(0);
    expect(mockSetLaps).toHaveBeenCalledWith([]);
  });

});

import { render, screen } from "@testing-library/react";
import StopWatchButton from "../StopWatchButton";
import ButtonType from "../../enums/ButtonType";
import React from "react";

describe("StopWatchButton renders properly", () => {
  it("StopWatchButton start type is rendered correctly", () => {
    render(
      <StopWatchButton type={ButtonType.Start} isRunning={true} onClick={jest.fn} />
    );
    const buttonElement = screen.queryByTestId("start-button");
    expect(buttonElement).toBeTruthy();
  });

  it("StopWatchButton reset type is rendered correctly", () => {
    render(
      <StopWatchButton type={ButtonType.Reset} isRunning={true} onClick={jest.fn} />
    );
    const buttonElement = screen.queryByTestId("reset-button");
    expect(buttonElement).toBeTruthy();
  });

  it("StopWatchButton lap type is rendered correctly", () => {
    render(<StopWatchButton type={ButtonType.Lap} isRunning={true} onClick={jest.fn} />);
    const buttonElement = screen.queryByTestId("lap-button");
    expect(buttonElement).toBeTruthy();
  });
});

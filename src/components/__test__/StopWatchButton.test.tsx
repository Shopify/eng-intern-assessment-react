import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import StopWatchButton from "../StopWatchButton";
import ButtonType from "../../enums/ButtonType";
import React from "react";
import App from "../../App";

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

describe("StopWatchButton start button actions", () => {
  it("StopWatchButton start button initiates stopwatch timer", async () => {
    render(<App />);
    const startButton = screen.queryByTestId("start-button");

    fireEvent.click(startButton);

    await new Promise(r => setTimeout(r, 3000));

    const stopwatchTime = (await screen.findByTestId(
      "stopwatch-time"
    )) as HTMLHeadingElement;

    expect(stopwatchTime.textContent).toEqual("00:00:02");
  });

  it("StopWatchButton start button initiates timer and then stops it", async () => {
    render(<App />);
    const startButton = screen.queryByTestId("start-button");

    fireEvent.click(startButton);

    await new Promise(r => setTimeout(r, 3000));

    fireEvent.click(startButton);

    const stopwatchTime = (await screen.findByTestId(
      "stopwatch-time"
    )) as HTMLHeadingElement;
    expect(stopwatchTime.textContent).toEqual("00:00:02");
  });

  it("StopWatchButton start button initiates timer and then resets it", async () => {
    render(<App />);
    const startButton = screen.queryByTestId("start-button");

    await act(async () => {
      fireEvent.click(startButton);

      await new Promise(r => setTimeout(r, 3000));

      const resetButton = screen.queryByTestId("reset-button");

      fireEvent.click(resetButton);
    });

    const stopwatchTime = (await screen.findByTestId(
      "stopwatch-time"
    )) as HTMLHeadingElement;
    expect(stopwatchTime.textContent).toEqual("00:00:00");
  });

  it("StopWatchButton start button initiates timer and then records laps", async () => {
    render(<App />);
    const startButton = screen.queryByTestId("start-button");
    const lapButton = screen.queryByTestId("lap-button");

    fireEvent.click(startButton);
    await new Promise(r => setTimeout(r, 3000));

    fireEvent.click(lapButton);

    const lapTable = await screen.findByTestId("lap-table");
    expect(lapTable.textContent).toContain("Lap NumberLap Time100:00:02");
  });
});

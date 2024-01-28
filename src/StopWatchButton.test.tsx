import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopwatchButton from "./StopWatchButton";

describe("StopwatchButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <StopwatchButton
        isRunning={false}
        startStop={() => {}}
        reset={() => {}}
        recordLap={() => {}}
      />
    );

    expect(getByText("Start")).toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
    expect(getByText("Lap")).toBeInTheDocument();
  });

  describe("behaviour", () => {
    it("displays 'Stop' when isRunning is true", () => {
      const { getByText } = render(
        <StopwatchButton
          isRunning={true}
          startStop={() => {}}
          reset={() => {}}
          recordLap={() => {}}
        />
      );

      expect(getByText("Stop")).toBeInTheDocument();
    });

    it("calls startStop function when Start/Stop button is clicked", () => {
      const startStopMock = jest.fn();
      const { getByText } = render(
        <StopwatchButton
          isRunning={false}
          startStop={startStopMock}
          reset={() => {}}
          recordLap={() => {}}
        />
      );

      fireEvent.click(getByText("Start"));
      expect(startStopMock).toHaveBeenCalledTimes(1);
    });

    it("calls reset function when Reset button is clicked", () => {
      const resetMock = jest.fn();
      const { getByText } = render(
        <StopwatchButton
          isRunning={false}
          startStop={() => {}}
          reset={resetMock}
          recordLap={() => {}}
        />
      );

      fireEvent.click(getByText("Reset"));
      expect(resetMock).toHaveBeenCalledTimes(1);
    });

    it("calls recordLap function when Lap button is clicked and isRunning is true", () => {
      const recordLapMock = jest.fn();
      const { getByText } = render(
        <StopwatchButton
          isRunning={true}
          startStop={() => {}}
          reset={() => {}}
          recordLap={recordLapMock}
        />
      );

      fireEvent.click(getByText("Lap"));
      expect(recordLapMock).toHaveBeenCalledTimes(1);
    });

    it("does not call recordLap function when Lap button is clicked and isRunning is false", () => {
      const recordLapMock = jest.fn();
      const { getByText } = render(
        <StopwatchButton
          isRunning={false}
          startStop={() => {}}
          reset={() => {}}
          recordLap={recordLapMock}
        />
      );

      fireEvent.click(getByText("Lap"));
      expect(recordLapMock).not.toHaveBeenCalled();
    });
  });
});

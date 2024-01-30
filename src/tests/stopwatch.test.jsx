import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import StopWatch from "../components/StopWatch";

function randomTime() {
  return Math.floor(Math.random() * 1000);
}

describe("Tests for stopwatch", () => {
  beforeEach(() => {
    render(<App />);
  });
  describe("Checkining components rendering", () => {
    test("Title should be visible", () => {
      expect(screen.getByText("STOPWATCH")).toBeInTheDocument();
    });
    test("Stopwatch component is rendered", () => {
      expect(<StopWatch time={randomTime()} />);
    });
    test("Only start and lap buttons are being rendered during status: NOT_RUNNING", () => {
      expect(screen.getByText("Start")).toBeInTheDocument();
      expect(screen.getByText("Lap")).toBeInTheDocument();
      expect(screen.queryByText("Reset")).not.toBeInTheDocument();
      expect(screen.queryByText("Stop")).not.toBeInTheDocument();
    });
    test("Only stop and lap buttons are being rendered during status: RUNNING", async () => {
      //status RUNNING : stopwatch has been started
      const startButton = screen.getByText("Start");
      fireEvent.click(startButton);

      await waitFor(() => screen.getByText("Stop"));
      await waitFor(() => screen.getByText("Lap"));

      expect(screen.getByText("Stop")).toBeInTheDocument();
      expect(screen.getByText("Lap")).toBeInTheDocument();

      expect(screen.queryByText("Reset")).not.toBeInTheDocument();
      expect(screen.queryByText("Start")).not.toBeInTheDocument();
    });
    test("Only reset and start buttons are being rendered during status: PAUSED", async () => {
      const startButton = screen.getByText("Start");
      fireEvent.click(startButton);

      //status PAUSED : stopwatch has been paused
      const stopButton = screen.getByText("Stop");
      fireEvent.click(stopButton);

      await waitFor(() => screen.getByText("Reset"));
      await waitFor(() => screen.getByText("Start"));

      expect(screen.getByText("Reset")).toBeInTheDocument();
      expect(screen.getByText("Start")).toBeInTheDocument();

      expect(screen.queryByText("Stop")).not.toBeInTheDocument();
      expect(screen.queryByText("Lap")).not.toBeInTheDocument();
    });
    test("Lap headings are visible", () => {
      expect(screen.getByText("Lap No.")).toBeInTheDocument();
      expect(screen.getByText("Split Time")).toBeInTheDocument();
    });
  });
  describe("Checking if buttons perform what they are supposed to", () => {
    test("Checks if reset button works and resets the stopwatch", async () => {
      const startButton = screen.getByText("Start");
      fireEvent.click(startButton);

      await waitFor(() => screen.getByText("Stop"));

      await act(async () => {
        await new Promise((r) => setTimeout(r, 2000));
      });

      const time = screen.getByTestId("stopwatch-time").textContent;

      // Check to see if the time has actually increased and is not 0
      expect(time).not.toBe("00:00:00");

      const stopButton = screen.getByText("Stop");
      fireEvent.click(stopButton);

      await waitFor(() => screen.getByText("Reset"));
      const resetButton = screen.getByText("Reset");

      fireEvent.click(resetButton);

      const resetTime = screen.getByTestId("stopwatch-time").textContent;
      // Check to see if the time has actually reset
      expect(resetTime).toBe("00:00:00");
    });

    test("Checks if lap button works and laps are recorded", async () => {
      //Check to see number of laps initially is 0
      var lapCount = screen.getByTestId("laps-holder-body").childElementCount;
      expect(lapCount).toBe(0);

      const startButton = screen.getByText("Start");
      fireEvent.click(startButton);

      await waitFor(() => screen.getByText("Lap"));

      await act(async () => {
        await new Promise((r) => setTimeout(r, 2000));
      });

      const lapButton = screen.getByText("Lap");

      // Generate a random number of laps between 1 and 20
      const numberOfLaps = Math.floor(Math.random() * 20) + 1;
      for (let i = 0; i < numberOfLaps; i++) {
        fireEvent.click(lapButton);
      }
      /*Check to ensure that number of laps are equal to the number of times lap
      button was clicked*/
      lapCount = screen.getByTestId("laps-holder-body").childElementCount;
      expect(lapCount).toBe(numberOfLaps);
    });

    test("Checks if start and stop buttons work", async () => {
      var time = screen.getByTestId("stopwatch-time").textContent;
      expect(time).toBe("00:00:00");

      const startButton = screen.getByText("Start");
      fireEvent.click(startButton);

      await waitFor(() => screen.getByText("Stop"));

      await act(async () => {
        await new Promise((r) => setTimeout(r, 2000));
      });

      time = screen.getByTestId("stopwatch-time").textContent;

      // Check to see if the time has actually increased and is not 0
      expect(time).not.toBe("00:00:00");

      const stopButton = screen.getByText("Stop");
      fireEvent.click(stopButton);

      await act(async () => {
        await new Promise((r) => setTimeout(r, 2000));
      });

      const stoppedTime = screen.getByTestId("stopwatch-time").textContent;
      // Check to see that time is same as when stopwatch was stopped
      expect(stoppedTime).toBe(time);
    });
  });
});

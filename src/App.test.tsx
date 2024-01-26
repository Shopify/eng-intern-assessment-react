/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StopWatch from "./StopWatch";

describe("Stopwatch Timer", () => {
  test("Stopwatch component renders", () => {
    render(<StopWatch />);
  });

  test("Timer is 0 by default", () => {
    render(<StopWatch />);
    const timerParagraph = screen.getByTestId("screen");
    const timerSpans = timerParagraph.querySelectorAll("span");

    expect(timerSpans.length).toBe(4);

    let timerStringArray: string[] = [];

    timerSpans.forEach((span) => {
      timerStringArray.push(span.textContent);
    });

    const timerString = timerStringArray.join("");

    expect(timerString).toBe("00:00:00:00");
  });

  test("Timer is not 0 after start is pressed", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByTestId("player"));

    await waitFor(() => {
      const timerParagraph = screen.getByTestId("screen");
      const timerSpans = timerParagraph.querySelectorAll("span");

      expect(timerSpans.length).toBe(4);

      let timerStringArray: string[] = [];

      timerSpans.forEach((span) => {
        timerStringArray.push(span.textContent);
      });

      const timerString = timerStringArray.join("");

      expect(timerString).not.toBe("00:00:00:00");
    });
  });

  test("Timer is set back to 0 after reset button is pressed", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByTestId("player"));

    await waitFor(() => {
      const timerParagraph = screen.getByTestId("screen");
      const timerSpans = timerParagraph.querySelectorAll("span");

      expect(timerSpans.length).toBe(4);

      let timerStringArray: string[] = [];

      timerSpans.forEach((span) => {
        timerStringArray.push(span.textContent);
      });

      const timerString = timerStringArray.join("");

      expect(timerString).not.toBe("00:00:00:00");
    });

    fireEvent.click(screen.getByTestId("reset"));

    await waitFor(() => {
      const timerParagraph = screen.getByTestId("screen");
      const timerSpans = timerParagraph.querySelectorAll("span");

      expect(timerSpans.length).toBe(4);

      let timerStringArray: string[] = [];

      timerSpans.forEach((span) => {
        timerStringArray.push(span.textContent);
      });

      const timerString = timerStringArray.join("");

      expect(timerString).toBe("00:00:00:00");
    });
  });
});

describe("Buttons behavior", () => {
  test("player button is enabled by default", () => {
    render(<StopWatch />);

    const playerButton = screen.getByTestId("player");

    expect(playerButton).toBeEnabled();
  });

  test("reset and lap buttons are disabled by default", () => {
    render(<StopWatch />);

    const resetButton = screen.getByTestId("reset");
    const lapButton = screen.getByTestId("lap-button");

    expect(resetButton).toBeDisabled();
    expect(lapButton).toBeDisabled();
  });

  test("reset and lap buttons are enabled after start is pressed", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByTestId("player"));

    await waitFor(() => {
      const resetButton = screen.getByTestId("reset");
      const lapButton = screen.getByTestId("lap-button");

      expect(resetButton).toBeEnabled();
      expect(lapButton).toBeEnabled();
    });
  });

  test("reset is enabled and lap is disabled after stop is pressed", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByTestId("player"));

    await waitFor(() => {
      const stopButton = screen.getByTestId("player");
      expect(stopButton).toContainHTML("<span>Stop</span>");
    });

    fireEvent.click(screen.getByTestId("player"));

    await waitFor(() => {
      const resetButton = screen.getByTestId("reset");
      const lapButton = screen.getByTestId("lap-button");
      const resumeButton = screen.getByTestId("player");

      expect(resumeButton).toContainHTML("<span>Resume</span>");
      expect(resetButton).toBeEnabled();
      expect(lapButton).toBeDisabled();
    });
  });
});

describe("Laps behavior", () => {
  test("There are no laps by default", () => {
    render(<StopWatch />);
    const lapsDiv = screen.getByTestId("laps");
    const lapsP = lapsDiv.querySelectorAll("div");

    expect(lapsP.length).toBe(0);
  });

  test("Laps are added to lap list afer lap button is pressed", async () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByTestId("player"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("lap-button"));
      fireEvent.click(screen.getByTestId("lap-button"));
      fireEvent.click(screen.getByTestId("lap-button"));

      const lapsDiv = screen.getByTestId("laps");
      const singleLapDivs = lapsDiv.querySelectorAll("div");

      expect(singleLapDivs.length).toBe(3);
    });
  });
});

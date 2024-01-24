import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import StopWatch from "./StopWatch";

describe("<StopWatch/> ", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<StopWatch />);
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it("Test start button functionality", async () => {
    const zeroText = "00:00:00.00";
    // Expect initial time to be 00:00:00.00
    expect(screen.getByTestId("stop_watch_time")).toHaveTextContent(zeroText);
    //Click start button
    act(() => {
      fireEvent.click(
        screen.getByTestId("stop_watch_buttons_container").firstChild
      );
    });

    //advance the timer
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    //Wait for a non 00:00 text
    expect(await screen.findByTestId("stop_watch_time")).not.toHaveTextContent(
      zeroText
    );
  });
  it("Test stop button functionality", () => {
    const expectText = (text) => {
      expect(
        screen.getByTestId("stop_watch_buttons_container").firstChild
      ).toHaveTextContent(text);
    };
    const clickStopWatch = () => {
      fireEvent.click(
        screen.getByTestId("stop_watch_buttons_container").firstChild
      );
    };

    // Should be start button
    expectText("Start");
    clickStopWatch();

    // Should be Stop button now
    expectText("Stop");
    clickStopWatch();

    // Should be start button again
    expectText("Start");
  });

  it("Test reset button functionality", async () => {
    const zeroText = "00:00:00.00";
    //Expect zero text
    expect(screen.getByTestId("stop_watch_time")).toHaveTextContent(zeroText);
    const clickFirstButton = () => {
      fireEvent.click(
        screen.getByTestId("stop_watch_buttons_container").firstChild
      );
    };
    act(() => {
      clickFirstButton();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    //Add lap
    fireEvent.click(
      screen.getByTestId("stop_watch_buttons_container").lastChild
    );
    act(() => {
      clickFirstButton();
    });

    //Expect non zero text and lap text before reset
    // After reset expect zero text and no lap spans
    expect(await screen.findByTestId("stop_watch_time")).not.toHaveTextContent(
      zeroText
    );
    expect(screen.getByTestId("stop_watch_laps").childNodes).toHaveLength(1);

    fireEvent.click(
      screen.getByTestId("stop_watch_buttons_container").lastChild
    );
    expect(
      await screen.findByTestId("stop_watch_laps").childNodes
    ).toBeUndefined();
    expect(await screen.findByTestId("stop_watch_time")).toHaveTextContent(
      zeroText
    );
  });

  it("Test lap button functionality", async () => {
    expect(screen.getByTestId("stop_watch_laps").childNodes).toHaveLength(0);

    act(() => {
      fireEvent.click(
        screen.getByTestId("stop_watch_buttons_container").firstChild
      );
    });
    //advance the timer
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(
      screen.getByTestId("stop_watch_buttons_container").lastChild
    );
    expect(screen.getByTestId("stop_watch_laps").childNodes).toHaveLength(1);
  });
});

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Test App", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<App />);
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("starts timer after clicking start", async () => {
    expect(screen.getByTestId("h-m-s").innerHTML).toBe("00:00");
    expect(screen.getByTestId("cs").innerHTML).toBe(".00");

    // Click start
    act(() => {
      fireEvent.click(screen.getByTitle("Start"));
    });

    // Wait 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Click stop
    act(() => {
      fireEvent.click(screen.getByTitle("Stop"));
    });

    // Check that time has increased
    expect(await screen.findByTestId("h-m-s")).not.toBe("00:00");
  });

  it("shows Lap button after clicking start", async () => {
    expect(screen.queryByText("Lap")).toBeFalsy();
    expect(screen.queryByText("Reset")).toBeFalsy();

    // Click start
    act(() => {
      fireEvent.click(screen.getByTitle("Start"));
    });

    // Check that lap button is shown
    expect(screen.queryByText("Lap")).toBeTruthy();

    // Click stop
    act(() => fireEvent.click(screen.getByTitle("Stop")));
  });

  it("only shows start button at the start", () => {
    expect(screen.queryByTitle("Start")).toBeTruthy();
    expect(screen.queryByTitle("Stop")).toBeFalsy();
    expect(screen.queryByTitle("Lap")).toBeFalsy();
    expect(screen.queryByTitle("Reset")).toBeFalsy();
  });

  it("shows stop button after clicking start", async () => {
    expect(screen.queryByTitle("Stop")).toBeFalsy();

    // Click start
    act(() => fireEvent.click(screen.getByTitle("Start")));

    // Check that stop button is shown
    expect(screen.queryByTitle("Stop")).toBeTruthy();

    // Click stop
    act(() => fireEvent.click(screen.getByTitle("Stop")));
  });

  it("shows reset button after clicking stop", async () => {
    expect(screen.queryByTitle("Reset")).toBeFalsy();

    // Click start
    act(() => fireEvent.click(screen.getByTitle("Start")));

    // Click stop
    act(() => fireEvent.click(screen.getByTitle("Stop")));

    // Check that reset button is shown
    expect(await screen.findByText("Reset")).toBeTruthy();
  });

  it("resets timer and clears secondary button after clicking reset", async () => {
    expect(screen.getByTestId("h-m-s").innerHTML).toBe("00:00");
    expect(screen.getByTestId("cs").innerHTML).toBe(".00");

    // Click start
    act(() => fireEvent.click(screen.getByTitle("Start")));

    // Wait 1 second
    act(() => jest.advanceTimersByTime(1000));

    // Click stop
    act(() => fireEvent.click(screen.getByTitle("Stop")));

    // Click reset
    act(() => fireEvent.click(screen.getByTitle("Reset")));

    // Check that time has reset
    expect(screen.queryByTestId("h-m-s").innerHTML).toBe("00:00");
    expect(screen.queryByTestId("cs").innerHTML).toBe(".00");
    expect(screen.queryByText("Reset")).toBeFalsy();
  });

  it("adds lap after clicking lap", async () => {
    expect(screen.queryByText("Lap")).toBeFalsy();

    // Click start
    act(() => fireEvent.click(screen.getByTitle("Start")));

    // Wait 1 second
    act(() => jest.advanceTimersByTime(1000));

    // Click lap
    act(() => fireEvent.click(screen.getByTitle("Lap")));

    // Wait 2 seconds
    act(() => jest.advanceTimersByTime(2000));

    // Click lap
    act(() => fireEvent.click(screen.getByTitle("Lap")));

    // Wait 1 seconds
    act(() => jest.advanceTimersByTime(1000));

    // Click stop
    act(() => fireEvent.click(screen.getByTitle("Stop")));

    // Check that 2 laps has been added
    const lapContainer = screen.queryByText("Lap").parentElement.parentElement;
    expect(lapContainer).toBeTruthy();
    expect(lapContainer.children.length).toBe(4); // header + divider + 2 laps
    expect(screen.queryByText("00:01.00")).toBeTruthy(); // lap 1
    expect(screen.queryByText("00:02.00")).toBeTruthy(); // lap 2
    expect(screen.queryByText("00:03.00")).toBeFalsy();
    expect(screen.queryByText("(fastest)")).toBeTruthy();
    expect(screen.queryByText("(slowest)")).toBeTruthy();
  });
});

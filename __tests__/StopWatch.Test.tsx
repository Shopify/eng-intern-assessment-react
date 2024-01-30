/**
 * @jest-environment jsdom
 */

import React from "react";
import {
  render,
  fireEvent,
  act,
  queryByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../src/App";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Stopwatch Basic Functions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Tests that the stop watch is set up correctly
  it("Setup Test", async () => {
    const { getByText, queryByText, container} = render(
      <App />
    );
    expect(getByText("Start")).toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
    expect(getByText("Lap")).toBeInTheDocument();
    expect(queryByText("Stop")).toBeNull();
    expect(container.getElementsByClassName("laps")).toHaveLength(0);
  });

  // Tests basic timing ability
  it("Simple Timing with start and stop Test", async () => {
    const { getByText } = render(<App />);

    expect(getByText("Start")).toHaveStyle({ color: "green" });
    expect(getByText("Lap")).toHaveStyle({ color: "rgb(25, 118, 210)" });
    fireEvent.click(getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:03.00"));

    expect(getByText("Stop")).toBeInTheDocument();
    expect(getByText("Stop")).toHaveStyle({ color: "red" });
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:06.00"));

    fireEvent.click(getByText("Stop"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:06.00"));
    expect(getByText("Start")).toBeInTheDocument();
    fireEvent.click(getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:09.00"));
  });

  // Tests reset ability
  it("Reset Test", async () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:03.00"));

    fireEvent.click(getByText("Reset"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:00.00"));
    expect(getByText("Start")).toBeInTheDocument();
    fireEvent.click(getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:03.00"));
  });

  // Checks that the clock display a correct format after exceeding one hour
  it("Correct hour format after exceeding 1 hour Test", () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3600000);
    });

    expect(getByText("01:00:00.00"));
  });
});

describe("Laps", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Basic lap functionalities
  it("Simple lap, including min and max check Test", () => {
    const { getByText, getByTestId, container } = render(<App />);
    fireEvent.click(getByText("Start"));

    let num = 3;
    while (num > 0) {
      act(() => {
        jest.advanceTimersByTime(num * 1000);
      });
      fireEvent.click(getByText("Lap"));
      num--;
    }

    expect(container.getElementsByClassName("lap")).toHaveLength(3);
    expect(queryByText(container, "00:01.00")).toBeInTheDocument();
    expect(queryByText(container, "00:02.00")).toBeInTheDocument();
    expect(queryByText(container, "00:03.00")).toBeInTheDocument();
    expect(getByTestId("lap-1")).toHaveStyle({ color: "red" });
    expect(getByTestId("lap-3")).toHaveStyle({ color: "green" });
    act(() => {
      jest.advanceTimersByTime(num * 1000);
    });
    expect(getByTestId("lap-3")).toHaveStyle({ color: "green" });
  });

  // Tests that the laps are cleared after hiiting reset
  it("Reset Clear Laps Test", () => {
    const { getByText, container } = render(<App />);
    fireEvent.click(getByText("Start"));

    let num = 10;
    while (num > 0) {
      act(() => {
        jest.advanceTimersByTime(num * 1000);
      });
      fireEvent.click(getByText("Lap"));
      num--;
    }

    expect(container.getElementsByClassName("lap")).toHaveLength(10);
    expect(queryByText(container, "00:01.00")).toBeInTheDocument();
    expect(queryByText(container, "00:02.00")).toBeInTheDocument();
    expect(queryByText(container, "00:03.00")).toBeInTheDocument();
    fireEvent.click(getByText("Reset"));
    expect(container.getElementsByClassName("lap")).toHaveLength(0);
    expect(queryByText(container, "00:01.00")).toBeNull();
  });
});

// Tests that the clock runs when the page is hidden or the tab is switched
describe("Change visibility", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Hide the page Test", () => {
    const { getByText } = render(<App />);

    expect(getByText("Start")).toHaveStyle({ color: "green" });
    expect(getByText("Lap")).toHaveStyle({ color: "rgb(25, 118, 210)" });
    fireEvent.click(getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText("00:03.00"));
    act(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        writable: true,
        value: true,
      });
    });
    document.dispatchEvent(new Event("visibilitychange", { bubbles: true }));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    document.dispatchEvent(new Event("visibilitychange", { bubbles: false }));
    expect(getByText("00:06.00"));
  });
});

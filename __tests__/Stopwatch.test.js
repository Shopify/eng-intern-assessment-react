import React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react";
import "@testing-library/jest-dom";
import Stopwatch from "../src/StopWatch";
import "./matchMedia.mock";
import {AppProvider} from "@shopify/polaris";

const renderStopwatch = () => {
  render(
    <AppProvider>
      <Stopwatch />
    </AppProvider>
  );
};

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    renderStopwatch();

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", async () => {
    renderStopwatch();

    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    fireEvent.click(screen.getByText("Pause"));
    expect(screen.queryByText("00:00:00")).not.toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch", async () => {
    renderStopwatch();

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Pause"));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText("Start"));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays lap times", () => {
    renderStopwatch();

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Lap"));

    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", () => {
    renderStopwatch();

    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Pause"));
    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});

/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Stopwatch from "../src/components/Stopwatch/StopWatch";

describe("Stopwatch", () => {
  test("renders initial state correctly", async () => {
    await act(async () => render(<Stopwatch />));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", async () => {
    await act(async () => render(<Stopwatch />));

    act(() => {
      fireEvent.click(screen.getByText("Start"));
    });

    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText("Stop"));
    });

    // expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).not.toBeInTheDocument();
  });

  test("pauses and resumes the stopwatch", async () => {
    await act(async () => render(<Stopwatch />));

    act(() => {
      fireEvent.click(screen.getByText("Start"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Pause"));
    });

    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    act(() => {
      fireEvent.click(screen.getByText("Resume"));
    });

    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      const resumedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
      expect(resumedTime).not.toBe(pausedTime);
    });
  });

  test("records and displays lap times", async () => {
    await act(async () => render(<Stopwatch />));

    act(() => {
      fireEvent.click(screen.getByText("Start"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Lap"));
    });

    expect(screen.getByTestId("lap-list")).toContainElement(screen.getByTestId("lap-list").querySelector("li"));

    act(() => {
      fireEvent.click(screen.getByText("Lap"));
    });

    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("resets the stopwatch", async () => {
    await act(async () => render(<Stopwatch />));

    act(() => {
      fireEvent.click(screen.getByText("Start"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Lap"));
    });

    act(() => {
      fireEvent.click(screen.getByText("Reset"));
    });

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});

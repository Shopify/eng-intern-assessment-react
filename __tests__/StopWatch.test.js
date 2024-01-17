import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StopWatch from "../src/StopWatch";
import "@testing-library/jest-dom";

describe("Stopwatch", () => {
  test("initial phase", () => {
    render(<StopWatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Lap")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("start, pauses, and resets the stopwatch", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));

    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Pause"));

    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("pause and resumes the stopwatch with proper values", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));

    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Pause"));

    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText("Resume"));

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(
      pausedTime
    );
  });

  test("records and displays a lap", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();

    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Lap"));

    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "span" &&
          content.match(/(\d{2}:){2}\d{2}/)
      )
    );
    expect(screen.getByTestId("lap-list").children.length).toBe(1);
  });

  test("records multiple lap times", async () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();

    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Lap"));

    expect(screen.getByTestId("lap-list")).toContainElement(
      screen.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "span" &&
          content.match(/(\d{2}:){2}\d{2}/)
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 100));

    fireEvent.click(screen.getByText("Lap"));
    expect(screen.getByTestId("lap-list").children.length).toBe(2);
  });

  test("clicking the Lap before Start should still have empty lap-list", async () => {
    render(<StopWatch />);
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
    fireEvent.click(screen.getByText("Lap"));
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });
});

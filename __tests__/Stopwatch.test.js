import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Stopwatch from "../src/StopWatch";
import { act } from "react-dom/test-utils";

describe("Stopwatch", () => {
  test("renders initial state correctly", () => {
    render(<Stopwatch />);

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.queryByTestId("lap-list")).toBeEmptyDOMElement();
  });

  test("starts and stops the stopwatch", async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    // using act to wait for the timer to update the DOM
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
    });

    fireEvent.click(screen.getByText("Stop"));
    const stoppedTime = screen.queryByTestId("timer");
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).toEqual(stoppedTime);
  });

  // test('pauses and resumes the stopwatch', () => {
  //   render(<Stopwatch />);

  //   fireEvent.click(screen.getByText('Start'));
  //   fireEvent.click(screen.getByText('Pause'));
  //   const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

  //   fireEvent.click(screen.getByText('Resume'));
  //   expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  // });

  // test('records and displays lap times', () => {
  //   render(<Stopwatch />);

  //   fireEvent.click(screen.getByText('Start'));
  //   fireEvent.click(screen.getByText('Lap'));
  //   expect(screen.getByTestId('lap-list')).toContainElement(screen.getByText(/(\d{2}:){2}\d{2}/));

  //   fireEvent.click(screen.getByText('Lap'));
  //   expect(screen.getByTestId('lap-list').children.length).toBe(2);
  // });

  // test('resets the stopwatch', () => {
  //   render(<Stopwatch />);

  //   fireEvent.click(screen.getByText('Start'));
  //   fireEvent.click(screen.getByText('Lap'));
  //   fireEvent.click(screen.getByText('Reset'));

  //   expect(screen.getByText('00:00:00')).toBeInTheDocument();
  //   expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  // });
});

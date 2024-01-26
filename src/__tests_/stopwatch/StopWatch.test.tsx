import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import StopWatch from "../../component/main/StopWatch";
import React from "react";

test("start stopwatch timer", async () => {
  //Arrange
  render(<StopWatch />);

  //Act Start
  userEvent.click(screen.getByText("Start"));

  //Assert the text content to have Stop and Lap
  expect(screen.getAllByRole("button").at(0)).toHaveTextContent("Stop");
  expect(screen.getAllByRole("button").at(1)).toHaveTextContent("Lap");

  //Act stop
  userEvent.click(screen.getByText("Stop"));

  //Assert the text content to have Start and Reset
  expect(screen.getAllByRole("button").at(0)).toHaveTextContent("Start");
  expect(screen.getAllByRole("button").at(1)).toHaveTextContent("Reset");
});

test("append laps on click", async () => {
  //Arrange
  render(<StopWatch />);

  //Act Start
  userEvent.click(screen.getByText("Start"));
  const divElement = screen.getByTitle("laps");

  //Mock laps
  for (let i = 0; i < 10; i++) {
    //Act Lap
    userEvent.click(screen.getByText("Lap"));
    //Assert to Lap + Lap number to be in the document
    expect(within(divElement).getByText("Lap " + (i + 1))).toBeInTheDocument();
  }

  //Assert at the end to have 10 total collected laps
  expect(
    within(within(divElement).getByRole("ul")).getAllByRole("li")
  ).toHaveLength(10);
});

test("wait 5 seonds to display 5 seonds on the stopwatch", async () => {
  //Fake timer using jest
  jest.useFakeTimers();

  //Arrange
  render(<StopWatch />);

  //Act Start
  userEvent.click(screen.getByText("Start"));

  //Fake timer after 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  //Assert to expect 05 second in the document
  expect(screen.getByText("05:")).toBeInTheDocument();

  //Switching to real timers using Jest
  jest.useRealTimers();
});

test("reset stopwatch test", async () => {
  //Fake timer using jest
  jest.useFakeTimers();

  //Arrang
  render(<StopWatch />);

  //Act Start
  userEvent.click(screen.getByText("Start"));

  //Fake timer after 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  //Act Stop and Reset
  userEvent.click(screen.getByText("Stop"));
  userEvent.click(screen.getByText("Reset"));

  //Find ALl time holder (span) to check for 00 as reset
  (await screen.findAllByRole("span")).map((spanElement) => {
    expect(spanElement).toHaveTextContent(/00/);
  });

  //Switching to real timers using Jest
  jest.useRealTimers();
});

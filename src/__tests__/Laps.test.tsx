/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Laps from "./../Laps";
import React from "react";

test("All Laps are displayed and converted correctly", async () => {
  // ARRANGE
  render(<Laps lapTimes={[6000, 12000, 7500]} />);

  //ASSERT
  expect(screen.getByText("Lap 1")).toBeInTheDocument();
  expect(screen.getByText("01:00:00")).toBeInTheDocument();

  expect(screen.getByText("Lap 2")).toBeInTheDocument();
  expect(screen.getByText("02:00:00")).toBeInTheDocument();

  expect(screen.getByText("Lap 3")).toBeInTheDocument();
  expect(screen.getByText("01:15:00")).toBeInTheDocument();
});

test("empty array renders correctly", async () => {
  // ARRANGE
  render(<Laps lapTimes={[]} />);

  //ASSERT
  expect(screen.queryAllByText("Lap 1")).toHaveLength(0);
});

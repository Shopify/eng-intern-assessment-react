import { render, screen } from "@testing-library/react";
import App from "../src/App";
import React from "react";
import "@testing-library/jest-dom";
describe("test", () => {
  beforeEach(() => {
    console.log("render the app");
    render(<App />);
  });

  test("render the StopWatch view", () => {
    expect(screen.getByText("00:00:00:00"));
  });
  test("render the StopWatchButton componenent", () => {
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });
  test("click the stop Button after start the timer", () => {});
  test("click the lap Button after start the timer", () => {});
  test("click the start Button after stopping the timer", () => {});
  test("click the reset Button after stopping the timer", () => {});
});

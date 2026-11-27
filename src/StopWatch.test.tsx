import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import StopWatch, { timeFormatter } from "./components/StopWatch";

//test the timeFormatter function
describe("tests timeFormatter Function", () => {
  test("formats time correctly", () => {
    expect(timeFormatter(0)).toBe("00:00:00:00");
    expect(timeFormatter(360100)).toBe("01:00:01:00");
    expect(timeFormatter(6000)).toBe("00:01:00:00");
  });
});

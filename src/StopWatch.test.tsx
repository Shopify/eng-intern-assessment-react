import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import StopWatch from "./StopWatch";

test("should render component", () => {
  render(<StopWatch />);
});

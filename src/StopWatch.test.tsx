import React from "react";
import { render } from "@testing-library/react";
import StopWatch from "./StopWatch";

it("StopWatch renders the text passed to it", () => {
  const { queryByText } = render(<StopWatch>12:34:56</StopWatch>);

  expect(queryByText(/12:34:56/i)).toBeTruthy();
});

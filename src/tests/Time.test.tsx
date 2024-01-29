import React from "react";
import { render, screen } from "@testing-library/react";
import { Time } from "../components";
import "@testing-library/jest-dom";

test("renders a stop watch time display", () => {
  render(<Time time={11330} />);
  const divElement = screen.getByRole("display-time");
  expect(divElement).toHaveTextContent("00:11:33");
  expect(divElement).toHaveAttribute("role", "display-time");
});

import React from "react";
import { render } from "@testing-library/react";
import LapsDisplay from "../src/components/LapsDisplay";

describe("Test LapsDisplay", () => {
  it("renders properly", () => {
    const { container } = render(<LapsDisplay laps={[]} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders fastest and slowest", () => {
    const { queryByText } = render(<LapsDisplay laps={[1, 2, 3]} fastest={0} slowest={2} />);
    const fastestElement = queryByText("(fastest)");
    const slowestElement = queryByText("(slowest)");

    expect(fastestElement).toBeTruthy();
    expect(slowestElement).toBeTruthy();
  });

  // If only one lap, it should only display fastest, not slowest
  it("renders only fastest", () => {
    const { queryByText } = render(<LapsDisplay laps={[1]} fastest={0} slowest={0} />);
    const fastestElement = queryByText("(fastest)");
    const slowestElement = queryByText("(slowest)");

    expect(fastestElement).toBeTruthy();
    expect(slowestElement).toBeNull();
  });
});

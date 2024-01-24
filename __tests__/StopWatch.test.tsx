import React from "react";
import { render } from "@testing-library/react";
import StopWatch from "../src/components/StopWatch";

describe("Test StopWatch", () => {
  it("renders properly", () => {
    const { container } = render(<StopWatch time={0} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders 6 digits if below an hour", () => {
    const { container } = render(<StopWatch time={359999} />);
    const largeTextElement = container.getElementsByClassName("timer-large-text")[0];
    expect(largeTextElement.innerHTML).toBe("59:59");
  });

  it("renders 8 digits if above an hour", () => {
    const { container } = render(<StopWatch time={360000} />);
    const largeTextElement = container.getElementsByClassName("timer-large-text")[0];
    expect(largeTextElement.innerHTML).toBe("01:00:00");
  });

  it("renders 8+ digits if above 36000000 hour", () => {
    const { container } = render(<StopWatch time={36000000} />);
    const largeTextElement = container.getElementsByClassName("timer-large-text")[0];
    expect(largeTextElement.innerHTML).toBe("100:00:00");
  });

  it("renders 2 digits for centiseconds", () => {
    const { container } = render(<StopWatch time={1} />);
    const smallTextElement = container.getElementsByClassName("timer-small-text")[0];
    expect(smallTextElement.innerHTML).toBe(".01");
  });
});

import { render } from "@testing-library/react";
import App from "../src/App";
describe("Scoped / Nested block", () => {
  beforeAll(() =>
    beforeEach(() => {
      console.log("render the app");
      render(<App />);
    })
  );

  test("render the StopWatch view", () => {});
  test("render the  StopWatchButton componenent", () => {});
  test("click the stop Button after start the timer", () => {});
  test("click the lap Button after start the timer", () => {});
  test("click the start Button after stopping the timer", () => {});
  test("click the reset Button after stopping the timer", () => {});
});

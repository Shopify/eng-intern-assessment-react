import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "./StopWatchButton";

test("calls onClick prop when clicked", () => {
  const handleClick = jest.fn();
  const { getByRole } = render(
    <StopWatchButton type="start" onClick={handleClick} />,
  );

  fireEvent.click(getByRole("button", { name: /start/i }));

  expect(handleClick).toHaveBeenCalled();
});

test("renders with correct text", () => {
  const { getByRole } = render(
    <StopWatchButton type="start" onClick={() => {}} />,
  );
  expect(getByRole("button").textContent).toBe("Start");
});

test("calls onClick prop when clicked with type stop", () => {
  const handleClick = jest.fn();
  const { getByRole } = render(
    <StopWatchButton type="stop" onClick={handleClick} />,
  );

  fireEvent.click(getByRole("button", { name: /stop/i }));

  expect(handleClick).toHaveBeenCalled();
});

test("calls onClick prop when clicked with type reset", () => {
  const handleClick = jest.fn();
  const { getByRole } = render(
    <StopWatchButton type="reset" onClick={handleClick} />,
  );

  fireEvent.click(getByRole("button", { name: /reset/i }));

  expect(handleClick).toHaveBeenCalled();
});

test("renders with correct text for type reset", () => {
  const { getByRole } = render(
    <StopWatchButton type="reset" onClick={() => {}} />,
  );
  expect(getByRole("button").textContent).toBe("Reset");
});

test("calls onClick prop when clicked with type lap", () => {
  const handleClick = jest.fn();
  const { getByRole } = render(
    <StopWatchButton type="lap" onClick={handleClick} timerOn={true} />,
  );

  fireEvent.click(getByRole("button", { name: /lap/i }));

  expect(handleClick).toHaveBeenCalled();
});

test("renders with correct text for type lap", () => {
  const { getByRole } = render(
    <StopWatchButton type="lap" onClick={() => {}} timerOn={true} />,
  );
  expect(getByRole("button").textContent).toBe("Record Lap");
});

test("does not throw error when clicked without onClick prop", () => {
  const { getByRole } = render(<StopWatchButton type="start" />);

  expect(() =>
    fireEvent.click(getByRole("button", { name: /start/i })),
  ).not.toThrow();
});

test("lap button is disabled when timer is not running", () => {
  const { getByRole } = render(
    <StopWatchButton type="lap" onClick={() => {}} timerOn={false} />,
  );
  const buttonElement = getByRole("button") as HTMLButtonElement;
  expect(buttonElement.disabled).toBe(true);
});

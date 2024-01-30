import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StopWatchButton from "../components/StopWatchButton/StopWatchButton";
import "@testing-library/jest-dom";

// Test for button render and click functionality
describe("StopWatchButton", () => {
   test("renders button with correct type and handles click event", () => {
      const handleClick = jest.fn();
      const { getByRole } = render(<StopWatchButton type="start" onClick={handleClick} isRunning={false} />);

      fireEvent.click(getByRole("button", { name: /start/i }));

      expect(handleClick).toHaveBeenCalled();
      expect(getByRole("button").textContent).toBe("start");
   });

   test("button is disabled/enabled based on isRunning prop", () => {
      const { rerender, getByRole } = render(<StopWatchButton type="start" onClick={() => {}} isRunning={true} />);
      expect(getByRole("button")).toBeDisabled();

      rerender(<StopWatchButton type="start" onClick={() => {}} isRunning={false} />);
      expect(getByRole("button")).not.toBeDisabled();
   });
});

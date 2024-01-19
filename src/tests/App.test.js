import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Stopwatch App", () => {
   beforeEach(() => {
      jest.useFakeTimers();
      render(<App />);
   });

   afterEach(() => {
      jest.useRealTimers(); // Clean up & use real timers after each test
   });

   it("renders App component", () => {
      screen.debug();
   });

   it("renders the stopwatch initially", () => {
      expect(screen.getByText(/00:00:00:00/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
   });

   it("renders Start button initially", () => {
      expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
   });

   it("changes Start button to Stop when clicked and displays Resume and Reset buttons", () => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
      expect(screen.getByRole("button", { name: "Stop" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
   });

   it("displays Resume and Reset buttons when Stop is clicked", () => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
      fireEvent.click(screen.getByRole("button", { name: "Stop" }));
      expect(screen.getByRole("button", { name: "Resume" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Reset" })).not.toBeDisabled();
   });

   it("resets the stopwatch when Reset is clicked", () => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
      fireEvent.click(screen.getByRole("button", { name: "Stop" }));
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));
      expect(screen.getByText(/00:00:00:00/)).toBeInTheDocument();
   });

   it("should add a lap when the Lap button is clicked", () => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
      fireEvent.click(screen.getByRole("button", { name: "Lap" }));
      const lapItems = screen.getAllByText(/00:00:00:00/); // Assuming it's clicked immediately
      expect(lapItems).toHaveLength(2); // One in the stopwatch display, one in the lap list
   });

   it("should display multiple laps in LapList", () => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
      fireEvent.click(screen.getByRole("button", { name: "Lap" }));
      fireEvent.click(screen.getByRole("button", { name: "Lap" }));
      const lapItems = screen.getAllByRole("listitem");
      expect(lapItems).toHaveLength(2);
   });

   it("resets stopwatch time when reset", () => {
      fireEvent.click(screen.getByRole("button", { name: "Start" }));
      act(() => {
         jest.advanceTimersByTime(5000); // 5 seconds
      });
      fireEvent.click(screen.getByRole("button", { name: "Stop" }));
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));

      expect(screen.getByText(/00:00:00:00/)).toBeInTheDocument();
   });
});

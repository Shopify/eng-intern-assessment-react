/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import React from "react";

test("renders start button", () => {
  // Arrange
  render(<App />);

  // Act
  const startButton = screen.getByText(/start/i);

  // Assert
  expect(startButton).toBeInTheDocument();
});

test("renders Reset button", () => {
  // Arrange
  render(<App />);

  // Act
  const resetButton = screen.getByText(/reset/i);
  const stopwatchTime = screen.getByText("00:00:00");

  // Assert
  expect(resetButton).toBeInTheDocument();

  expect(stopwatchTime).toBeInTheDocument();
});

test("Stopwatch is displayed at mark 00:00:00", () => {
  // Arrange
  render(<App />);

  // Act
  const stopwatchTime = screen.getByText("00:00:00");

  // Assert
  expect(stopwatchTime).toBeInTheDocument();
});

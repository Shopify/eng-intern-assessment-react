import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import StopWatch from "../../StopWatch";

beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
});

describe("StopWatch", () => {
  let startStopButton, resetButton, lapButton;

  it("renders without crashing", () => {
    render(
      <AppProvider i18n={enTranslations}>
        <StopWatch />
      </AppProvider>
    );
    const elements = screen.getAllByText("Shopify Stopwatch");
    expect(elements.length).toBe(2); // assert that there are exactly two elements
  });

  beforeEach(() => {
    render(
      <AppProvider i18n={enTranslations}>
        <StopWatch />
      </AppProvider>
    );
    startStopButton = screen.getByText(/start/i);
    resetButton = screen.getByText(/reset/i);
    lapButton = screen.getByText(/lap/i);
  });

  it("starts the stopwatch", () => {
    fireEvent.click(startStopButton);
    expect(startStopButton).toHaveTextContent(/stop/i);
  });

  it("stops the stopwatch", () => {
    fireEvent.click(startStopButton);
    fireEvent.click(startStopButton);
    expect(startStopButton).toHaveTextContent(/start/i);
  });

  it("resets the stopwatch", () => {
    fireEvent.click(startStopButton);
    fireEvent.click(resetButton);
    expect(screen.getByText(/0{2}\s?:\s?0{2}\s?:\s?0{2}\s?:\s?0{2}/)).toBeInTheDocument();
  });

  it("records laps", async () => {
    fireEvent.click(startStopButton);
    fireEvent.click(lapButton);
    fireEvent.click(lapButton);
  
    // Wait for the laps to be recorded
    const laps = await screen.findAllByText(/lap/i);
    expect(laps.length).toBe(1);
  });
  

  it("does not record lap when not running", () => {
    fireEvent.click(lapButton);
    expect(screen.queryByText(/lap 1:/i)).not.toBeInTheDocument();
  });
});
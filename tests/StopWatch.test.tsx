import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import StopWatch from "../src/StopWatch";

it("initial state", () => {
    const { queryByText } = render(<StopWatch />);
  
    // checks the initial state
    expect(queryByText("00:00:00")).toBeTruthy();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByText("Stop")).not.toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    const lapButton = screen.getByText("Lap");
    expect(lapButton).toBeInTheDocument();
    expect(lapButton).toBeDisabled();
  });

  it("verifying start enabled stop and lap buttons", () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText("Start"));

    // check state after pressing start
    expect(screen.getByText("Stop")).toBeInTheDocument();
    expect(screen.queryByText("Start")).not.toBeInTheDocument();
    expect(screen.getByText("Lap")).not.toBeDisabled();
  });

  it("verify lap button works", () => {
    render(<StopWatch />);

    // check that no laps initially
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);

    // start the timer and lap twice
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Lap"));
    fireEvent.click(screen.getByText("Lap"));

    // check that there are 2 laps
    const lapItems = screen.getAllByRole('listitem');
    expect(lapItems).toHaveLength(2);
  });

  it("verify start and reset works", async () => {
    render(<StopWatch />);

    // checks time and start timer
    expect(screen.getByText("00:00:00")).toBeTruthy();
    fireEvent.click(screen.getByText("Start"));
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    // check that the time changed
    expect(screen.queryByText("00:00:00")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset"));

    // check that time resets
    expect(screen.getByText("00:00:00")).toBeTruthy();
  });

  it("verify stop and resume", async () => {
    render(<StopWatch />);

    // checks time and start timer
    expect(screen.getByText("00:00:00")).toBeTruthy();
    fireEvent.click(screen.getByText("Start"));
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    // check that the time changed
    expect(screen.queryByText("00:00:00")).not.toBeInTheDocument();

    // pause and resume
    fireEvent.click(screen.getByText("Stop"));
    fireEvent.click(screen.getByText("Start"));
    expect(screen.queryByText("00:00:00")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset"));

    // check that time resets and buttons are back to normal
    expect(screen.getByText("00:00:00")).toBeTruthy();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByText("Stop")).not.toBeInTheDocument();
  });

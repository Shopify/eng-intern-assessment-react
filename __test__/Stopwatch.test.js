
import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Stopwatch from "../src/components/StopWatch";

describe("Stopwatch Tests", () => {
  test("render initial stopwatch state", () => {
    render(<Stopwatch />);

    expect(screen.getByTestId('total-time').textContent == "00:00.00");
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  test("start and stop stopwatch", async () => {
    render(<Stopwatch />);

    //initial start
    expect(screen.getByTestId('total-time').textContent == "00:00.00");
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();

    //click start button
    fireEvent.click(screen.getByText("Start"));

    // let stopwatch run
    await act(async () => {
      await new Promise((x) => setTimeout(x, 500));
    });


    //stop the timer
    expect(screen.getByText('Stop'));
    fireEvent.click(screen.getByText("Stop"));

    // validate current stopped lap time is equal to total running time
    const stoppedTotalTime = screen.getByTestId('total-time').textContent;
    const stoppedLapTime = screen.getByTestId('current-lap-time').textContent;
    console.log(`stoppedTotalTime:${stoppedTotalTime}, stoppedLapTime:${stoppedLapTime}`);

    // expect matching times when stopped
    expect(stoppedTotalTime === stoppedLapTime);
  });

  test("start, pause, resume and stop stopwatch", async () => {
    render(<Stopwatch />);

    //initial start
    expect(screen.getByTestId('total-time').textContent == "00:00.00");
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();

    //click start button
    fireEvent.click(screen.getByText("Start"));

    // let stopwatch run
    await act(async () => {
      await new Promise((x) => setTimeout(x, 500));
    });

    //click stop button to pause the timer
    expect(screen.getByText('Stop'));
    fireEvent.click(screen.getByText("Stop"));

    // validate current stopped lap time is equal to total running time
    let stoppedTotalTime = screen.getByTestId('total-time').textContent;
    let stoppedLapTime = screen.getByTestId('current-lap-time').textContent;
    console.log(`stoppedTotalTime:${stoppedTotalTime}, stoppedLapTime:${stoppedLapTime}`);

    // expect matching times when stopped
    expect(stoppedTotalTime === stoppedLapTime);

    await act(async () => {
      await new Promise((x) => setTimeout(x, 10));
    });

    // resume stopwatch
    fireEvent.click(screen.getByText("Start"));

    await act(async () => {
      await new Promise((x) => setTimeout(x, 500));
    });

    // stop the stopwatch again
    expect(screen.getByText('Stop'));
    fireEvent.click(screen.getByText("Stop"));

    stoppedTotalTime = screen.getByTestId('total-time').textContent;
    stoppedLapTime = screen.getByTestId('current-lap-time').textContent;
    console.log(`stoppedTotalTime:${stoppedTotalTime}, stoppedLapTime:${stoppedLapTime}`);

    // expect matching times after resuming and stopping stopwatch again
    expect(stoppedTotalTime === stoppedLapTime);
  });

  test("record/display laps and reset stopwatch to zero", async () => {
    render(<Stopwatch />);

    const CLICK_LAP_BUTTON_N_TIMES = 3;

    //initial start
    expect(screen.getByText("00:00.00")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();

    //click start button
    fireEvent.click(screen.getByText("Start"));

    // let stopwatch run
    await act(async () => {
      await new Promise((x) => setTimeout(x, 500));
    });

    // click lap button 3 times
    for (let i=1; i<=CLICK_LAP_BUTTON_N_TIMES; i++) {
      // click lap button
      expect(screen.getByText("Lap")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Lap"));
  
      // let stopwatch run
      await act(async () => {
        await new Promise((x) => setTimeout(x, 500));
      });

    }

    //stop the timer
    expect(screen.getByText('Stop'));
    fireEvent.click(screen.getByText("Stop"));

    expect(screen.getByTestId('lap-table'));
    let lapTable = screen.getByTestId('lap-table');
    // gather lap count
    let lapListings = lapTable.querySelectorAll('.lap-listing').length;
    
    // 3 laps should be displayed in the laps table
    expect(CLICK_LAP_BUTTON_N_TIMES === lapListings)

    // since the stopwatch is in the stopped state, the reset button should be available
    expect(screen.getByText("Reset")).toBeInTheDocument();

    //click the rest button
    fireEvent.click(screen.getByText("Reset"));

    await act(async () => {
      await new Promise((x) => setTimeout(x, 50));
    });

    // expect initial stopwatch states
    expect(screen.getByTestId('total-time').textContent == "00:00.00");
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();

    //expect blank lap table
    expect(screen.getByTestId('lap-table'));
    lapTable = screen.getByTestId('lap-table');
    // gather lap count, expected to be 0
    lapListings = lapTable.querySelectorAll('.lap-listing').length;
    expect(lapListings === 0);
  });
});

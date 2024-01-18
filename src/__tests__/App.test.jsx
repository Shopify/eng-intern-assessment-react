import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'
import App from "../App"

test("Start and Stop test", async () => {
    render(<App />);

    const stopwatchElement = screen.getByText("00:00.00");
    const firstLapElement = screen.getByText("Lap 1----00:00.00")

    expect(stopwatchElement).toBeTruthy();
    expect(firstLapElement).toBeTruthy();

    await userEvent.click(screen.getByText("Start"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(screen.getByText("Stop"));
    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(stopwatchElement.textContent).toBe(firstLapElement.textContent.slice(-8));
})

test("Laps test", async () => {
    render(<App />);
    const stopwatchElement = screen.getByText("00:00.00");
    const lapsElement = screen.getByTestId("Laps");

    expect(stopwatchElement).toBeTruthy();
    expect(lapsElement).toBeTruthy();

    await userEvent.click(screen.getByText("Start"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(screen.getByText("Lap"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(screen.getByText("Lap"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(screen.getByText("Stop"));

    expect(lapsElement.childElementCount).toBe(3);
})


test("Reset test", async () => {
    render(<App />);

    const stopwatchElement = screen.getByText("00:00.00");
    const firstLapElement = screen.getByText("Lap 1----00:00.00")
    const lapsElement = screen.getByTestId("Laps");

    expect(stopwatchElement).toBeTruthy();
    expect(firstLapElement).toBeTruthy();
    expect(lapsElement).toBeTruthy();

    await userEvent.click(screen.getByText("Start"));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await userEvent.click(screen.getByText("Reset"));

    expect(stopwatchElement.textContent).toBe("00:00.00");
    expect(lapsElement.childElementCount).toBe(1);   
})
import { render, screen, fireEvent } from "@testing-library/react"
import StopWatchButton from "./StopWatchButton"
import React from "react"

describe("StopWatchButton", () => {
  test("initial render", () => {
    render(<StopWatchButton setTimeInSeconds={jest.fn()} timeInSeconds={0} />)
    expect(screen.getByText("Start")).toBeDefined()
    expect(screen.getByText("Stop")).toBeDefined()
    expect(screen.getByText("Reset")).toBeDefined()
    expect(screen.getByText("Record")).toBeDefined()
  })
  test("start and stop", async () => {
    jest.useFakeTimers()
    const mockSetTimeInSeconds = jest.fn()
    render(
      <StopWatchButton
        setTimeInSeconds={mockSetTimeInSeconds}
        timeInSeconds={0}
      />
    )
    await fireEvent.click(screen.getByText("Start"))
    await jest.advanceTimersToNextTimerAsync()
    expect(mockSetTimeInSeconds).toHaveBeenCalledTimes(1)
    await fireEvent.click(screen.getByText("Stop"))
    await jest.advanceTimersToNextTimerAsync()
    expect(mockSetTimeInSeconds).toHaveBeenCalledTimes(1)
    jest.useRealTimers()
  })
  test("reset", async () => {
    jest.useFakeTimers()
    const mockSetTimeInSeconds = jest.fn()
    render(
      <StopWatchButton
        setTimeInSeconds={mockSetTimeInSeconds}
        timeInSeconds={0}
      />
    )
    await fireEvent.click(screen.getByText("Reset"))
    await jest.advanceTimersToNextTimerAsync()
    expect(mockSetTimeInSeconds).toHaveBeenCalledWith(0)
    jest.useRealTimers()
  })
  test("record", async () => {
    const mockSetTimeInSeconds = jest.fn()
    render(
      <StopWatchButton
        setTimeInSeconds={mockSetTimeInSeconds}
        timeInSeconds={3}
      />
    )
    await fireEvent.click(screen.getByText("Record"))
    expect(screen.getByText("Lap Times:")).toBeDefined()
    expect(screen.getByText("Lap 1: 00:00:03")).toBeDefined()
  })
})

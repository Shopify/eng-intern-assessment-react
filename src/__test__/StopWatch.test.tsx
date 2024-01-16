/**
 * @jest-environment jsdom
 */

import React from "react"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { StopWatch } from "../StopWatch"

jest.useFakeTimers()
const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
const sleep = () => act(() => jest.advanceTimersByTime(1000))

describe("StopWatch", () => {
  beforeEach(() => {
    render(<StopWatch />)
  })

  test("initial state is stopped with time 0", () => {
    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:00.000")
    expect(screen.queryByTestId("stopwatch-stop")).toBeNull()
    expect(screen.getByTestId("stopwatch-start")).toBeTruthy()
    expect(screen.getByTestId("stopwatch-reset")).toBeDisabled()
    expect(screen.getByTestId("stopwatch-lap")).toBeEnabled()
    expect(screen.queryByTestId("stopwatch-laps")).toBeNull()
  })

  test("pressing start button starts timer", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))

    expect(screen.queryByTestId("stopwatch-start")).toBeNull()
    expect(screen.getByTestId("stopwatch-stop")).toBeTruthy()
    expect(screen.getByTestId("stopwatch-reset")).toBeEnabled()
    expect(screen.getByTestId("stopwatch-lap")).toBeEnabled()
    expect(screen.queryByTestId("stopwatch-laps")).toBeNull()
  })

  test("display text changes with time", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))

    sleep()
    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:01")

    sleep()
    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:02")
  })

  test("stop button stops timer", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()
    await user.click(screen.getByTestId("stopwatch-stop"))

    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:01")
    expect(screen.getByTestId("stopwatch-start")).toBeTruthy()
  })

  test("start button resumes timer after stop", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()
    await user.click(screen.getByTestId("stopwatch-stop"))
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()

    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:02")
    expect(screen.getByTestId("stopwatch-stop")).toBeTruthy()
  })

  test("reset button resets timer when stopped", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()
    await user.click(screen.getByTestId("stopwatch-stop"))
    await user.click(screen.getByTestId("stopwatch-reset"))
    sleep()

    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:00")
    expect(screen.getByTestId("stopwatch-start")).toBeTruthy()
  })

  test("reset button resets timer when running", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()
    await user.click(screen.getByTestId("stopwatch-reset"))
    sleep()

    expect(screen.getByTestId("stopwatch-display")).toHaveTextContent("00:00:01")
  })

  test("lap button records total time", async () => {
    await user.click(screen.getByTestId("stopwatch-lap"))
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()
    await user.click(screen.getByTestId("stopwatch-lap"))
    sleep()
    sleep()
    await user.click(screen.getByTestId("stopwatch-lap"))

    expect(screen.getByTestId("stopwatch-laps")).toHaveTextContent("00:00:00")
    expect(screen.getByTestId("stopwatch-laps")).toHaveTextContent("00:00:01")
    expect(screen.getByTestId("stopwatch-laps")).toHaveTextContent("00:00:02") // delta
    expect(screen.getByTestId("stopwatch-laps")).toHaveTextContent("00:00:03")
  })

  test("reset button resets laps", async () => {
    await user.click(screen.getByTestId("stopwatch-start"))
    sleep()
    await user.click(screen.getByTestId("stopwatch-lap"))
    await user.click(screen.getByTestId("stopwatch-reset"))

    expect(screen.queryByTestId("stopwatch-laps")).toBeNull()
  })
})

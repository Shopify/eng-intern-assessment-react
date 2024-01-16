/**
 * @jest-environment jsdom
 */

import React from "react"
import { act, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { useRerenderEveryFrame } from "../hooks"

const Counter = (props: { rerender: boolean }) => {
  useRerenderEveryFrame(props.rerender)
  const count = React.useRef(0)
  count.current++
  return <span data-testid="counter">{count.current}</span>
}

const Parent = () => {
  const count = React.useRef(0)
  count.current++
  return (
    <div>
      <span data-testid="parent">{count.current}</span>
      <Counter rerender={true} />
    </div>
  )
}

const sleep = () => act(() => jest.advanceTimersByTime(1000))

describe("useRerenderEveryFrame", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test("rerenders every frame when true", async () => {
    render(<Counter rerender={true} />)
    expect(screen.getByTestId("counter")).toHaveTextContent("1")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("2")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("3")
  })

  test("does not rerender when false", async () => {
    render(<Counter rerender={false} />)
    expect(screen.getByTestId("counter")).toHaveTextContent("1")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("1")
  })

  test("rerenders when true after being false", async () => {
    const { rerender } = render(<Counter rerender={false} />)
    expect(screen.getByTestId("counter")).toHaveTextContent("1")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("1")
    rerender(<Counter rerender={true} />)
    expect(screen.getByTestId("counter")).toHaveTextContent("2")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("3")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("4")
  })

  test("does not rerender when false after being true", async () => {
    const { rerender } = render(<Counter rerender={true} />)
    expect(screen.getByTestId("counter")).toHaveTextContent("1")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("2")
    rerender(<Counter rerender={false} />)
    expect(screen.getByTestId("counter")).toHaveTextContent("3")
    sleep()
    expect(screen.getByTestId("counter")).toHaveTextContent("3")
  })

  test("parent does not rerender", async () => {
    render(<Parent />)
    expect(screen.getByTestId("parent")).toHaveTextContent("1")
    sleep()
    expect(screen.getByTestId("parent")).toHaveTextContent("1")
    expect(screen.getByTestId("counter")).toHaveTextContent("2")
  })
})

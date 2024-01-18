/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import App from '../App'
import '@testing-library/jest-dom'

// stopwatch component tests
describe('Stopwatch Component', () => {
  
  // basic render test
  test('Stopwatch renders without issue', async () => {
    // render the app
    render(<App />)
    // ensure stopwatch face and buttons exist in the document
    expect(screen.getByTestId('stopwatch')).toBeInTheDocument()
    expect(screen.getByTestId('stopwatch-buttons')).toBeInTheDocument()
  })

  // button visibility test
  test('"Stop" and "lap" buttons are only visible when running', async () => {
    render(<App />)
    
    // expect the start and reset buttons to be visible
    expect(screen.getByTestId('start')).toBeVisible()
    expect(screen.getByTestId('reset')).toBeVisible()
    // expect the pause and lap buttons to not exist or be hidden
    expect(screen.queryByTestId('pause')).toBeNull()
    expect(screen.getByTestId('lap')).not.toBeVisible()

    // start the stopwatch
    fireEvent.click(screen.getByTestId('start'))

    await waitFor(() => {
      // expect the pause and lap buttons to be visible
      expect(screen.getByTestId('pause')).toBeVisible()
      expect(screen.getByTestId('lap')).toBeVisible()
      // expect start to be hidden
      expect(screen.queryByTestId('start')).toBeNull()
    })

    // pause the stopwatch
    fireEvent.click(screen.getByTestId('pause'))

    await waitFor(() => {
      // reverify the correct buttons are visible
      expect(screen.getByTestId('start')).toBeVisible()
      expect(screen.queryByTestId('pause')).toBeNull()
      expect(screen.getByTestId('lap')).not.toBeVisible()
    })
  })

  // stopwatch start and stop test
  test('Starts and stops correctly', async () => {
    jest.useFakeTimers()
    render(<App />)
    
    // expect the have a time of 0 before starting
    expect(screen.getByTestId('time-display')).toHaveTextContent("00:00:00")
    
    // start the stopwatch
    fireEvent.click(screen.getByTestId('start'))
    
    await waitFor(() => {
      // expect the time to now be a non zero value
      expect(screen.getByTestId('time-display')).toHaveTextContent(/^(?!00:00:00)00:[0-5][0-9]:[0-9][0-9]$/)
    })

    // save the current time before pausing
    const currTime = screen.getByTestId('time-display').textContent

    // pause the stopwatch
    fireEvent.click(screen.getByTestId('pause'))

    // simulate the passage of time
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // verify the time is unchanged
    expect(screen.getByTestId('time-display')).toHaveTextContent(currTime)
  })

  // stopwatch lap test
  test('Logs laps correctly', async () => {
    jest.useFakeTimers()
    render(<App />)
    
    // start the stopwatch 
    fireEvent.click(screen.getByTestId('start'))
    
    // simulate passage of 1s
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // record a lap
    fireEvent.click(screen.getByTestId('lap'))

    // expect the new lap data to be visible in the laps table
    expect(screen.getByTestId('laps-table')).toHaveTextContent("#1")
    expect(screen.getByTestId('laps-table')).toHaveTextContent("00:01:00")

    // simulate passage of 2.5s
    act(() => {
      jest.advanceTimersByTime(2500)
    })

    // record another lap
    fireEvent.click(screen.getByTestId('lap'))

    // expect the second lap data to appear in the table
    expect(screen.getByTestId('laps-table')).toHaveTextContent("#2")
    expect(screen.getByTestId('laps-table')).toHaveTextContent("00:03:50")
    expect(screen.getByTestId('laps-table')).toHaveTextContent("00:02:50")
  })

  // stopwatch reset test 
  test('Reset correctly', async () => {
    jest.useFakeTimers()
    render(<App />)
    
    // expect the time to start at 0
    expect(screen.getByTestId('time-display')).toHaveTextContent("00:00:00")
    
    // start the stopwatch
    fireEvent.click(screen.getByTestId('start'))
    
    // simulate passage of 1s
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // record a lap to the lap table
    fireEvent.click(screen.getByTestId('lap'))

    // reset the stopwatch
    fireEvent.click(screen.getByTestId('reset'))

    await waitFor(() => {
      // expect the time to have been reset to 0
      expect(screen.getByTestId('time-display')).toHaveTextContent("00:00:00")
      // expect the lap data to be removed
      expect(screen.queryByTestId('laps-table')).toBeNull()
    })
  })
})

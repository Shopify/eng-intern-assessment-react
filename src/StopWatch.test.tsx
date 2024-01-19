import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import StopWatch from './StopWatch'

jest.mock('./StopWatchButton', () => () => <div data-testid="stopwatch-button" />)


describe('StopWatch component', () => {
  test('renders with initial state', () => {
    render(<StopWatch />)
    
    // Ensure that the component renders with the initial state
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText(/lap 1/i)).toBeInTheDocument()
    expect(screen.getByText('0:00:00:00')).toBeInTheDocument()
  });

  test('clicking Start button toggles the timer', () => {
    render(<StopWatch />)

    // Click the Start button
    fireEvent.click(screen.getByText('Start'))

    // Expect the button text and the timer to be updated
    expect(screen.getByText('Stop')).toBeInTheDocument()
    expect(screen.getByText(/lap 1/i)).toBeInTheDocument()

    // Click the Start button again
    fireEvent.click(screen.getByText('Stop'))

    // Expect the button text to be reset to 'Start'
    expect(screen.getByText('Start')).toBeInTheDocument()
  });

  test('clicking Reset button resets the timer', () => {
    render(<StopWatch />)

    // Click the Start button to start the timer
    fireEvent.click(screen.getByText('Start'))

    // Click the Reset button
    fireEvent.click(screen.getByText('Reset'))

    // Expect the button text and the timer to be reset
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText(/lap 1/i)).toBeInTheDocument()
    expect(screen.getByText('0:00:00:00')).toBeInTheDocument()
  });

  test('clicking Lap button increments lap count and resets timer', () => {
    render(<StopWatch />)

    // Click the Start button to start the timer
    fireEvent.click(screen.getByText('Start'))

    // Click the Lap button
    fireEvent.click(screen.getByText(/lap 1/i))

    // Expect the lap count to be incremented and the timer to be reset
    expect(screen.getByText(/lap 2/i)).toBeInTheDocument()
    expect(screen.getByText('0:00:00:00')).toBeInTheDocument()
  })
})

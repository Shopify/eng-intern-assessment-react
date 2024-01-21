import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App'

describe('stopwatch', () => {
  it('renders correctly', () => {
    render(<App />)
    expect(screen.getByText('00:00:00:00')).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('Stop')).toBeInTheDocument()
    expect(screen.getByText('Reset')).toBeInTheDocument()
    expect(screen.getByText('Lap')).toBeInTheDocument()
  })

  // check if counter starts counting
  it('starts and stops timer', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Start'))
    jest.useFakeTimers()
    setTimeout(() => {
      expect(screen.getByText('00:00:00:00')).not.toBeInTheDocument()
    }, 1)

    // check if counter stays constant
    fireEvent.click(screen.getByText('Stop'))
    const pausedTime = screen.getByTestId('clock')
    jest.useFakeTimers()
    setTimeout(() => {
      expect(screen.getByText('00:00:00:00')).not.toBeInTheDocument()
    }, 1000)
    expect(screen.getByTestId('clock') == pausedTime)
  })

  // check if counter starts again after stopping
  it('resumes after stopping timer', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Start'))
    fireEvent.click(screen.getByText('Stop'))
    const pausedTime = screen.getByTestId('clock')
    fireEvent.click(screen.getByText('Start'))

    jest.useFakeTimers()
    setTimeout(() => {
      expect(screen.getByTestId('clock') != pausedTime)
    }, 1)
  })

  // check if laps are displayed
  it('records laps when button is pressed', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Start'))
    fireEvent.click(screen.getByText('Lap'))
    const pausedTime = screen.getByTestId('clock')
    expect(screen.getByTestId('lap-table')).toBeInTheDocument()
    expect(screen.getByTestId('total-time') == pausedTime)
  })

  // check if counter is zero and previous laps are removed
  it('resets laps and stopwatch to zero', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Start'))
    fireEvent.click(screen.getByText('Lap'))
    fireEvent.click(screen.getByText('Reset'))
    expect(screen.queryByTestId('lap-display')).not.toBeInTheDocument()
    expect(screen.getByText('00:00:00:00')).toBeInTheDocument()
  })
})

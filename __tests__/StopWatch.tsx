import React from 'react';
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import StopWatch from '../src/StopWatch'

test('starts and stops correctly', async () => {
  render(<StopWatch />)

  await userEvent.click(screen.getByText('Start'))
  expect(screen.getByTestId('startStopButton')).toHaveTextContent('Stop')
  await act(async () => {
    await new Promise(r => setTimeout(r, 200))
  })
  await userEvent.click(screen.getByText('Stop'))
  
  expect(screen.getByTestId('timeDisplay')).not.toHaveTextContent('00:00:00.000')
  expect(screen.getByTestId('startStopButton')).toHaveTextContent('Start')
})

test('resets correctly', async () => {
  render(<StopWatch />)

  await userEvent.click(screen.getByText('Start'))
  await act(async () => {
    await new Promise(r => setTimeout(r, 200))
  })
  await userEvent.click(screen.getByText('Stop'))
  expect(screen.getByTestId('timeDisplay')).not.toHaveTextContent('00:00:00.000')
  await userEvent.click(screen.getByText('Reset'))

  expect(screen.queryAllByTestId('lap').length).toBe(0)
  expect(screen.getByTestId('timeDisplay')).toHaveTextContent('00:00:00.000')
})

test('records laps correctly', async () => {
  render(<StopWatch />)

  await userEvent.click(screen.getByText('Start'))
  for (let i = 0; i < 10; ++i) { //click Lap 10 times
    await act(async () => {
      await new Promise(r => setTimeout(r, 100))
    })
    await userEvent.click(screen.getByText('Lap'))
  }

  expect(screen.getAllByTestId('lap').length).toBe(11)
})
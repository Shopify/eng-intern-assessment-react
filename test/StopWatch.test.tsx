import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatch from '../src/StopWatch';
import SWContext, {SWContextType} from '../src/SWContext'

// Unit test for StopWatch.tsx

const customRender = (ui:React.JSX.Element, providerProps: SWContextType ) => {
    return render(
        <SWContext.Provider value={{...providerProps}} >
            {ui}
        </SWContext.Provider>
    )
  }

// ====================================================
test('Initial the stop watch display', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 0,
        setStartTime: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        lapNumber: 0,
        setLapNumber: jest.fn(),
        status: 0,
        setStatus: jest.fn(),
    }
    customRender(
      <StopWatch/>,
      providerProps,
    )
    expect(screen.getByText(".").parentElement.textContent).toBe('0:00:00.00')
  })

// ====================================================
  test('If currentTime is 1000ms,1ms', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 0,
        setStartTime: jest.fn(),
        currentTime: 1000,
        setCurrentTime: jest.fn(),
        lapNumber: 0,
        setLapNumber: jest.fn(),
        status: 0,
        setStatus: jest.fn(),
    }
    customRender(
      <StopWatch/>,
      providerProps,
    )
    expect(screen.getByText(".").parentElement.textContent).toBe('0:00:01.00')
  })

// ====================================================
  test('If currentTime is 52465298ms, 14:34:25.29', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 0,
        setStartTime: jest.fn(),
        currentTime: 52465298,
        setCurrentTime: jest.fn(),
        lapNumber: 0,
        setLapNumber: jest.fn(),
        status: 0,
        setStatus: jest.fn(),
    }
    customRender(
      <StopWatch/>,
      providerProps,
    )
    expect(screen.getByText(".").parentElement.textContent).toBe('14:34:25.29')
  })

// ====================================================
  test('If currentTime is 90000 start from 10000', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 10000,
        setStartTime: jest.fn(),
        currentTime: 90000,
        setCurrentTime: jest.fn(),
        lapNumber: 0,
        setLapNumber: jest.fn(),
        status: 0,
        setStatus: jest.fn(),
    }
    customRender(
      <StopWatch/>,
      providerProps,
    )
    expect(screen.getByText(".").parentElement.textContent).toBe('0:01:20.00')
  })
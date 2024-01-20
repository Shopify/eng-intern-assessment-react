import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatchButton from '../src/StopWatchButton';
import SWContext, {SWContextType} from '../src/SWContext'

// Unit test for StopWatchButton.tsx
const customRender = (ui:React.JSX.Element, providerProps: SWContextType ) => {
    return render(
        <SWContext.Provider value={{...providerProps}} >
            {ui}
        </SWContext.Provider>
    )
  }

// ====================================================
test('When watch stoped what button show', () => {
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
      <StopWatchButton/>,
      providerProps,
    )
    expect(screen.getAllByRole("button").map(b=>b.title)).toEqual(["Start"])
  })

// ====================================================
test('When watch running what button show', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 0,
        setStartTime: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        lapNumber: 0,
        setLapNumber: jest.fn(),
        status: 1,
        setStatus: jest.fn(),
    }
    customRender(
    <StopWatchButton/>,
    providerProps,
    )
    expect(screen.getAllByRole("button").map(b=>b.title)).toEqual(["Lap","Pause"])
})

// ====================================================
test('When watch paused what button show', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 0,
        setStartTime: jest.fn(),
        currentTime: 0,
        setCurrentTime: jest.fn(),
        lapNumber: 0,
        setLapNumber: jest.fn(),
        status: 2,
        setStatus: jest.fn(),
    }
    customRender(
    <StopWatchButton/>,
    providerProps,
    )
    expect(screen.getAllByRole("button").map(b=>b.title)).toEqual(["Reset","Resume"])
})
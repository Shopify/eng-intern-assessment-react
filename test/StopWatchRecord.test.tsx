import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatchRecord from '../src/StopWatchRecord';
import SWContext, {SWContextType} from '../src/SWContext'

// Unit test for StopWatchRecord.tsx

// ====================================================
test('First row always goes with current time', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 1000,
        setStartTime: jest.fn(),
        currentTime: 2000,
        setCurrentTime: jest.fn(),
        lapNumber: 1,
        setLapNumber: jest.fn(),
        status: 1,
        setStatus: jest.fn(),
    }
    
    const { rerender } = render(
        <SWContext.Provider value={{...providerProps}} >
            <StopWatchRecord/>
        </SWContext.Provider>
    )

    expect(screen.getAllByRole("rowgroup").filter(e => e.tagName=="TBODY")[0].textContent).toBe("#10:00:00.000:00:01.00")
  })


// ====================================================
test('First row always goes with current time, when lapnumber, add new row', () => {
const providerProps:SWContextType = {
    isDarkMode: false,
    setIsDarkMode: jest.fn(),
    startTime: 0,
    setStartTime: jest.fn(),
    currentTime: 15000,
    setCurrentTime: jest.fn(),
    lapNumber: 1,
    setLapNumber: jest.fn(),
    status: 1,
    setStatus: jest.fn(),
}

const { rerender } = render(
    <SWContext.Provider value={{...providerProps}} >
        <StopWatchRecord/>
    </SWContext.Provider>
)

providerProps.currentTime = 30000
providerProps.lapNumber += 1

rerender(
    <SWContext.Provider value={{...providerProps}} >
        <StopWatchRecord/>
    </SWContext.Provider>
)
expect(screen.getAllByRole("rowgroup").filter(e => e.tagName=="TBODY")[0].firstChild.textContent).toBe("#20:00:00.000:00:30.00")
expect(screen.getAllByRole("rowgroup").filter(e => e.tagName=="TBODY")[0].lastChild.textContent).toBe("#10:00:15.000:00:30.00")
})

// ====================================================
test('More test on first row and lap nuumber', () => {
    const providerProps:SWContextType = {
        isDarkMode: false,
        setIsDarkMode: jest.fn(),
        startTime: 0,
        setStartTime: jest.fn(),
        currentTime: 15000,
        setCurrentTime: jest.fn(),
        lapNumber: 1,
        setLapNumber: jest.fn(),
        status: 1,
        setStatus: jest.fn(),
    }
    
    const { rerender } = render(
        <SWContext.Provider value={{...providerProps}} >
            <StopWatchRecord/>
        </SWContext.Provider>
    )
    
    for(let i=0;i<20;i++){
        providerProps.currentTime += 30000
        providerProps.lapNumber += 1
        
        rerender(
            <SWContext.Provider value={{...providerProps}} >
                <StopWatchRecord/>
            </SWContext.Provider>
        )
    }
    
    rerender(
        <SWContext.Provider value={{...providerProps}} >
            <StopWatchRecord/>
        </SWContext.Provider>
    )
    expect(screen.getAllByRole("rowgroup").filter(e => e.tagName=="TBODY")[0].firstChild.textContent).toBe("#210:00:00.000:10:15.00")
    expect(screen.getAllByRole("rowgroup").filter(e => e.tagName=="TBODY")[0].childElementCount).toBe(21)
    })
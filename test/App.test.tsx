import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../src/App';

import {SWContextProvider} from '../src/SWContextProvider';

// Unit test for the entire App component

// Offical workaround for matchMedia doc: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
  })),
});

jest.useFakeTimers();

// ==================== Unit test for the entire App component ====================
test('Test start button', () => {
  
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const startBtn = screen.getAllByRole("button").filter(e => e.title=="Start")[0]

  fireEvent.click(startBtn)

  expect(screen.getAllByRole("button").map(b=>b.title)).toEqual(["DarkMode","Lap", "Pause"])
})

// ====================================================
test('Test the time display after 20 sec', () => {
  
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const startBtn = screen.getAllByRole("button").filter(e => e.title=="Start")[0]

  fireEvent.click(startBtn)
  act(() => {
    jest.advanceTimersByTime(20000);
  })

  const pauseBtn = screen.getAllByRole("button").filter(e => e.title=="Pause")[0]

  fireEvent.click(pauseBtn)
  
  expect(screen.getAllByRole("button").map(b=>b.title)).toEqual(["DarkMode","Reset", "Resume"])
  
  expect(screen.getByText(".").parentElement.textContent).toBe('0:00:20.00')
})

// ====================================================
test('Test the time display after 20 sec, then lap 3 times at 25, 30, 33 sec', () => {
  
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const startBtn = screen.getAllByRole("button").filter(e => e.title=="Start")[0]

  fireEvent.click(startBtn)
  let lapBtn = null

  act(() => {
    jest.advanceTimersByTime(20000);
  })

  
  act(() => {
    jest.advanceTimersByTime(5000);
  })

  lapBtn = screen.getAllByRole("button").filter(e => e.title=="Lap")[0]
  fireEvent.click(lapBtn)

  act(() => {
    jest.advanceTimersByTime(5000);
  })

  lapBtn = screen.getAllByRole("button").filter(e => e.title=="Lap")[0]
  fireEvent.click(lapBtn)

  act(() => {
    jest.advanceTimersByTime(3000);
  })

  lapBtn = screen.getAllByRole("button").filter(e => e.title=="Lap")[0]
  fireEvent.click(lapBtn)
  
  const pauseBtn = screen.getAllByRole("button").filter(e => e.title=="Pause")[0]

  fireEvent.click(pauseBtn)

  const rows = screen.getAllByRole("rowgroup").filter(e => e.tagName=="TBODY")[0].childNodes

  expect(rows.length).toBe(4)
  rows.forEach((row, index) => {
    if(index==0){
      expect(row.textContent).toBe("#40:00:00.000:00:33.00")
    }
    if(index==1){
      expect(row.textContent).toBe("#30:00:03.000:00:33.00")
    }
    if(index==2){
      expect(row.textContent).toBe("#20:00:05.000:00:30.00")
    }
    if(index==3){
      expect(row.textContent).toBe("#10:00:25.000:00:25.00")
    }
  })

  expect(screen.getByText(".").parentElement.textContent).toBe('0:00:33.00')
})

// ====================================================
test('Test running 20sec, then pause for 10sec, then resume for 13sec', () => {
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const startBtn = screen.getAllByRole("button").filter(e => e.title=="Start")[0]

  fireEvent.click(startBtn)

  act(() => {
    jest.advanceTimersByTime(20000);
  })

  const pauseBtn = screen.getAllByRole("button").filter(e => e.title=="Pause")[0]

  fireEvent.click(pauseBtn)

  act(() => {
    jest.advanceTimersByTime(10000);
  })

  const resumeBtn = screen.getAllByRole("button").filter(e => e.title=="Resume")[0]

  fireEvent.click(resumeBtn)

  act(() => {
    jest.advanceTimersByTime(13000);
  })

  expect(screen.getByText(".").parentElement.textContent).toBe('0:00:33.00')
})

// ====================================================
test('Test running 20sec, then pause for 10sec, then reset', () => {
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const startBtn = screen.getAllByRole("button").filter(e => e.title=="Start")[0]

  fireEvent.click(startBtn)

  act(() => {
    jest.advanceTimersByTime(20000);
  })

  const pauseBtn = screen.getAllByRole("button").filter(e => e.title=="Pause")[0]

  fireEvent.click(pauseBtn)

  act(() => {
    jest.advanceTimersByTime(10000);
  })

  const resetBtn = screen.getAllByRole("button").filter(e => e.title=="Reset")[0]

  fireEvent.click(resetBtn)

  expect(screen.getByText(".").parentElement.textContent).toBe('0:00:00.00')
})
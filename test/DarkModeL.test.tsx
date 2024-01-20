import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

import {SWContextProvider} from '../src/SWContextProvider';

// Unit test for dark mode, system perference is light mode

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

// ====================================================
test("Test mode with system perference", () => {

  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )

  expect(document.documentElement.dataset.theme).toBe("light")
})

// ====================================================
test("Test dark mode", () => {
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const darkModeBtn = screen.getAllByRole("button").filter(e => e.title=="DarkMode")[0]

  fireEvent.click(darkModeBtn)

  expect(document.documentElement.dataset.theme).toBe("dark")
})

// ====================================================
test("Test dark mode, then reset", () => {
  const { rerender } = render(
    <SWContextProvider>
        <App/>
    </SWContextProvider>
  )
  
  const darkModeBtn = screen.getAllByRole("button").filter(e => e.title=="DarkMode")[0]

  fireEvent.click(darkModeBtn)
  fireEvent.click(darkModeBtn)

  expect(document.documentElement.dataset.theme).toBe("light")
})
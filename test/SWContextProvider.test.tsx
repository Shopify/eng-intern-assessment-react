import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import {SWContextProvider} from '../src/SWContextProvider';
import SWContext from '../src/SWContext';

// Unit test for SWContextProvider.tsx
const TestComponent: React.FC = () => {
    const context = React.useContext(SWContext);
  
    return (
      <div>
        <span data-testid="isDarkMode">{context.isDarkMode.toString()}</span>
        <span data-testid="startTime">{context.startTime}</span>
        <span data-testid="currentTime">{context.currentTime}</span>
        <span data-testid="lapNumber">{context.lapNumber}</span>
        <span data-testid="status">{context.status}</span>
        <button onClick={() => context.setIsDarkMode(true)}>Set Dark Mode</button>
        <button onClick={() => context.setStartTime(1000)}>Set Start Time</button>
        <button onClick={() => context.setCurrentTime(2000)}>Set Current Time</button>
        <button onClick={() => context.setLapNumber(2)}>Set Lap Number</button>
        <button onClick={() => context.setStatus(1)}>Set Status</button>
      </div>
    );
};

// ====================================================
test('SWContextProvider provides correct initial values', () => {
  render(
    <SWContextProvider>
      <TestComponent />
    </SWContextProvider>
  );

  expect(screen.getByTestId('isDarkMode').textContent).toBe('false');
  expect(screen.getByTestId('startTime').textContent).toBe("0");
  expect(screen.getByTestId('currentTime').textContent).toBe("0");
  expect(screen.getByTestId('lapNumber').textContent).toBe("1");
  expect(screen.getByTestId('status').textContent).toBe("0");
});


// ====================================================
test('SWContextProvider provides correct values after change', () => {
    const { rerender } = render(
      <SWContextProvider>
        <TestComponent />
      </SWContextProvider>
    );

    fireEvent.click(screen.getByText('Set Dark Mode'));
    fireEvent.click(screen.getByText('Set Start Time'));
    fireEvent.click(screen.getByText('Set Current Time'));
    fireEvent.click(screen.getByText('Set Lap Number'));
    fireEvent.click(screen.getByText('Set Status'));

    rerender(
        <SWContextProvider>
          <TestComponent />
        </SWContextProvider>
      );
  
    expect(screen.getByTestId('isDarkMode').textContent).toBe('true');
    expect(screen.getByTestId('startTime').textContent).toBe("1000");
    expect(screen.getByTestId('currentTime').textContent).toBe("2000");
    expect(screen.getByTestId('lapNumber').textContent).toBe("2");
    expect(screen.getByTestId('status').textContent).toBe("1");
  });
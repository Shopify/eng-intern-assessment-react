import React from 'react';
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '../__mocks__/matchMedia.mock'
import StopWatch from '../StopWatch';
import { AppProvider } from '@shopify/polaris';

const mockBeginData = {
  currentTime: 0,
  totalTime: 0,
  lapTimes: [],
  totalTimes: []
}

const mockTestData = {
  currentTime: 3600, // 1 hour = current lap time.
  totalTime: 7100,   // 1 hour 58 minutes and 20 seconds = total time.
  lapTimes: [3500, 3600], // Lap times for testing.
  totalTimes: [3500, 7100], // Total times for testing.
};

/*
The tests below are used to check if the StopWatch component accurately calculates the 
times (in seconds) passed in as props from the App component.
*/

describe('Stopwatch', () => {
  test('renders initial display correctly', async () => {
    render(<AppProvider><StopWatch {...mockBeginData}/></AppProvider>);
    await waitFor(() => {
      expect(screen.getByTestId("currDisp")).toHaveTextContent(/00:00:00/);
      expect(screen.getByTestId("totalDisp")).toHaveTextContent(/00:00:00/);
      expect(screen.getByTestId("currDisp")).not.toHaveTextContent(/01:00:00/);
      expect(screen.getByTestId("totalDisp")).not.toHaveTextContent(/01:00:00/);
    });

  });

  test('renders initial table correctly, table has no values', () => {
    render(<AppProvider><StopWatch {...mockBeginData}/></AppProvider>);
    
    const rows = screen.getAllByRole("table");
    expect(rows.length).toBe(2);

    const colHeaderOne = screen.getAllByRole("columnheader", { name: /Lap Number/i })
    expect(colHeaderOne[0]).toBeInTheDocument()

    const colHeaderTwo = screen.getAllByRole("columnheader", { name: /Lap Time/i })
    expect(colHeaderTwo[0]).toBeInTheDocument()

    const colHeaderThree = screen.getAllByRole("columnheader", { name: /Total Elapsed Time/i })
    expect(colHeaderThree[0]).toBeInTheDocument()

    /*
    //Can uncomment, test should fail if this is uncommented because cells have no values yet
    //therefore the cell tole doesn't exist yet.
    const cellOne = screen.getAllByRole("cell")
    expect(cellOne).toBeNull()
    */

  
  });

  test('renders test display values correctly', async () => {
    render(<AppProvider><StopWatch {...mockTestData}/></AppProvider>);
    await waitFor(() => {
      expect(screen.getByTestId("currDisp")).toHaveTextContent(/01:00:00/);
      expect(screen.getByTestId("totalDisp")).toHaveTextContent(/01:58:20/);
    });

  });

  test('renders test lap table values correctly', () => {
    render(<AppProvider><StopWatch {...mockTestData}/></AppProvider>);
    const rows = screen.queryAllByRole("row");
    expect(rows.length).toBe(mockTestData.lapTimes.length + 2);

    const rowHeaderOne = screen.getByRole("rowheader", { name: /Lap 1/i })
    expect(rowHeaderOne).toBeInTheDocument()

    const rowHeaderTwo = screen.getByRole("rowheader", { name: /Lap 2/i })
    expect(rowHeaderTwo).toBeInTheDocument()

    //There are only 3 cells to test because on the first lap, current time = total elapsed time.
    const cellOne = screen.getAllByRole("cell", { name: /00:58:20/i })
    expect(cellOne.some(cell => cell.textContent === '00:58:20')).toBe(true)

    const cellThree = screen.getAllByRole("cell", { name: /01:00:00/i })
    expect(cellThree.some(cell => cell.textContent === '01:00:00')).toBe(true)

    const cellFour = screen.getAllByRole("cell", { name: /01:58:20/i })
    expect(cellFour.some(cell => cell.textContent === '01:58:20')).toBe(true)
  });
});

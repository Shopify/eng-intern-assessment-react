/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import StopWatch from '../src/StopWatch.tsx';


describe("StopWatch functionality", () => {

  it("should render the initial StopWatch component correctly", () => {
    render(<StopWatch />)

    // Check if initial time is "00:00:00".
    expect(screen.getByText("00:00:00")).toBeInTheDocument();

    // Check if Start and Reset buttons are present on initial render
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();

    // Check if Lap and Pause buttons are not present on initial render when stopwatch is inactive
    expect(screen.queryByTestId("stopwatch-lap")).not.toBeInTheDocument();
    expect(screen.queryByTestId("stopwatch-pause")).not.toBeInTheDocument();

    // Check if lap list is not present on initial render when stopwatch is inactive
    expect(screen.queryByTestId("stopwatch-lap-list")).not.toBeInTheDocument();
  });
  //end


});




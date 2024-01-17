/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import StopWatch from '../src/StopWatch.tsx';

// Create snapshot to compare new output against previously saved snap
describe("snapshot test for stability", () => {
  it("should render the initial StopWatch component correctly", () => {

    const { container } = render(<StopWatch />);
    expect(container).toMatchSnapshot();

    // Check if initial time is "00:00:00".
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });
});
//end


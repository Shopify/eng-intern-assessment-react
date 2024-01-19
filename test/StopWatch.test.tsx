import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../src/StopWatch';

//testing the StopWatch component
describe('StopWatch', () => {
  it('renders without crashing', () => {
    render(<StopWatch />);
  });

  //testing if the initial time is 0
  it('displays initial time as 0', () => {
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
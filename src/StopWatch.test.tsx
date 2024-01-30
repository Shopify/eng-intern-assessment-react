import React from 'react';
import { render } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import '@testing-library/jest-dom';


describe('Stopwatch Display', () => {
  it('renders the formatted time', () => {
    const timerArray = ['00', '01', '30']; // 1 minute 30 seconds
    const { getByText } = render(<Stopwatch timerArray={timerArray} />);
    expect(getByText('00')).toBeInTheDocument();
    expect(getByText('01')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
  });
});
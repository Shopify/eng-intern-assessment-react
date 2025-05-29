import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from './Stopwatch';

describe('Stopwatch', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Stopwatch time={60000} />);
    expect(getByText('01:00:00')).toBeInTheDocument();
  });

  test('displays the correct time', () => {
    const { getByText } = render(<Stopwatch time={90000} />);
    expect(getByText('01:30:00')).toBeInTheDocument();
  });

  test('displays the correct time with milliseconds', () => {
    const { getByText } = render(<Stopwatch time={90500} />);
    expect(getByText('01:30:50')).toBeInTheDocument();
  });
});
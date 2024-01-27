import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from '../Stopwatch';

describe('Stopwatch Component Tests', () => {
  test('renders Stopwatch with formatted time', () => {
    render(<Stopwatch time={300} />); // 5 minutes
    expect(screen.getByText('00:05:00')).toBeInTheDocument();
  });
});

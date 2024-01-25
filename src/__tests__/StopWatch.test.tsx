import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatch from '../StopWatch';

test('renders StopWatch component', () => {
  render(<StopWatch timer='00:00:00'/>)
})
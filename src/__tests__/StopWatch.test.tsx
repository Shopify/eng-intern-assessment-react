import { render, screen } from '@testing-library/react';
import StopWatch from '../StopWatch';
import React from 'react';

describe('StopWatch', () => {

  it('should render StopWatch component, with the display showing "00:00:00"', () => {
    render(<StopWatch />);
  
    const display = screen.getByTitle('display');
    
    expect(display).toBeDefined();
  
    expect(display.textContent).toEqual("00:00:00");
  });
  
  it('should render StopWatch component and all buttons', () => {
    render(<StopWatch />);
    
    const start = screen.getByTitle('start')
    const stop = screen.getByTitle('stop')
    const reset = screen.getByTitle('reset')
    const lap = screen.getByTitle('lap')
  
    expect(start).toBeDefined();
    expect(stop).toBeDefined();
    expect(reset).toBeDefined();
    expect(lap).toBeDefined();
  });
})
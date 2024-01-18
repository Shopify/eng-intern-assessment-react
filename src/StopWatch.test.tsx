import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatch from './StopWatch';


describe("StopWatch component", ()=>{
    test('check seconds render', () => {
        render(<StopWatch hundreths={0} minutes={0} seconds={0} />);
      
        const seconds = screen.getByTestId('seconds');

        expect(seconds).toBeTruthy;
    });
    
    test('check minutes render', () => {
        render(<StopWatch hundreths={0} minutes={0} seconds={0} />);
      
        const minutes = screen.getByTestId('minutes');

        expect(minutes).toBeTruthy;
    });

    test('check hundreths render', () => {
        render(<StopWatch hundreths={0} minutes={0} seconds={0} />);
      
        const hundreths = screen.getByTestId('hundreths');

        expect(hundreths).toBeTruthy;
    });
  
})
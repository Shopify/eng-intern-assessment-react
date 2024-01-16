import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

describe('Main App component', () => {

    beforeAll(()=>{
        jest.useFakeTimers();
    });

    test('renders App component correctly', () => {
        render(<App />);
    
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('00:00')).toBeInTheDocument();
        expect(screen.getByText('.0')).toBeInTheDocument();
      });


    test('clicking Stop button stops the stopwatch', () => {
        render(<App />);
        
        fireEvent.click(screen.getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(100); 
    });

        // Click Stop button
        fireEvent.click(screen.getByText('Stop'));

        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(screen.getByText('00:00')).toBeInTheDocument();
        expect(screen.getByText('.1')).toBeInTheDocument();

    });

    test('clicking Reset button resets the stopwatch', () => {
        render(<App />);

        fireEvent.click(screen.getByText('Start'));

        act(() => {
            jest.advanceTimersByTime(200); // Advance timers by 200 milliseconds
        });
        fireEvent.click(screen.getByText('Stop'));
        fireEvent.click(screen.getByText('Reset'));

        expect(screen.getByText('00:00')).toBeInTheDocument();
        expect(screen.getByText('.0')).toBeInTheDocument();
    });
});

import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

describe('App component', () => {
    test('renders initial is correct', () => {
        render(<App />);
        
        //renders initial time 00:00:00
        //this method is necessary because the 00s are not rendered in same div (for spacing reasons)
        const numZeroDigs = screen.getAllByText('00');
        expect(numZeroDigs).toHaveLength(3);            

        //renders buttons
        expect(screen.getByText('Start')).toBeTruthy();
        expect(screen.getByText('Reset')).toBeTruthy();
      });
  
    test('starts the stopwatch when Start button is clicked', () => {
        render(<App />);
        
        //find start button on screen
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);


        act(() => {
          jest.advanceTimersByTime(100);                                    // let timer run 100ms -> hundthredths shows 10
        });

        expect(screen.getByText('10')).toBeTruthy();
    });

    test('timer accuracy', () => {
        render(<App />);
        
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(754560);                               // let timer run 754560ms -> displays time 12:34:56
        });

        expect(screen.getByText('12')).toBeTruthy();
        expect(screen.getByText('34')).toBeTruthy();
        expect(screen.getByText('56')).toBeTruthy();
    })

    test('pauses the stopwatch but retains time when Pause button is clicked, ', () => {
        render(<App />);
        
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(754560);                               // let timer run 754560ms -> displays time 12:34:56
        });
        const pauseButton = screen.getByText('Pause');
        fireEvent.click(pauseButton);

        act(() => {
            jest.advanceTimersByTime(1000);                                 // let timer run 1s -> since paused, expect no change
        });

        expect(screen.getByText('12')).toBeTruthy();
        expect(screen.getByText('34')).toBeTruthy();
        expect(screen.getByText('56')).toBeTruthy();
    });

    test('resets time back to 0 when Reset button is clicked', () => {
        render(<App />);
        
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);                                 // let timer run 1s
        });

        // must first click pause button for reset button to render
        const pauseButton = screen.getByText('Pause');                      
        fireEvent.click(pauseButton);

        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        // expect three sets of 00s
        const numZeroDigs = screen.getAllByText('00');
        expect(numZeroDigs).toHaveLength(3);
    });
  });
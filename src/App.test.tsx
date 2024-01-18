import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from './App';
import exp from 'constants';

jest.useFakeTimers();

describe('App component', () => {
    test('initial renders is correct', () => {
        render(<App />);
        
        //renders initial time of 00:00:00
        //this method is necessary because the 00s are not rendered in same div (for spacing reasons)
        const numZeroDigs = screen.getAllByText('00');
        expect(numZeroDigs).toHaveLength(3);            

        //renders buttons
        expect(screen.getByText('Start')).toBeTruthy();
        expect(screen.getByText('Reset')).toBeTruthy();
      });
  
    test('starts the stopwatch when Start button is clicked', () => {
        render(<App />);
        
        //click start button to start timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // let timer run 100ms -> hundthredths shows 10
        act(() => {
          jest.advanceTimersByTime(100);
        });

        // expected time: 00:00:10
        const numZeroDigs = screen.getAllByText('00');
        expect(numZeroDigs).toHaveLength(2); 
        expect(screen.getByText('10')).toBeTruthy();
    });

    test('timer accuracy', () => {
        render(<App />);
        
        //click start button to start timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // let timer run 754560ms -> displays time 12:34:56
        act(() => {
            jest.advanceTimersByTime(754560);
        });

        //expected time 12:34:56
        expect(screen.getByText('12')).toBeTruthy();
        expect(screen.getByText('34')).toBeTruthy();
        expect(screen.getByText('56')).toBeTruthy();
    })

    test('pauses the stopwatch but retains time when Pause button is clicked, ', () => {
        render(<App />);
        
        //click start button to start timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // let timer run 754560ms -> displays time 12:34:56
        act(() => {
            jest.advanceTimersByTime(754560);
        });

        //then click pause button to pause timer
        const pauseButton = screen.getByText('Pause');
        fireEvent.click(pauseButton);

        //let more time pass; since paused, timer should not increase
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        //expected time 12:34:56
        expect(screen.getByText('12')).toBeTruthy();
        expect(screen.getByText('34')).toBeTruthy();
        expect(screen.getByText('56')).toBeTruthy();
    });

    test('resets time back to 0 when Reset button is clicked', () => {
        render(<App />);
        
        //click start button to start timer
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        // let timer run 1s
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // must first click pause button (set stopwatchState to paused) for reset button to render
        const pauseButton = screen.getByText('Pause');                      
        fireEvent.click(pauseButton);

        //click reset button to reset time to 0
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        // expected time 00:00:00
        const numZeroDigs = screen.getAllByText('00');
        expect(numZeroDigs).toHaveLength(3);
    });

    test ('"Show Laps" button shows, then hides laps', () => {
        render(<App />);
        //click Show Laps button
        const showLapButton = screen.getByTestId('show-lap-button');
        fireEvent.click(showLapButton);

        //ensure lapList is rendered once Show Labs is clicked
        const lapListShow = screen.getByTestId('lap-list');

        //check that show laps button now says "Hide Laps"
        screen.getByText(/Hide Laps/);
        //click the button
        fireEvent.click(showLapButton);

        //ensure lapList is NOT rendered once Hide Labs is clicked
        const lapListHide = screen.queryByTestId('lap-list');
        expect(lapListHide).toBeFalsy();
    }) 

    test('laps are recorded when Lap button is clicked', () => {
        render(<App />);

        //click Start button to start timer and cause Lap button to render
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
      
        //click Lap button twice to record 2 laps
        const lapButton = screen.getByTestId('lap-button');
        fireEvent.click(lapButton);
        fireEvent.click(lapButton);
      
        //click Show Lap button to cause lapList to render
        const showLapButton = screen.getByTestId('show-lap-button');
        fireEvent.click(showLapButton);

        //check that there are 3 entries in the lapList--2 added laps + 1 ongoing, actively incrementing lap = 3 laps total
        const lapList = screen.getByTestId('lap-list');
        const lapItems = lapList.querySelectorAll('li');
        expect(lapItems.length).toBe(3);
    });

    test('clicking Reset button clears laps list', () => {
        render(<App />);
        
        //click Start button to start timer and cause Lap button to render
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);

        //click Show Lap button to cause lapList to render
        const showLapButton = screen.getByTestId('show-lap-button');
        fireEvent.click(showLapButton);

        // let timer run 754560ms -> displays time 12:34:56
        act(() => {
            jest.advanceTimersByTime(754560);
        });

        // record a lap
        const lapButton = screen.getByTestId('lap-button');
        fireEvent.click(lapButton);

        //pause to get Reset button to render, then reset
        const pauseButton = screen.getByTestId('pause-button');
        fireEvent.click(pauseButton);
        const resetButton = screen.getByTestId('reset-button');
        fireEvent.click(resetButton);

        //expect no items to be in lap list
        const lapList = screen.getByTestId('lap-list');
        const lapItems = lapList.querySelectorAll('li');
        expect(lapItems.length).toBe(0);
    })

    test('Lap time accuracy', () => {
        render(<App />);
        
        //click Start button to start timer and cause Lap button to render
        const startButton = screen.getByText('Start');
        fireEvent.click(startButton);
        const showLapButton = screen.getByTestId('show-lap-button');
        fireEvent.click(showLapButton);

        // let timer run 754560ms -> displays time 12:34:56
        act(() => {
            jest.advanceTimersByTime(754560);
        });

        //record a lap time of 12:34:56
        const lapButton = screen.getByTestId('lap-button');
        fireEvent.click(lapButton);

        // let time run another 1s-> displays time 12:34:57
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        //record a lap time of 00:01:00
        fireEvent.click(lapButton);

        expect(screen.getByText(/12:34:56/)).toBeTruthy();
        expect(screen.getByText(/00:01:00/)).toBeTruthy();
    })

    test.todo("Error warning when time exceeds 59:59:99");
    
  });
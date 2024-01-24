import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import StopwatchButton from '../StopWatchButton';
import Stopwatch from '../StopWatch';
import App from '../App';
import '@testing-library/jest-dom';



test('renders StopwatchButton component', () => {
 render(<StopwatchButton onStart={() => {}} onStop={() => {}} onReset={() => {}} onLap={() => {}} laps={[]} />);
 });


test('calls onStart, onStop, onReset, and onLap when buttons are clicked', () => {
 const onStart = jest.fn();
 const onStop = jest.fn();
 const onReset = jest.fn();
 const onLap = jest.fn();


 render(<StopwatchButton onStart={onStart} onStop={onStop} onReset={onReset} onLap={onLap} laps={[]} />);


 //Find and click each button
 fireEvent.click(screen.getByText('Start'));
 fireEvent.click(screen.getByText('Stop'));
 fireEvent.click(screen.getByText('Reset'));
 fireEvent.click(screen.getByText('Lap'));


 //Check if correct functions are called
 expect(onStart).toHaveBeenCalled();
 expect(onStop).toHaveBeenCalled();
 expect(onReset).toHaveBeenCalled();
 expect(onLap).toHaveBeenCalled();
});

jest.useFakeTimers(); 



test('renders initial state correctly and starts stopwatch', () => {
  // Render Stopwatch and StopwatchButton components
  render(<App />);
  

  // Press Start button
  fireEvent.click(screen.getByText('Start'));

  // Simulate time passing 
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Check the updated state of the Stopwatch component
  const startedTime = getDisplayedTime();

  console.log(startedTime);
  
  act(() => {
    jest.advanceTimersByTime(500);
  });

  const startTime2 = getDisplayedTime();
  console.log(startTime2);


  

  //Checking whether stopwatch has started
  expect(startedTime).not.toBe('00::00::00');
  
 
  fireEvent.click(screen.getByText('Stop'));
});



test('stops correctly', () => {
    
    render(<App />);
  
  
    // Start watch
    fireEvent.click(screen.getByText('Start'));
  
    // Advance time
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  
    // Capture the displayed time before stopping
    const timeBeforeStop = getDisplayedTime();
    
  
    // Stop the watch
    fireEvent.click(screen.getByText('Stop'));
  

    act(() => {
      jest.advanceTimersByTime(1000);
    });
  
    // Capture the displayed time after stopping
    const timeAfterStop = getDisplayedTime();
    
  
    // Check whether stop button stopped the timer
    expect(timeAfterStop).toBe(timeBeforeStop);

  });

  

  test('resets correctly ', () => {
    render(<App />);
      fireEvent.click(screen.getByText('Start'));

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      const startedTime = getDisplayedTime();
  

    //Checking whether stopwatch has started
    expect(startedTime).not.toBe('00::00::00');

    act(() => {
        jest.advanceTimersByTime(1000);
      });

      fireEvent.click(screen.getByText('Reset'));
      const resetTime = getDisplayedTime();

      expect(resetTime).toBe('00::00::00');

     
  });

  test('laps correctly', () => {
    render(<App />);
  
    //Get the initial laps length
    const initialLapsLength = screen.getAllByTestId('laps-list-item').length;
  
    // Click Lap button
    fireEvent.click(screen.getByText('Lap'));
  
    // Get the updated number of laps
    const updatedLapsLength = screen.getAllByTestId('laps-list-item').length;
  
    // Check laps length increased by 1
    expect(updatedLapsLength).toBe(initialLapsLength + 1);
  });





  //function to get current time on stopwatch
  function getDisplayedTime() {
    const minutes = screen.getByTestId('minutes').textContent;
    const seconds = screen.getByTestId('seconds').textContent;
    const milliseconds = screen.getByTestId('milliseconds').textContent;
    return `${minutes}:${seconds}:${milliseconds}`;
  }



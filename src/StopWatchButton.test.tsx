import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

describe("StopWatchButton component", ()=>{
    test('check Reset and Start buttons render when state is "reset"', () => {
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn() }} state="paused" />); //state set to paused
        
        //using GET, so test will fail if not rendered
        const resetButton = screen.getByTestId('reset-button');
        const stateButton = screen.getByTestId('start-button');
    });

    test('check Resed and Start buttons render when state is "paused"', () => {
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn() }} state="paused" />); //state set to paused
        
        //using GET, so test will fail if not rendered
        const resetButton = screen.getByTestId('reset-button');
        const stateButton = screen.getByTestId('start-button');
    });

    test('check Pause and Start buttons render when state is "runnin"', () => {
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn() }} state="running" />); //state set to running
        
        //using GET, so test will fail if not rendered
        const pauseButton = screen.getByTestId('pause-button');
        const stateButton = screen.getByTestId('start-button');
    });

    test('clicking Start button calls runFunc', () => {
        const runFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: runFuncMock, pauseFunc: jest.fn(), resetFunc: jest.fn() }} state="reset" />);    //state set to reset
      
        const startButton = screen.getByTestId('start-button');
        fireEvent.click(startButton);
      
        expect(runFuncMock).toHaveBeenCalled();
      });
      
    test('clicking Start button calls runFunc - paused', () => {
        const runFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: runFuncMock, pauseFunc: jest.fn(), resetFunc: jest.fn() }} state="paused" />);    //state set to paused
    
        const startButton = screen.getByTestId('start-button');
        fireEvent.click(startButton);
    
        expect(runFuncMock).toHaveBeenCalled();
    });
    
    test('clicking Pause button calls pauseFunc', () => {
    const pauseFuncMock = jest.fn();
    render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: pauseFuncMock, resetFunc: jest.fn() }} state="running" />); //state set to running
    
    const pauseButton = screen.getByTestId('pause-button');
    fireEvent.click(pauseButton);
    expect(pauseFuncMock).toHaveBeenCalled();
    });
    
    test('clicking Reset button calls resetFunc', () => {
    const resetFuncMock = jest.fn();
    render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: resetFuncMock }} state="paused" />); //state set to paused
    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);
    
    expect(resetFuncMock).toHaveBeenCalled();
    });
})


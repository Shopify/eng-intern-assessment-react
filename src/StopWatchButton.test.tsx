import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

describe("StopWatchButton component", ()=>{
    test('check Start and Reset buttons render when state is "reset"', () => {
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn(), lapFunc: jest.fn() }} stopwatchState="reset" />);
        
        //using GET, so test will fail if not rendered
        const resetButton = screen.getByTestId('reset-button');
        const stateButton = screen.getByTestId('start-button');
    });

    test('check Start and Reset buttons render when state is "paused"', () => {
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn(), lapFunc: jest.fn() }} stopwatchState="paused" />);
        
        //using GET, so test will fail if not rendered
        const resetButton = screen.getByTestId('reset-button');
        const stateButton = screen.getByTestId('start-button');
    });

    test('check Pause and Lap buttons render when state is "running"', () => {
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn(), lapFunc: jest.fn() }} stopwatchState="running" />);
        
        //using GET, so test will fail if not rendered
        const pauseButton = screen.getByTestId('pause-button');
        const stateButton = screen.getByTestId('lap-button');
    });

    test('clicking Start button calls runFunc when state is "running"', () => {
        //create mock empty function (only tests if function is called, not function implementation)
        const runFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: runFuncMock, pauseFunc: jest.fn(), resetFunc: jest.fn(), lapFunc: jest.fn() }} stopwatchState="reset" />);
      
        //click the button
        const startButton = screen.getByTestId('start-button');
        fireEvent.click(startButton);
      
        expect(runFuncMock).toHaveBeenCalled();
      });
      

    test('clicking Start button calls runFunc -when state is "paused"', () => {
        //create mock empty function (only tests if function is called, not function implementation)
        const runFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: runFuncMock, pauseFunc: jest.fn(), resetFunc: jest.fn(), lapFunc: jest.fn() }} stopwatchState="paused" />);    //state set to paused
    
        //click the button
        const startButton = screen.getByTestId('start-button');
        fireEvent.click(startButton);
    
        expect(runFuncMock).toHaveBeenCalled();
    });

    test('clicking Lap button calls lapFunc', () => {
        //create mock empty function (only tests if function is called, not function implementation)        
        const lapFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: jest.fn(), lapFunc: lapFuncMock }} stopwatchState="running" />);    //state set to paused
    
        //click the button
        const lapButton = screen.getByTestId('lap-button');
        fireEvent.click(lapButton);
    
        expect(lapFuncMock).toHaveBeenCalled();
    });
    
    test('clicking Pause button calls pauseFunc', () => {
        //create mock empty function (only tests if function is called, not function implementation)
        const pauseFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: pauseFuncMock, resetFunc: jest.fn(), lapFunc: jest.fn() }} stopwatchState="running" />); //state set to running
        
        //click the button
        const pauseButton = screen.getByTestId('pause-button');
        fireEvent.click(pauseButton);

        expect(pauseFuncMock).toHaveBeenCalled();
    });
    
    test('clicking Reset button calls resetFunc', () => {
        //create mock empty function (only tests if function is called, not function implementation)
        const resetFuncMock = jest.fn();
        render(<StopWatchButton controls={{ runFunc: jest.fn(), pauseFunc: jest.fn(), resetFunc: resetFuncMock, lapFunc: jest.fn() }} stopwatchState="paused" />); //state set to paused
        
        //click the button
        const resetButton = screen.getByTestId('reset-button');
        fireEvent.click(resetButton);
        
        expect(resetFuncMock).toHaveBeenCalled();
    });

    //run/pause/reset/lap Func implementation is in App.tsx; tests in App.test.tsx
})




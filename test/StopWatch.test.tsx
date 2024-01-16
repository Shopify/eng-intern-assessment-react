import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import StopWatch from '../src/StopWatch';
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe('StopWatch component', () => {
  test('renders initial state', () => {
    render(<StopWatch />);
    const watchDisplayElement = screen.getByTestId('WatchDisplay');
    expect(watchDisplayElement.textContent).toBe('00:00:00.000');
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
    expect(screen.queryByTestId('LapList')).toBeEmptyDOMElement();

  });

  test('starts and stops the stopwatch', async () => {
    render(<StopWatch />);
    const watchDisplayElement = screen.getByTestId('WatchDisplay');
    fireEvent.click(screen.getByText('Start'));
    // start the watch and pause it after 1 second
    setTimeout(() =>{
        fireEvent.click(screen.getByText('Pause'));
        expect(watchDisplayElement.textContent).toBe('00:00:01.000');
    }, 1000);
  });

  test('pause and resume the stopwatch', async () => {
    render(<StopWatch />);
    const watchDisplayElement = screen.getByTestId('WatchDisplay');
    // start the watch and make it pause at 1 second mark
    fireEvent.click(screen.getByText('Start'));
    setTimeout(() =>{
        expect(watchDisplayElement.textContent).toBe('00:00:01.000');
    }, 1000);
    fireEvent.click(screen.getByText('Pause'));

    // wait another second to make sure the watch is not running
    setTimeout(() =>{
        expect(watchDisplayElement.textContent).toBe('00:00:01.000');
    }, 1000);

    // restart the watch and pause at 2 second mark
    fireEvent.click(screen.getByText('Start'));
    setTimeout(() =>{
        fireEvent.click(screen.getByText('Pause'));
        expect(watchDisplayElement.textContent).toBe('00:00:02.000');
    }, 1000);

  });

  test('resets the stopwatch', () => {
    render(<StopWatch />);
    
    const watchDisplayElement = screen.getByTestId('WatchDisplay');
    fireEvent.click(screen.getByText('Start'));

    setTimeout(() =>{
        fireEvent.click(screen.getByText('Pause'));
        expect(watchDisplayElement.textContent).toBe('00:00:01.000');
    }, 1000);


    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00:00.000')).toBeInTheDocument();
  });

  test('records lap times', () => {
    render(<StopWatch />);
    
    fireEvent.click(screen.getByText('Start'));
    // lap at 1 second
    setTimeout(() =>{
        fireEvent.click(screen.getByText('Lap'));
        const lapEntryElement1 = screen.getByTestId('LapTimeEntry0');
        expect(lapEntryElement1.textContent).toBe('Lap 1 : 00:00:01.000');
    }, 1000);
    // lap at 2 second
    setTimeout(() =>{
        fireEvent.click(screen.getByText('Lap'));
        const lapEntryElement2 = screen.getByTestId('LapTimeEntry1');
        expect(lapEntryElement2.textContent).toBe('Lap 2 : 00:00:02.000');
    }, 1000);
  });
});

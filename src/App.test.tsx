import React from 'react'
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from './App';
import '@testing-library/jest-dom';

jest.useFakeTimers();

test('Initial Render of App - elements are there.', () => {
    render(<App/>);

    expect(screen.getByText('Stopwatch')).toBeInTheDocument();
    expect(screen.getByText('Time: 00:00:00.00')).toBeInTheDocument();

    // check buttons and states
    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled();
    expect(screen.getByRole('button', { name:'Stop'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Lap'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Reset'})).toBeEnabled();

    // check list element
    const listElement = screen.getByText('', { selector: 'ul' });
    expect(listElement).toBeInTheDocument();
    expect(listElement.children.length).toBe(0);
})


test('Function of start button.', () => {
    render(<App/>);

    // check initial state of stopwatch
    expect(screen.getByText('Time: 00:00:00.00')).toBeInTheDocument();

    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    // check states of buttons have changed
    expect(startButton).toBeDisabled();
    expect(screen.getByRole('button', { name:'Stop'})).toBeEnabled();
    expect(screen.getByRole('button', { name:'Lap'})).toBeEnabled();
    expect(screen.getByRole('button', { name:'Reset'})).toBeEnabled();

    act(() => {
        jest.advanceTimersByTime(5010); // Fast-forward by 5 seconds +10ms of one update timer loop
    });

    expect(screen.getByText('Time: 00:00:05.00')).toBeInTheDocument();
})


test('Function of Lap button.', () => {
    render(<App/>);
    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    act(() => {
        jest.advanceTimersByTime(5010); // Fast-forward by 5 seconds +10ms of one update timer loop
    });

    const lap =screen.getByRole('button', { name:'Lap'});
    fireEvent.click(lap);

    expect(screen.getByText('Lap 1 : 00:00:05.00')).toBeInTheDocument();

    // test second click of Lap button new lap is different
    act(() => {
        jest.advanceTimersByTime(6010); // Fast-forward by 6 seconds +10ms of one update timer loop
    });

    fireEvent.click(lap);
    expect(screen.getByText('Lap 2 : 00:00:06.00')).toBeInTheDocument();
})


test('Function of Stop button.', () => {
    render(<App/>);
    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    act(() => {
        jest.advanceTimersByTime(5010); // Fast-forward by 5 seconds +10ms of one update timer loop
    });

    const Stop =screen.getByRole('button', { name:'Stop'});
    fireEvent.click(Stop);

    expect(screen.getByText('Time: 00:00:05.00')).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(5010); // Fast-forward by 5 seconds +10ms of one update timer loop
    });

    // time display should not change because stopped state
    expect(screen.getByText('Time: 00:00:05.00')).toBeInTheDocument();
    

    // check buttons be back to original states
    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled();
    expect(screen.getByRole('button', { name:'Stop'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Lap'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Reset'})).toBeEnabled();    
 })


 test('Function of Reset button - running.', () => {
    render(<App/>);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    act(() => {
        jest.advanceTimersByTime(5010); // Fast-forward by 5 seconds +10ms of one update timer loop
    });

    fireEvent.click(screen.getByRole('button', { name: 'Lap' }));
    expect(screen.getByText('Lap 1 : 00:00:05.00')).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
 
    // check buttons be back to original states
    expect(screen.getByText('Time: 00:00:00.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled();
    expect(screen.getByRole('button', { name:'Stop'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Lap'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Reset'})).toBeEnabled();  

    // check list element is now empty
    const listElement = screen.getByText('', { selector: 'ul' });
    expect(listElement).toBeInTheDocument();
    expect(listElement.children.length).toBe(0);
})


test('Function of Reset button - stoppped.', () => {
    render(<App/>);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    act(() => {
        jest.advanceTimersByTime(5010); // Fast-forward by 5 seconds +10ms of one update timer loop
    });

    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
 
    // check buttons be back to original states
    expect(screen.getByText('Time: 00:00:00.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled();
    expect(screen.getByRole('button', { name:'Stop'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Lap'})).toBeDisabled();
    expect(screen.getByRole('button', { name:'Reset'})).toBeEnabled();  

    // check list element
    const listElement = screen.getByText('', { selector: 'ul' });
    expect(listElement).toBeInTheDocument();
    expect(listElement.children.length).toBe(0);
})
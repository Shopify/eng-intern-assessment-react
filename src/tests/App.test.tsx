import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';

// Basic rendering test
test('Page renders successfully', async() => {
    render(<App/>);
    // Checking if header renders
    const header = screen.getByText('Stopwatch');
    expect(header).toBeDefined(); 
    // Checking if stopwatch component renders
    const stopWatch = screen.getByRole('stopwatch'); 
    expect(stopWatch).toBeDefined();
    // checking if stopwatch button components renders
    const stopWatchButtons = screen.getByRole('stopwatch-buttons'); 
    expect(stopWatchButtons).toBeDefined();
});
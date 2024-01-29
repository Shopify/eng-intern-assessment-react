import React from 'react';
import {render, screen} from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';

// Basic rendering test 
test('Page renders successfully', async() => { 
    render(<StopWatchButton text='anything'/>); 
    const buttonDisplay = screen.getByText('anything');
    expect(buttonDisplay).toBeDefined();
});
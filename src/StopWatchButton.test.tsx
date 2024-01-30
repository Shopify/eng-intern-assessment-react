/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

// Generic function to pass as a prop
const handleClickEvent = jest.fn();

it('should call the prop after button click', () => {
    render(<StopWatchButton id="mock-btn" text="Mock Button" handleClick={handleClickEvent}/>)
    const btnElement = screen.getByText("Mock Button");
    fireEvent.click(btnElement);
    expect(handleClickEvent).toHaveBeenCalled;
});

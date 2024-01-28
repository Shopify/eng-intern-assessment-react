import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopwatchButton from './StopWatchButton';

describe('StopwatchButton component', () => {
  it('renders button with correct label', () => {
    const mockOnClick = jest.fn(); 
    const label = 'Start'; 
    const { getByText } = render(<StopwatchButton onClick={mockOnClick} label={label} />);
    
    // Find the button element by text 
    const buttonElement = getByText(label);
    
    // Ensure button is rendered
    expect(buttonElement).toBeDefined();
  });

  it('calls onClick function when button is clicked', () => {
    const mockOnClick = jest.fn(); // Create a mock function
    const label = 'Start'; // Label for the button
    const { getByText } = render(<StopwatchButton onClick={mockOnClick} label={label} />);
    
    // Find the button element by text 
    const buttonElement = getByText(label);
    
    // Simulate a click event on the button
    fireEvent.click(buttonElement);
    
    // Ensure onClick function is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

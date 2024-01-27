import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopwatchButton from '../StopwatchButton';

describe('StopwatchButton Component Tests', () => {
  test('renders button with label', () => {
    render(<StopwatchButton label="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('button click event', () => {
    const mockOnClick = jest.fn();
    render(<StopwatchButton label="Click Me" onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('disabled button click event', () => {
    const mockOnClick = jest.fn();
    render(<StopwatchButton label="Click Me" onClick={mockOnClick} disable={true} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});

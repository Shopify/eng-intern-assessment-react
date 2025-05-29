import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopwatchButton from './StopwatchButton';

describe('StopwatchButton', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<StopwatchButton onClick={() => {}} label="Test" disabled={false} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<StopwatchButton onClick={handleClick} label="Test" disabled={false} />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  test('displays the correct label', () => {
    const { getByText } = render(<StopwatchButton onClick={() => {}} label="Test" disabled={false} />);
    const button = getByText('Test');
    expect(button).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<StopwatchButton onClick={() => {}} label="Test" disabled={true} />);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });
});
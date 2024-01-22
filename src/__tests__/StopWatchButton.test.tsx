import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import StopWatchButton from '../components/StopWatchButton';

describe('StopWatchButton', () => {
  test('button click calls onClick handler', () => {
    const mockOnClick = jest.fn();
    render(<StopWatchButton label="Test" onClick={mockOnClick} buttonStyle="test-button" disabled={false} />);

    fireEvent.click(screen.getByText('Test'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('button is disabled when disabled prop is true', () => {
    render(<StopWatchButton label="Disabled" onClick={() => {}} buttonStyle="test-button" disabled={true} />);

    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StopwatchButton from '../StopWatchButton';

describe('StopwatchButton', () => {
  it('renders with correct label', () => {
    render(<StopwatchButton label="Test Button" action={() => {}} />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click event', () => {
    const mockAction = jest.fn();
    render(<StopwatchButton label="Click Me" action={mockAction} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockAction).toHaveBeenCalled();
  });
  it('does not trigger action when disabled', () => {
    const mockAction = jest.fn();
    render(<StopwatchButton label="Disabled Button" action={mockAction} disabled />);
    const button = screen.getByText('Disabled Button');
    fireEvent.click(button);
    expect(mockAction).not.toHaveBeenCalled();
  });
  it('triggers action when enabled', () => {
    const mockAction = jest.fn();
    render(<StopwatchButton label="Enabled Button" action={mockAction} disabled={false} />);
    const button = screen.getByText('Enabled Button');
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalled();
  });
  
});

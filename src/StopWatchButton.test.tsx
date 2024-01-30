// src/StopWatchButton.test.tsx
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

describe('StopWatchButton Component', () => {
  it('renders start, stop, reset, and lap buttons', () => {
    // Dummy functions to pass as props
    const mockSetTimeInSeconds = jest.fn();
    const mockHandleLap = jest.fn();

    const { getByText } = render(
      <StopWatchButton 
        setTimeInSeconds={mockSetTimeInSeconds} 
        handleLap={mockHandleLap} 
      />
    );

    expect(getByText('Start')).toBeInTheDocument();
    expect(getByText('Stop')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
    expect(getByText('Lap')).toBeInTheDocument();
  });
});

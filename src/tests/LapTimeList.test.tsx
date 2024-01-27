import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LapTimeList from '../LapTimeList';

describe('LapTimeList Component Tests', () => {
  test('renders lap times', () => {
    const lapTimes = [300, 150]; // Example lap times
    render(<LapTimeList laps={lapTimes} />);
    expect(screen.getByText('Lap 1')).toBeInTheDocument();
    expect(screen.getByText('00:05:00')).toBeInTheDocument(); // Formatted time for 300 seconds
    expect(screen.getByText('Lap 2')).toBeInTheDocument();
    expect(screen.getByText('00:02:30')).toBeInTheDocument(); // Formatted time for 150 seconds
  });
});

// Import React and other necessary testing libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopWatch from '../StopWatch';
import '@testing-library/jest-dom';


jest.mock('../hooks/useStopwatch');

// Import the mocked hook
import useStopwatch from '../hooks/useStopwatch';

// Cast the mocked useStopwatch to the Jest Mock type
const mockedUseStopwatch = useStopwatch as jest.MockedFunction<typeof useStopwatch>;

// Write your tests
describe('StopWatch Component', () => {

  
    test('renders stopwatch with initial time and no laps', () => {
      // Provide the mock implementation of useStopwatch
      mockedUseStopwatch.mockImplementation(() => ({
        time: 0,
        isActive: false,
        laps: [],
        handleStart: jest.fn(),
        handleStop: jest.fn(),
        handleReset: jest.fn(),
        handleLaps: jest.fn()
      }));

      render(<StopWatch />);
      expect(screen.getByText('00:00:00')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument(); // No laps initially
    
    })

    test('calls start function when Start button is clicked', () => {
      const mockHandleStart = jest.fn();
      mockedUseStopwatch.mockImplementation(() => ({
        time: 0,
        isActive: false,
        laps: [],
        handleStart: mockHandleStart,
        handleStop: jest.fn(),
        handleReset: jest.fn(),
        handleLaps: jest.fn()
      }));
  
      render(<StopWatch />);
      fireEvent.click(screen.getByText('Start'));
      expect(mockHandleStart).toHaveBeenCalled();
    });
  
    test('calls stop function when Stop button is clicked', () => {
      const mockHandleStop = jest.fn();
      mockedUseStopwatch.mockImplementation(() => ({
          time: 0,
          isActive: false,
          laps: [],
          handleStart: jest.fn(),
          handleStop: mockHandleStop,
          handleReset: jest.fn(),
          handleLaps: jest.fn()
      }));
  
      render(<StopWatch />);
      fireEvent.click(screen.getByText('Stop'));
      expect(mockHandleStop).toHaveBeenCalled();
    });
  
    test('calls reset function and resets time when Reset button is clicked', () => {
      const mockHandleReset = jest.fn();
      mockedUseStopwatch.mockImplementation(() => ({
        time: 1000,
        isActive: false,
        laps: [],
        handleStart: jest.fn(),
        handleStop: jest.fn(),
        handleReset: mockHandleReset,
        handleLaps: jest.fn()
      }));
  
      render(<StopWatch />);
      expect(screen.getByText('00:01:00')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Reset'));
      expect(mockHandleReset).toHaveBeenCalled();
    });
  
    test('calls lap function and shows laps when Lap button is clicked', () => {
      const mockHandleLaps = jest.fn();
      mockedUseStopwatch.mockImplementation(() => ({
        time: 1000,
        isActive: false,
        laps: [1000],
        handleStart: jest.fn(),
        handleStop: jest.fn(),
        handleReset: jest.fn(),
        handleLaps: mockHandleLaps,
      }));
  
      render(<StopWatch />);
      fireEvent.click(screen.getByText('Lap'));
      expect(mockHandleLaps).toHaveBeenCalled();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBe(1);
    });
});
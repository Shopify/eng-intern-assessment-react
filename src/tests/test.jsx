import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../components/StopWatch';

jest.useFakeTimers();

describe('StopWatch Component', () => {
    test('Start the timer when Start button is clicked', async () => {
      const { getByText, queryByText } = render(<StopWatch />);
  
      act(() => {
        fireEvent.click(getByText('Start'));
      });
  
      await waitFor(() => {
        const timerElement = queryByText(/00:00:00.000/);
        expect(timerElement).not.toBeInTheDocument();
      });
    });
  
    test('Stop the timer when Stop button is clicked', async () => {
      const { getByText, queryByText } = render(<StopWatch />);
      jest.useFakeTimers();
  
      act(() => {
        fireEvent.click(getByText('Start'));
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });
  
      act(() => {
        fireEvent.click(getByText('Stop'));
      });
  
      await waitFor(() => {
        const timerElement = queryByText(/00:00:01.000/);
        expect(timerElement).toBeInTheDocument();
      });
    });
  
    test('Reset the timer when Reset button is clicked', async () => {
      const { getByText, queryByText } = render(<StopWatch />);
      jest.useFakeTimers();
  
      act(() => {
        fireEvent.click(getByText('Start'));
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });
  
      act(() => {
        fireEvent.click(getByText('Stop'));
      });

      act(() => {
        fireEvent.click(getByText('Reset'));
      });
  
      await waitFor(() => {
        const timerElement = queryByText(/00:00:00.000/);
        expect(timerElement).toBeInTheDocument();
      });
    });
  
    test('Record a lap when Lap button is clicked', async () => {
      const { getByText, queryByText } = render(<StopWatch />);
      jest.useFakeTimers();
  
      act(() => {
        fireEvent.click(getByText('Start'));
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        fireEvent.click(getByText('Lap'));
      });
  
      act(() => {
        fireEvent.click(getByText('Stop'));
      });
  
      await waitFor(() => {
        const timerElement = queryByText(/Lap 1/);
        expect(timerElement).toBeInTheDocument();
      });
    });
  });
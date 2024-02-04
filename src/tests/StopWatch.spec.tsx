import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act
} from '@testing-library/react';
import '@testing-library/jest-dom'
import Stopwatch from '../Stopwatch';

const advanceTimers = (time: number) => {
  act(() => {
    jest.advanceTimersByTime(time);
  });
};

describe('Stopwatch', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('when the component is rendered', () => {

    beforeEach(() => {
      render(<Stopwatch />);
    })

    it('should display the initial time as 00:00.00', () => {
      expect(screen.queryByText('00:00')).toBeInTheDocument();
      expect(screen.queryByText('00')).toBeInTheDocument();
    });

    it('should only display Play and Reset buttons', () => {
      expect(screen.queryByText(/play/i)).toBeInTheDocument();
      expect(screen.queryByText(/reset/i)).toBeInTheDocument();
    });

    it('should not display Pause and Lap buttons', () => {
      expect(screen.queryByText(/pause/i)).toBeNull();
      expect(screen.queryByText(/lap/i)).toBeNull();
    });

    describe('when the start button is clicked', () => {

      beforeEach(() => {
        fireEvent.click(screen.queryByText(/play/i));
      });

      it('should begin incrementing the time', () => {
        advanceTimers(1000);
        expect(screen.queryByText('00:01')).toBeInTheDocument();
      });

      it('should display the pause and lap buttons', () => {
        expect(screen.queryByText(/pause/i)).toBeInTheDocument();
        expect(screen.queryByText(/lap/i)).toBeInTheDocument();
      });
    });

    describe('when the pause button is clicked', () => {

      beforeEach(() => {
        fireEvent.click(screen.queryByText(/play/i));
        advanceTimers(1000);
        fireEvent.click(screen.queryByText(/pause/i));
      })

      it('should stop the time', () => {
        advanceTimers(3000);
        expect(screen.queryByText('00:01')).toBeInTheDocument();
      });

    });

    describe('When the reset button is clicked', () => {

      beforeEach(() => {
        fireEvent.click(screen.queryByText(/play/i));
        advanceTimers(1500);
        fireEvent.click(screen.queryByText(/lap/i));
        fireEvent.click(screen.queryByText(/pause/i));
        fireEvent.click(screen.queryByText(/reset/i));
      })

      it('should reset the time and hide the lap list', () => {
        expect(screen.queryByText('00:00')).toBeInTheDocument();
        expect(screen.queryByText('Lap 1:')).toBeNull();
      });
    });
  });
});
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import StopWatch from '../src/components/StopWatch';
import '@testing-library/jest-dom';
import { AppProvider } from '@shopify/polaris';
import { mockMatchMedia } from '../__mocks__/matchMediaMock';
import StopWatchTime from '../src/components/StopWatchTime';

jest.useFakeTimers();

describe('Stopwatch', () => {
  // Required setup to mock methods which are not implemented in JSDOM.
  beforeAll(() => {
    mockMatchMedia();
  });

  beforeEach(() => {
    render(
      // Required wrapper for @shopify/polaris components.
      <AppProvider i18n={{}}>
        <StopWatch />
      </AppProvider>
    );
  });

  test('renders initial state', () => {
    expect(screen.getByText('00:00:00.')).toBeInTheDocument();
    expect(screen.getByText('000')).toBeInTheDocument();
    expect(screen.queryByTestId('stopwatch-laps')).not.toBeInTheDocument();
  });

  test('starts timer on start button click', () => {
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      '00:00:01.000'
    );
  });

  test('stops timer on stop button click', () => {
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(screen.getByText('Stop'));
    const timeWhenStopped = screen.getByTestId('stopwatch-time').textContent;
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      timeWhenStopped
    );
  });

  test('resumes timer on start button click after stop', () => {
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(screen.getByText('Stop'));
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      '00:00:03.500'
    );
  });

  test('resets timer and stops on reset button click', () => {
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      '00:00:00.000'
    );
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      '00:00:00.000'
    );
  });

  test('displays current relative lap time', async () => {
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('stopwatch-current-lap')).toHaveTextContent(
      '00:00:01.000'
    );
    fireEvent.click(screen.getByText('Lap'));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByTestId('stopwatch-current-lap')).toHaveTextContent(
      '00:00:00.500'
    );
  });

  test('records and displays lap on lap button click', () => {
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByText('Lap'));

    const lapsElement = screen.getByTestId('stopwatch-laps');
    expect(lapsElement.children).toHaveLength(1);
    expect(lapsElement.children[0]).toHaveTextContent('00:00:01.000');
  });

  test('hours display correctly when exceeding double digits', () => {
    // Simulate time to be slightly more than 99 hours (2 digit to 3).
    render(
      <AppProvider i18n={{}}>
        <StopWatchTime timeElapsed={100 * 60 * 60 * 1000} />
      </AppProvider>
    );
    expect(screen.getByText(/100:00:00/)).toBeInTheDocument();
  });
});

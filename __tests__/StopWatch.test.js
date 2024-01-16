import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import Stopwatch from '../src/components/StopWatch';
import '@testing-library/jest-dom';
import { AppProvider } from '@shopify/polaris';

jest.useFakeTimers();

describe('Stopwatch', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    render(
      <AppProvider i18n={{}}>
        <Stopwatch />
      </AppProvider>
    );
  });

  test('renders initial state', () => {
    expect(screen.getByText('00:00:00.000')).toBeInTheDocument();
    expect(screen.queryByTestId('stopwatch-control').children.length).toBe(3);
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
    expect(lapsElement.children).toHaveLength(2);
    expect(lapsElement.children[1]).toHaveTextContent('00:00:01.000');
  });
});

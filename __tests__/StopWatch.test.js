import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import Stopwatch from '../src/components/StopWatch';
import '@testing-library/jest-dom';
import { AppProvider } from '@shopify/polaris';
import { mockMatchMedia } from '../__mocks__/matchMediaMock';

jest.useFakeTimers();

describe('Stopwatch', () => {
  beforeAll(() => {
    mockMatchMedia();
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
});

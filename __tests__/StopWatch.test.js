import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

  test('renders initial state', () => {
    render(
      <AppProvider i18n={{}}>
        <Stopwatch />
      </AppProvider>
    );
    expect(screen.getByText('00:00:00.000')).toBeInTheDocument();
    expect(screen.queryByTestId('stopwatch-control').children.length).toBe(3);
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts timer on start button click', () => {
    render(
      <AppProvider i18n={{}}>
        <Stopwatch />
      </AppProvider>
    );
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      '00:00:01.000'
    );
  });

  test('stops timer on stop button click', () => {
    render(
      <AppProvider i18n={{}}>
        <Stopwatch />
      </AppProvider>
    );
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
    render(
      <AppProvider i18n={{}}>
        <Stopwatch />
      </AppProvider>
    );
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(screen.getByText('Stop'));
    fireEvent.click(screen.getByText('Start'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId('stopwatch-time').textContent).toBe(
      '00:00:05.000'
    );
  });
});

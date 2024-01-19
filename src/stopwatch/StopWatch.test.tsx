import { AppProvider } from '@shopify/polaris';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { StopWatch } from './StopWatch';

function setup(element: React.ReactElement) {
  function wrapper({ children }: { children: React.ReactNode }) {
    return <AppProvider i18n={{}}>{children}</AppProvider>;
  }

  return {
    user: userEvent.setup({ delay: null }),
    ...render(element, { wrapper }),
  };
}

describe('Stopwatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('renders initial state correctly', () => {
    setup(<StopWatch />);

    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryAllByRole('row').length).toBe(0);

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Lap' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Stop' })
    ).not.toBeInTheDocument();
  });

  test('starts and stops the stopwatch', async () => {
    const { user } = setup(<StopWatch />);

    await user.click(screen.getByRole('button', { name: 'Start' }));

    act(() => jest.advanceTimersByTime(1000));

    // Ensure stopwatch is running
    expect(screen.queryByText('00:00.00')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Stop' }));

    const pausedTime = screen.getByText(/^\d\d:\d\d\.\d\d$/).textContent!;

    act(() => jest.advanceTimersByTime(10000));

    // Ensure stopwatch has not advanced since being paused
    expect(screen.getByText(pausedTime)).toBeInTheDocument();
  });

  test('pauses and resumes the stopwatch', async () => {
    const { user } = setup(<StopWatch />);

    await user.click(screen.getByText('Start'));
    await user.click(screen.getByText('Stop'));

    const pausedTime = screen.getByText(/^\d\d:\d\d\.\d\d$/).textContent!;

    await user.click(screen.getByText('Start'));

    act(() => jest.advanceTimersByTime(1000));

    expect(screen.queryByText(pausedTime)).not.toBeInTheDocument();
  });

  test('records and displays lap times', async () => {
    const { user } = setup(<StopWatch />);

    await user.click(screen.getByRole('button', { name: 'Start' }));
    act(() => jest.advanceTimersByTime(1000));

    await user.click(screen.getByRole('button', { name: 'Lap' }));
    await user.click(screen.getByRole('button', { name: 'Lap' }));

    // Length 3 includes the header row
    expect(screen.getAllByRole('row').length).toBe(3);
  });

  test('resets the stopwatch', async () => {
    const { user } = setup(<StopWatch />);

    await user.click(screen.getByRole('button', { name: 'Start' }));
    await user.click(screen.getByRole('button', { name: 'Lap' }));
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    expect(screen.getByText('00:00.00')).toBeInTheDocument();
    expect(screen.queryAllByRole('row').length).toBe(0);
  });

  test('clears all timers on unmount', async () => {
    const { user, unmount } = setup(<StopWatch />);

    await user.click(screen.getByRole('button', { name: 'Start' }));

    expect(jest.getTimerCount()).toBeGreaterThan(0);

    unmount();

    expect(jest.getTimerCount()).toBe(0);
  });
});

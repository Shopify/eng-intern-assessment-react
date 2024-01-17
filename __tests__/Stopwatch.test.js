/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Stopwatch from '../src/App';
import '@testing-library/jest-dom'


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Stopwatch', () => {

  test('renders initial state correctly', () => {
    render(<Stopwatch />);

    expect(screen.getByRole('heading', { name: /00:00:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('starts and stops the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /stop/i }));
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));

    fireEvent.click(screen.getByRole('button', { name: /stop/i }));

    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByRole('button', { name: /start/i }));

    //need waitFor for timer to register time before running next test
    await waitFor(() => {
      expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
    })

  });

  test('records and displays lap times', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));

    fireEvent.click(screen.getByText('Lap'));

    expect(screen.getByRole('rowheader', { name: /1/i })).toBeInTheDocument();

    // Checks that it records lap time and total elapsed time (time will still be showing on screen with same format)
    expect(screen.queryAllByText(/\d\d:\d\d\:\d\d/)).toHaveLength(3);

  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    fireEvent.click(screen.getByRole('button', { name: /stop/i }));
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    expect(screen.getByText('00:00:00')).toBeInTheDocument();

    expect(screen.queryAllByRole('rowheader', { name: /1/i })).toHaveLength(0);

  });
});

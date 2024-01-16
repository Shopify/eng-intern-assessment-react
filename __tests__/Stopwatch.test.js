import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import Stopwatch from '../src/StopWatch';
import { randomInt } from 'crypto';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch />);

    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    //Get the initial state
    const intialTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    //Let the stopwatch run for a random amount of time and check if the value being displayed changed
    await act(async () => {
      await new Promise((r) => setTimeout(r, randomInt(1, 100)));
    });
    const randomTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    expect(randomTime).not.toEqual(intialTime);

    //Stop the stopwatch wait for a random amount of time and check that the stopwatch display did not change
    fireEvent.click(screen.getByText('Stop'));
    const stopTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    await act(async () => {
      await new Promise((r) => setTimeout(r, randomInt(1, 100)));
    });
    expect(screen.queryByText(/(\d{2}:){2}\d{2}/).textContent).toBe(stopTime);
  });

  test('pauses and resumes the stopwatch', async () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText('Resume'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(screen.getAllByText(/(\d{2}:){2}\d{2}/)[1]);

    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});

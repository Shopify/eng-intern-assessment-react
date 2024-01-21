import * as React from 'react';
import {render, fireEvent, cleanup, act, queryByTestId} from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from './../StopWatch';
jest.useFakeTimers();

afterEach(cleanup);

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const {getByText} = render(<StopWatch setLaps={() => {}} />);

    expect(getByText('00:00:00,00')).toBeInTheDocument();
  });

  test('render buttons correctly', () => {
    const {queryByTestId} = render(<StopWatch setLaps={() => {}} />);
    expect(queryByTestId('play')).toBeInTheDocument();
    fireEvent.click(queryByTestId('play'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(queryByTestId('pause')).toBeInTheDocument();
    expect(queryByTestId('play')).not.toBeInTheDocument();
    fireEvent.click(queryByTestId('pause'));
    expect(queryByTestId('play')).toBeInTheDocument();
    expect(queryByTestId('reset')).toBeInTheDocument();
    expect(queryByTestId('pause')).not.toBeInTheDocument();
  })

  test('starts and pause the stopwatch', () => {
    const {queryByTestId, getByText, queryByText} = render(<StopWatch setLaps={() => {}} />);
    const startedTime = getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(queryByTestId('play'));
    expect(getByText(/(\d{2}:){2}\d{2},\d{2}/)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(queryByTestId('pause'));
    expect(getByText(/(\d{2}:){2}\d{2},\d{2}/).textContent).not.toBe(startedTime)
  });

  test('pause and resumes the stopwatch', () => {
    const {queryByTestId, getByText, queryByText} = render(<StopWatch setLaps={() => {}} />);
    fireEvent.click(queryByTestId('play'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(queryByTestId('pause'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).textContent;
    fireEvent.click(queryByTestId('play'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(/(\d{2}:){2}\d{2},\d{2}/).textContent).not.toBe(pausedTime)
  })

  test('create lap', () => {
    const handleClick = jest.fn();
    const {queryByTestId, getByText, queryByText} = render(<StopWatch setLaps={handleClick} />);
    fireEvent.click(queryByTestId('play'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(queryByTestId('create-lap'));
    expect(handleClick).toHaveBeenCalled();
  })

  test('reset the stopwatch', () => {
    const {queryByTestId, getByText, queryByText} = render(<StopWatch setLaps={() => {}} />);
    const startedTime = getByText(/(\d{2}:){2}\d{2}/).textContent;
    fireEvent.click(queryByTestId('play'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.click(queryByTestId('pause'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).textContent;
    fireEvent.click(queryByTestId('reset'));
    expect(getByText(/(\d{2}:){2}\d{2},\d{2}/).textContent).not.toBe(pausedTime)
    expect(getByText(/(\d{2}:){2}\d{2},\d{2}/).textContent).toBe(startedTime)
  });
});
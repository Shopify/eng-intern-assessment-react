import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<StopWatchButton name='start' onClick={handleClick} />);

  fireEvent.click(getByRole('button', { name: /start/i }));

  expect(handleClick).toHaveBeenCalled();
});

test('renders with correct text', () => {
  const { getByRole } = render(<StopWatchButton name='start' onClick={() => {}} />);
  expect(getByRole('button').textContent).toBe('start');
});

test('calls onClick prop when clicked with type stop', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<StopWatchButton name='stop' onClick={handleClick} />);

  fireEvent.click(getByRole('button', { name: /stop/i }));

  expect(handleClick).toHaveBeenCalled();
});

test('calls onClick prop when clicked with type reset', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<StopWatchButton name='reset' onClick={handleClick} />);

  fireEvent.click(getByRole('button', { name: /reset/i }));

  expect(handleClick).toHaveBeenCalled();
});

test('renders with correct text for type reset', () => {
  const { getByRole } = render(<StopWatchButton name='reset' onClick={() => {}} />);
  expect(getByRole('button').textContent).toBe('reset');
});

test('calls onClick prop when clicked with type lap', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<StopWatchButton name='lap' onClick={handleClick}  />);

  fireEvent.click(getByRole('button', { name: /lap/i }));

  expect(handleClick).toHaveBeenCalled();
});

test('renders with correct text for type lap', () => {
  const { getByRole } = render(<StopWatchButton name='lap' onClick={() => {}}  />);
  expect(getByRole('button').textContent).toBe('lap');
});

test('does not throw error when clicked without onClick prop', () => {
  const { getByRole } = render(<StopWatchButton name='start' />);

  expect(() => fireEvent.click(getByRole('button', { name: /start/i }))).not.toThrow();
});

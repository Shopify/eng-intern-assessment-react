import { JSDOM } from 'jsdom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

beforeEach(() => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.document = dom.window.document;
});

test('renders stopwatch component', () => {
  const { getByTestId } = render(<App />);
  const stopwatchComponent = getByTestId('stopwatch');
  expect(stopwatchComponent);
});

test('starts the stopwatch', () => {
  const { getByTestId } = render(<App />);
  const startButton = getByTestId('start-button');
  fireEvent.click(startButton);
  // Assert that the stopwatch is running
});

test('stops the stopwatch', () => {
  const { getByTestId } = render(<App />);
  const stopButton = getByTestId('stop-button');
  fireEvent.click(stopButton);
  // Assert that the stopwatch is stopped
});

test('resets the stopwatch', () => {
  const { getByTestId } = render(<App />);
  const resetButton = getByTestId('reset-button');
  fireEvent.click(resetButton);
  // Assert that the stopwatch is reset
});

test('adds a lap time', () => {
  const { getByTestId } = render(<App />);
  const lapButton = getByTestId('lap-button');
  fireEvent.click(lapButton);
  // Assert that a lap time is added
});
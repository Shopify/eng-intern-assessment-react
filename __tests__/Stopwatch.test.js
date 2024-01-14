import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../src/App';
import Stopwatch from '../src/StopWatch';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<App />);

    const hrs = screen.getByTestId("time-hrs").textContent;
    const min = screen.getByTestId("time-min").textContent;
    const sec = screen.getByTestId("time-sec").textContent;

    // Check that all elements have the content '00'
    expect(hrs).toBe('00');
    expect(min).toBe('00');
    expect(sec).toBe('00');
    expect(screen.getByTestId('lap-list')).toBeEmptyDOMElement();
  });

  test('starts and stops the stopwatch', async() => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('start-button'));
    await wait(1500);
    const startHrs = screen.getByTestId("time-hrs").textContent;
    const startMin = screen.getByTestId("time-min").textContent;
    const startSec = screen.getByTestId("time-sec").textContent;

    // Check the stopwatch starts after the start button is clicked
    expect(`${startHrs}:${startMin}:${startSec}`).not.toBe('00:00:00');
    expect(`${startHrs}:${startMin}:${startSec}`).toMatch(/(\d{2}:){2}\d{2}/);

    fireEvent.click(screen.getByTestId('stop-button'));
    await wait(1000);
    const stopHrs = screen.getByTestId("time-hrs").textContent;
    const stopMin = screen.getByTestId("time-min").textContent;
    const stopSec = screen.getByTestId("time-sec").textContent;

    // Check the stopwatch stops after the stop button is clicked
    expect(`${stopHrs}:${stopMin}:${stopSec}`).toBe(`${startHrs}:${startMin}:${startSec}`);
  });

  test('pauses and resumes the stopwatch', async() => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('start-button'));
    await wait(1500);
    fireEvent.click(screen.getByTestId('stop-button'));
    const pausedHrs = screen.getByTestId("time-hrs").textContent;
    const pausedMin = screen.getByTestId("time-min").textContent;
    const pausedSec = screen.getByTestId("time-sec").textContent;

    fireEvent.click(screen.getByTestId('start-button'));
    await wait(1500);
    const resumedHrs = screen.getByTestId("time-hrs").textContent;
    const resumedMin = screen.getByTestId("time-min").textContent;
    const resumedSec = screen.getByTestId("time-sec").textContent;

    // Check the stopwatch works after it is resumed
    expect(`${resumedHrs}:${resumedMin}:${resumedSec}`).not.toBe(`${pausedHrs}:${pausedMin}:${pausedSec}`);
  });

  test('records and displays lap times', () => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('start-button'));
    fireEvent.click(screen.getByTestId('lap-button'));
    expect(screen.getByTestId('lap-list')).toContainElement(screen.getByText(/(\d{2}:){2}\d{2}/));

    fireEvent.click(screen.getByTestId('lap-button'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('start-button'));
    fireEvent.click(screen.getByTestId('lap-button'));
    fireEvent.click(screen.getByTestId('stop-button'));
    fireEvent.click(screen.getByTestId('reset-button'));

    const hrs = screen.getByTestId("time-hrs").textContent;
    const min = screen.getByTestId("time-min").textContent;
    const sec = screen.getByTestId("time-sec").textContent;

    // Check the time resets and laps clear after the reset button is clicked
    expect(`${hrs}:${min}:${sec}`).toBe('00:00:00');
    expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
  });
});

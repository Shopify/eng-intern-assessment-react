import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import StopWatch from "../src/StopWatch";
import {act} from "react-test-renderer";

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    // Render the component
    render(<StopWatch />);

    // Assert that the component renders with initial display time (00:00:00)
    const displayTexts = screen.getAllByTestId('display-text');

    displayTexts.forEach((displayText) => {
      expect(displayText.textContent).toEqual("00");
    });
  });

  test('starts and stops the stopwatch', () => {
    render(<StopWatch />);  // Replace with the actual component import and rendering

    // Start the stopwatch
    fireEvent.click(screen.getByText('Start'));

    // Remember the initial time
    const initialTime = screen.getAllByTestId('display-text').map((elem) => elem.textContent);

    // Stop the stopwatch
    fireEvent.click(screen.getByText('Stop'));

    // Check that the time is still there and hasn't changed
    const currentTime = screen.getAllByTestId('display-text').map((elem) => elem.textContent);

    expect(currentTime).toEqual(initialTime);
  });




  test('pauses and resumes the stopwatch', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Stop'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText('Resume'));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    render(<Stopwatch />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(screen.getByText(/(\d{2}:){2}\d{2}/));

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


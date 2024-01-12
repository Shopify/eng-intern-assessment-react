import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import StopWatch from "../src/StopWatch";

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<StopWatch />);

    // Assert that the component renders with initial display time (00:00:00)
    const displayTexts = screen.getAllByTestId('display-text');

    displayTexts.forEach((displayText) => {
      expect(displayText.textContent).toEqual("00");
    });
  });

  test('starts and stops the stopwatch', () => {
    render(<StopWatch />);
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



  test('records and displays lap times', () => {
    render(<StopWatch />);
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));

    //Check if the table header is displayed
    const lapListHeader = screen.getAllByTestId('lap-head');
    expect(lapListHeader[0].textContent).toEqual("Lap Number");
    expect(lapListHeader[1].textContent).toEqual("Time");
    expect(lapListHeader[2].textContent).toEqual("Total Time");

    // check laptime is in valid format hh:mm:ss
    const lapTimeText = screen.getAllByTestId('lap-time')[0].textContent;
    expect(lapTimeText).toMatch(/(\d{2}:){2}\d{2}/);

    //Check if new lap is added on clicking lap
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getAllByTestId('lap-time').length).toEqual(2);
  });


  test('resets the stopwatch', () => {
    render(<StopWatch />);

    fireEvent.click(screen.getByText('Start'));

    fireEvent.click(screen.getByText('Reset'));

    const displayTexts = screen.getAllByTestId('display-text');

    displayTexts.forEach((displayText) => {
      expect(displayText.textContent).toEqual("00");
    });
  });
});


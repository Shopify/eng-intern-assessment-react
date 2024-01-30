
import React from 'react';
import { render, fireEvent, screen, act, waitFor, within, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom/';
import App from './App';
jest.useFakeTimers();

jest.mock('../src/styles.css', () => {
    return {};
})

describe('App', () => {
  test('Renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Stop Watch')).toBeInTheDocument();
    expect(screen.getByText(/00:00:00.00/)).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();

    // Check if the Start button exists
    const startButton = screen.queryByText('Start');
    expect(startButton).toBeInTheDocument();

    // Check if the Reset button exists
    const resetButton = screen.queryByText('Reset');
    expect(resetButton).toBeInTheDocument();

  });

  test('Start button working and updates time correctly.Start and Reset button change to Stop and Lap button', () => {
    render(<App />);

    // Click the Start button
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 2.3 seconds
    act(() => {
      jest.advanceTimersByTime(2300);
    });

    // Check if the stopwatch display is updated
    expect(screen.getByText(/00:00:02.30/)).toBeInTheDocument();
    // Check if the Start button exists
    const stopButton = screen.queryByText('Stop');
    expect(stopButton).toBeInTheDocument();

    // Check if the Reset button exists
    const lapButton = screen.queryByText('Lap');
    expect(lapButton).toBeInTheDocument();
  });

  test('Stop button working correctly. Stop and Lap button change to Start and Reset button', () => {
    render(<App />);

    // Click the Start button
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 3.3 seconds
    act(() => {
      jest.advanceTimersByTime(3300);
    });

    fireEvent.click(screen.getByText('Stop'));

    // Check if the stopwatch display is updated
    expect(screen.getByText(/00:00:03.30/)).toBeInTheDocument();
    // Check if the Start button exists
    const startButton = screen.queryByText('Start');
    expect(startButton).toBeInTheDocument();

    // Check if the Reset button exists
    const resetButton = screen.queryByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });

  test('Reset button working correctly without click the Lap button. Stop and Lap button change to Start and Reset button ', () => {
    render(<App />);

    // Click the Start button
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 4.4 seconds
    act(() => {
      jest.advanceTimersByTime(4400);
    });

    fireEvent.click(screen.getByText('Stop'));

    fireEvent.click(screen.getByText('Reset'));

    // Check if the stopwatch display is updated
    expect(screen.getByText(/00:00:00.00/)).toBeInTheDocument();
    // Check if the Start button exists
    const startButton = screen.queryByText('Start');
    expect(startButton).toBeInTheDocument();

    // Check if the Reset button exists
    const resetButton = screen.queryByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });

  test('Reset button working correctly with clicking the Lap button. Stop and Lap button change to Start and Reset button ', () => {
    render(<App />);

    // Click the Start button
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 4.5 seconds
    act(() => {
      jest.advanceTimersByTime(4500);
    });

    fireEvent.click(screen.getByText('Lap'));

    fireEvent.click(screen.getByText('Stop'));

    fireEvent.click(screen.getByText('Reset'));


    // Check if the stopwatch display is updated
    expect(screen.getByText(/00:00:00.00/)).toBeInTheDocument();
    // Check if the Start button exists
    const startButton = screen.queryByText('Start');
    expect(startButton).toBeInTheDocument();

    // Check if the Reset button exists
    const resetButton = screen.queryByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });
  test('Lap button records lap correctly', async () => {
    render(<App />);

    // Click the Start button
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 2.5 seconds
  act(() => {
    jest.advanceTimersByTime(2500);
  });

  // Click the Lap button for lap 
  fireEvent.click(screen.getByText('Lap'));

  // Declare an array to store lap time elements hh:mm:ss.sss
    let elementsArr = [];

    // Query for lap-time elements and store the first lap time in elementsArr
    let lap1 = document.querySelectorAll('span.lap-time');
    elementsArr.push(lap1[0].textContent);
   

    act(() => {
        jest.advanceTimersByTime(3000);
      });

    fireEvent.click(screen.getByText('Lap'));

    // Query for lap-time elements again after clicking 'Lap' and store the second lap time in elementsArr
    lap1 = document.querySelectorAll('span.lap-time');

    //Covert lap-time elements to milliseconds
    elementsArr.push(lap1[0].textContent);
    let newElementArr = []; 
    const totalTime = screen.getByTestId("total-time").textContent;
    for (let i = 0; i < elementsArr.length; i++) {
        var [hours2, minutes2, seconds2, milliseconds2] = elementsArr[i].split(/[:.]/).map(Number);
        var totalTimeEle = (hours2 * 3600 + minutes2 * 60 + seconds2) * 1000 + milliseconds2;
        newElementArr[i] = totalTimeEle;
    }

    const[hours, minutes, seconds, milliseconds] = totalTime.split(/[:.]/).map(Number);
    const totalMilliSeconds = (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;

    //Expect total of milliseconds to be equal to the milliseconds of both laps.
    expect(totalMilliSeconds).toEqual(newElementArr.reduce((acc, curr) => acc + curr,0));
});
});
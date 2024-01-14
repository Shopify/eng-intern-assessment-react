import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import App from '../src/App'
import '@testing-library/jest-dom'

const testIds ={
  displayedSeconds: 'StopwatchSeconds',
  displayedMinutes: 'StopwatchMinutes',
  displayedHours: 'StopwatchHours',
  displayedMs: 'StopwatchMs',
  startBtn: 'startBtn',
  lapBtn: 'lapBtn',
  pauseBtn: 'pauseBtn',
  resetBtn: 'resetBtn',
  lapList: 'lap-list'
}

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(<Stopwatch totalElapsed={0} />);
    
    expect(
      screen.queryByTestId(testIds.displayedSeconds).innerHTML && 
      screen.queryByTestId(testIds.displayedMinutes).innerHTML &&
      screen.queryByTestId(testIds.displayedHours).innerHTML &&
      screen.queryByTestId(testIds.displayedMs).innerHTML
    ).toContain('00');

    expect(screen.queryByTestId(testIds.lapList)).toBeNull();
  });

  test('starts and stops the stopwatch', async() => {
    const { getByTestId } = render(<App />);
  
    let startButton = getByTestId(testIds.startBtn);
    
    act( () => {
        fireEvent.click(startButton);
    })
    await new Promise(r => setTimeout(r, 500)); 
    startButton = screen.queryByTestId(testIds.startBtn);
    expect(startButton).not.toBeInTheDocument();
    const pauseButton = screen.queryByTestId(testIds.pauseBtn);
    expect(pauseButton).toBeInTheDocument();
    act( () => {
      fireEvent.click(pauseButton);
    })
    let pausedTime = screen.queryByTestId(testIds.displayedSeconds).innerHTML + screen.queryByTestId(testIds.displayedMs).innerHTML
    await new Promise(r => setTimeout(r, 100)); 

    expect(screen.queryByTestId(testIds.displayedSeconds).innerHTML + screen.queryByTestId(testIds.displayedMs).innerHTML).toEqual(pausedTime);
  });

  test('pauses and resumes the stopwatch', async () => {
    const { getByTestId } = render(<App />);
  
    const startButton = getByTestId(testIds.startBtn);
    act( () => {
      fireEvent.click(startButton);
    })
    await new Promise(r => setTimeout(r, 500)); 
  
    const pauseButton = getByTestId(testIds.pauseBtn);
    act( () => {
      fireEvent.click(pauseButton);
    })
    const pausedTime = screen.queryByTestId(testIds.displayedSeconds).innerHTML + screen.queryByTestId(testIds.displayedMs).innerHTML;
    act( () => {
      fireEvent.click(startButton);
    })
    await new Promise(r => setTimeout(r, 500));
    expect(screen.queryByTestId(testIds.displayedSeconds).innerHTML + screen.queryByTestId(testIds.displayedMs).innerHTML).not.toBe(pausedTime);
  });

  test('records and displays lap times', async() => {
    const { getByTestId } = render(<App />);
    
    const startButton = getByTestId(testIds.startBtn);
    const lapButton = getByTestId(testIds.lapBtn);
    act( () => {
      fireEvent.click(startButton);
    })
    
    await new Promise(r => setTimeout(r, 500)); 
    act( () => {
      fireEvent.click(lapButton);
    })
    await new Promise(r => setTimeout(r, 500)); 
    const firstLapRow = screen.getByTestId(testIds.lapList).querySelector('tr')
    expect(within(firstLapRow).queryByLabelText('curTime').innerHTML && within(firstLapRow).queryByLabelText('totalTime').innerHTML).toMatch(/\d{2}/);
    act( () => {
      fireEvent.click(lapButton);
    })
    expect(screen.getByTestId(testIds.lapList).children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByTestId } = render(<App />);
    
    const startButton = getByTestId(testIds.startBtn);
    const resetButton = getByTestId(testIds.resetBtn);
    const lapButton = getByTestId(testIds.lapBtn);

    expect(resetButton.hasAttribute('disabled')).toBeTruthy()
    act( async() => {
      fireEvent.click(startButton);
      await new Promise(r => setTimeout(r, 500)); 
      fireEvent.click(lapButton);
      await new Promise(r => setTimeout(r, 500)); 
      fireEvent.click(resetButton);
      await new Promise(r => setTimeout(r, 500)); 
    })
     expect(
        screen.queryByTestId(testIds.displayedSeconds).innerHTML && 
        screen.queryByTestId(testIds.displayedMinutes).innerHTML &&
        screen.queryByTestId(testIds.displayedHours).innerHTML &&
        screen.queryByTestId(testIds.displayedMs).innerHTML
      ).toContain('00');

    expect(screen.queryByTestId(testIds.lapList)).toBeNull();

  });
});

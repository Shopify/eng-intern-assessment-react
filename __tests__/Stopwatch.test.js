import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';
import { AppProvider } from '@shopify/polaris';
import '@testing-library/jest-dom'
import './matchMedia.mock'

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    render(
      <AppProvider>
        <Stopwatch />
      </AppProvider>
    );

    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).not.toBeInTheDocument();
  });

  test('starts and stops the stopwatch', async () => {
    render(
      <AppProvider>
        <Stopwatch />
      </AppProvider>
    );
    
    fireEvent.click(screen.getByText('Start'));
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Pause'));
    expect(screen.queryByText('00:00:00')).not.toBeInTheDocument();
  });

  test('pauses and resumes the stopwatch', async () => {
    render(
      <AppProvider>
        <Stopwatch />
      </AppProvider>
    );
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Pause'));
    const pausedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;

    fireEvent.click(screen.getByText('Resume'));
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).not.toBe(pausedTime);
  });

  test('records and displays lap times', async () => {
    render(
      <AppProvider>
        <Stopwatch />
      </AppProvider>
    );
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list')).toContainElement(screen.getByTestId('lap-time-0'));
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByTestId('lap-list').children.length).toBe(2);
  });

  test('resets the stopwatch', () => {
    render(
      <AppProvider>
        <Stopwatch />
      </AppProvider>
    );
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Lap'));
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.queryByTestId('lap-list')).not.toBeInTheDocument();
  });
});

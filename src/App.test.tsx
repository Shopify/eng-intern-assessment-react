import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('StopWatch App', () => {
  test('Start Button', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const stopButton = screen.getByText('Stop');
    expect(stopButton).toBeInTheDocument();
  });

  test('Stop Button', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    const resumeButton = screen.getByText('Resume');
    expect(resumeButton).toBeInTheDocument();
  });

  test('Resume Button', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);
    const resumeButton = screen.getByText('Resume');
    fireEvent.click(resumeButton);
    const lapButton = screen.getByText('Lap');
    expect(lapButton).toBeInTheDocument();
  });

  test('Lap Button', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    const lapButton = screen.getByText('Lap');
    fireEvent.click(lapButton);
    const lapsList = screen.getByRole('list');
    expect(lapsList.children.length).toBe(1);
  });
});
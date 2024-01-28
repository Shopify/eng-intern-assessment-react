import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

jest.useFakeTimers();

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('handles start/stop button click', () => {
    const { getByText } = render(<App />);
    const startStopButton = getByText(/start/i);

    fireEvent.click(startStopButton);
    fireEvent.click(startStopButton);
  });

  it('handles lap button click', () => {
    const { getByText } = render(<App />);
    const lapButton = getByText(/lap/i);

    fireEvent.click(lapButton);
  });

  it('handles reset button click', () => {
    const { getByText } = render(<App />);
    const resetButton = getByText(/reset/i);

    fireEvent.click(resetButton);
  });
});

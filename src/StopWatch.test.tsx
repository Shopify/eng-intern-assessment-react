import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // Import render and fireEvent from testing-library
import StopWatchButton from './StopWatchButton'; // Import the StopWatchButton component
import StopWatch from './StopWatch'; // Import the StopWatch component

describe('StopWatch component', () => {
  // Test to ensure that the StopWatch component renders without crashing
  test('renders without crashing', () => {
    render(<StopWatch />);
  });

  // Test to check if clicking the start button triggers the onStart function
  test('clicking start button triggers onStart function', () => {
    // Create a mock function for onStart
    const onStart = jest.fn();
    // Render the StopWatchButton component with the mock onStart function
    const { getByText } = render(<StopWatchButton onStart={onStart} onStop={function (): void {
      throw new Error('Function not implemented.');
    } } onLap={function (): void {
      throw new Error('Function not implemented.');
    } } onReset={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    // Simulate a click on the start button
    fireEvent.click(getByText('Start'));
    // Assert that onStart function has been called
    expect(onStart).toHaveBeenCalled();
  });

  // Test to check if clicking the stop button triggers the onStop function
  test('clicking stop button triggers onStop function', () => {
    // Create a mock function for onStop
    const onStop = jest.fn();
    // Render the StopWatchButton component with the mock onStop function
    const { getByText } = render(<StopWatchButton onStop={onStop} onStart={function (): void {
      throw new Error('Function not implemented.');
    } } onLap={function (): void {
      throw new Error('Function not implemented.');
    } } onReset={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    // Simulate a click on the stop button
    fireEvent.click(getByText('Stop'));
    // Assert that onStop function has been called
    expect(onStop).toHaveBeenCalled();
  });

  // Test to check if clicking the lap button triggers the onLap function
  test('clicking lap button triggers onLap function', () => {
    // Create a mock function for onLap
    const onLap = jest.fn();
    // Render the StopWatchButton component with the mock onLap function
    const { getByText } = render(<StopWatchButton onLap={onLap} onStart={function (): void {
      throw new Error('Function not implemented.');
    } } onStop={function (): void {
      throw new Error('Function not implemented.');
    } } onReset={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    // Simulate a click on the lap button
    fireEvent.click(getByText('Lap'));
    // Assert that onLap function has been called
    expect(onLap).toHaveBeenCalled();
  });

  // Test to check if clicking the reset button triggers the onReset function
  test('clicking reset button triggers onReset function', () => {
    // Create a mock function for onReset
    const onReset = jest.fn();
    // Render the StopWatchButton component with the mock onReset function
    const { getByText } = render(<StopWatchButton onReset={onReset} onStart={function (): void {
      throw new Error('Function not implemented.');
    } } onStop={function (): void {
      throw new Error('Function not implemented.');
    } } onLap={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    // Simulate a click on the reset button
    fireEvent.click(getByText('Reset'));
    // Assert that onReset function has been called
    expect(onReset).toHaveBeenCalled();
  });
});

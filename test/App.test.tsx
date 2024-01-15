import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

describe('App', () => {
  // Test to ensure the App component renders the Lap button.
  test('renders Lap button', () => {
    render(<App />);
    expect(screen.getByText(/Lap/)).toBeInTheDocument();
  });

  // Test to verify that the Start button is rendered by the App component.
  test('renders Start button', () => {
    render(<App />);
    expect(screen.getByText(/Start/)).toBeInTheDocument();
  });

  // Test to check if the Stop button is being rendered in the App component.
  test('renders Stop button', () => {
    render(<App />);
    expect(screen.getByText(/Stop/)).toBeInTheDocument();
  });

  // Test to confirm the presence of the Reset button in the App component.
  test('renders Reset button', () => {
    render(<App />);
    expect(screen.getByText(/Reset/)).toBeInTheDocument();
  });

  // Test to ensure the App component renders the Lap button. 
  // Note: This test seems to be a duplicate of the first one and could be removed for efficiency.
  test('renders Lap button again', () => {
    render(<App />);
    expect(screen.getByText(/Lap/)).toBeInTheDocument();
  });

  // Test to verify that the default time (00:00:00) is displayed when the App component is rendered.
  test('renders default time', () => {
    render(<App />);
    expect(screen.getByText(/00:00:00/)).toBeInTheDocument();
  });
});

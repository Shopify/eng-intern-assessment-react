// src/App.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Group of tests for the App component
describe('App Component', () => {
  // Test case to check if the App component renders the Stopwatch and StopWatchButton components
  it('renders Stopwatch and StopWatchButton components', () => {

    // Rendering the App component in the test environment
    const { getByText, getAllByText } = render(<App />);

    // Find all elements with the text '00' and assert there are exactly three
    const zeros = getAllByText('00');
    expect(zeros.length).toBe(3);

    // Check if the 'Start' and stop button is rendered in the document
    expect(getByText('Start')).toBeInTheDocument();
    expect(getByText('Stop')).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();
    expect(getByText('Lap')).toBeInTheDocument();

      });
});

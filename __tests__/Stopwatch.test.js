/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor, queryByTestId } from '@testing-library/react';
import StopWatch from '../src/StopWatch';

describe('Stopwatch', () => {
  test('renders App component', async () => {
    render(<StopWatch />);

      // Find the elements containing the text "00:00:00"
      await waitFor(() =>  
      {
        const timeElements = screen.queryAllByText('00'); // find all elements containing the text 00
        expect(timeElements.length).toBe(3);  //check if there are three elements containing '00'

        // Loop through each element and check if '00' is present in the document
        timeElements.forEach((element) => {
          expect(element).toBeDefined();

      })
    });
  })

  describe('StopWatch', () => {
    test('starts and stops the stopwatch', () => {
      // Render the StopWatchButton component
      const { getByTestId } = render(<StopWatch />);
      
      // Find the start button by its ID and click it to start the stopwatch
      const startButton = getByTestId('startButton');
      fireEvent.click(startButton);

      // Check if the start button is no longer present in the document
      expect(queryByTestId(document.body, 'startButton')).toBeNull();

      // Find the stop button by its ID and click it to stop the stopwatch
      const stopButton = getByTestId('stopButton');
      fireEvent.click(stopButton);

      // Check if the stop button is no longer present in the document
      expect(queryByTestId(document.body, 'stopButton')).toBeNull();
    });
  })

  describe('StopWatch', () => {
    test('records and displays lap times', async () => {
      // Render the StopWatchButton component
      render(<StopWatch />);

      fireEvent.click(screen.getByTestId('lapButton'));

      const timeElements = screen.queryAllByText('00'); // find all elements containing the text 00
      expect(timeElements.length).toBe(3);  //check if there are three elements containing '00'

   // Loop through each element and check if '00' is present in the document
      timeElements.forEach((element) => {
        expect(element).toBeDefined(); 

    });
  });
  });

  test('resets the stopwatch', () => {
    render(<StopWatch />);
    
    fireEvent.click(screen.getByTestId('resetButton'));

    //expect the stopwatch to reset to 00:00:00
     const timeElements = screen.queryAllByText('00'); // find all elements containing the text 00
        expect(timeElements.length).toBe(3);  //check if there are three elements containing '00'

      // Loop through each element and check if '00' is present in the document
      timeElements.forEach((element) => {
        expect(element).toBeDefined();

    });
  });
});

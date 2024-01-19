import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the localStorage API as it's not fully functional in the Jest environment
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true
});

// Helper function to wait for the export button to be present
// This is necessary because the export button only appears after certain actions (like recording a lap) and therefore might not be immediately available in the DOM.
const waitForExportButton = async () => {
  const exportButton = await screen.findByTestId('export-csv');
  return exportButton;
};

// Utility function to create laps for testing (for :"Clear Laps" & "Export As CSV")
// This function is used to simulate user actions required to create laps, which is a prerequisite for testing the export functionality.
const createLaps = () => {
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.click(startButton); // Start the stopwatch
  const lapButton = screen.getByRole('button', { name: /lap/i });
  fireEvent.click(lapButton); // Record a lap
  fireEvent.click(startButton); // Stop the stopwatch
};

describe('App Component', () => {
  // Set up the test environment before each test
  beforeEach(() => {
    render(<App />);
  });

  it('starts and stops the stopwatch', () => {
    // Simulate user starting and stopping the stopwatch
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);
    // Verify the stopwatch has started
    expect(startButton.textContent).toBe('Stop');
    fireEvent.click(startButton);
    // Verify the stopwatch has stopped
    expect(startButton.textContent).toBe('Start');
  });

  it('resets the stopwatch', () => {
    // Simulate user resetting the stopwatch
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // Check the display for the default time after reset
    const times = screen.getAllByText('00', { exact: false });
    const milliseconds = screen.getByText('.00', { exact: false });

    // Verify that the display has been reset to zero
    expect(times[0]).toBeInTheDocument(); // hours
    expect(times[1]).toBeInTheDocument(); // minutes
    expect(times[2]).toBeInTheDocument(); // seconds
    expect(milliseconds).toBeInTheDocument(); // milliseconds
  });

  it('records laps', () => {
    // Simulate user recording a lap
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);
    const lapButton = screen.getByRole('button', { name: /lap/i });
    fireEvent.click(lapButton);
    // Verify that laps have been recorded
    const laps = screen.queryAllByText(/Lap \d+/);
    expect(laps.length).toBeGreaterThan(0);
  });

  it('clears laps', () => {
    // Prerequisite: laps need to be created to test clear laps functionality
    createLaps();
    const clearLapsButton = screen.getByRole('button', { name: /clear laps/i });
    fireEvent.click(clearLapsButton);
    // Verify that all laps have been cleared
    const laps = screen.queryAllByText(/Lap \d+/);
    expect(laps.length).toBe(0);
  });

  it('switches dark mode', () => {
    // Simulate user toggling the dark mode
    const darkModeButton = screen.getByRole('button', { name: /🌜|🌞/ });
    fireEvent.click(darkModeButton);
    // Verify that dark mode is activated
    const appDiv = screen.getByTestId('app-div');
    expect(appDiv).toHaveClass('dark-mode');
    // Toggle again to verify dark mode is deactivated
    fireEvent.click(darkModeButton);
    expect(appDiv).not.toHaveClass('dark-mode');
  });

  it('exports laps as CSV', async () => {
    // Prerequisite: laps need to be created to test export functionality
    createLaps();
  
    // Prepare mocks for the methods used in handleExport
    const mockClick = jest.fn();
    const mockSetAttribute = jest.fn();
  
    // Mock document.createElement and cast the returned object to an HTMLElement
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') {
        return {
          setAttribute: mockSetAttribute,
          click: mockClick,
          href: '',
          download: '',
        } as unknown as HTMLElement;
      }
      return document.createElement(tagName);
    });
  
    // Mock document.body methods and cast the mock functions to the correct type
    const mockAppendChild = jest.fn();
    const mockRemoveChild = jest.fn();
    document.body.appendChild = mockAppendChild as unknown as typeof document.body.appendChild;
    document.body.removeChild = mockRemoveChild as unknown as typeof document.body.removeChild;
  
    // Wait for the export button to be available and simulate a click on it
    const exportButton = await waitForExportButton();
    fireEvent.click(exportButton);
  
    // Check that the mocked methods were called, which implies that the export functionality was triggered
    expect(mockSetAttribute).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
  
    // Clean up mocks to avoid side-effects in other tests
    jest.restoreAllMocks();
  });
});

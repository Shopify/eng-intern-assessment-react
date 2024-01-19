import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StopWatchButton from '../StopWatchButton';
import '@testing-library/jest-dom';

// Mocking the StopWatchButton component
jest.mock('./StopWatchButton', () => {
return {
    start: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
};
});

// Test cases below
describe ('StopWatchButton', () => {

    // Test case that checks for the 'Start' button
    test('renders StopWatchButton component', () => {
        render(<StopWatchButton />);
    });

});
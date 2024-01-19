import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from '../App';

describe('Stopwatch', () => {
    beforeEach(() => {
        render(<App />);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('renders initial state correctly', () => {
        expect(screen.getByText('00:00:00')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Start/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Stop/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reset/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Lap/i})).toBeInTheDocument();
        
        expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
    });

    test.todo('starts the stopwatch to begin counting time');
    test.todo('stops the stopwatch to pause the timer');
    test.todo('resets the stopwatch to zero');
    test.todo('displays correct lap times');
    test.todo('keeps time correctly');
    test.todo('displays time with proper formatting');
    test.todo('does not allow for seconds to overflow');
    test.todo('does not allow for minutes to overflow');
});

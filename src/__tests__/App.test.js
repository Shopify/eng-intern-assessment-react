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
        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Stop')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Lap')).toBeInTheDocument();
        expect(screen.queryByTestId('lap-list')).toBeEmptyDOMElement();
    });
});

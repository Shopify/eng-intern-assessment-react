import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import StopWatch from '../src/StopWatch';

describe('StopWatch', () => {
    test('renders initial state', () => {
        render(<StopWatch/>)

        expect(screen.getByText('Start')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('00:00:00')).toBeInTheDocument();
    });

    test('start/stop stopwatch', () => {
        render(<StopWatch/>)
        // TODO
    });

    test('pause/resume stopwatch', () => {
        render(<StopWatch/>)
        // TODO
    });

    test('record and display laps', () => {
        render(<StopWatch/>)
        // TODO
    });

    test('reset stopwatch', () => {
        render(<StopWatch/>)
        // TODO
    });
});
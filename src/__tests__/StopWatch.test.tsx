import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import StopWatch from '../StopWatch';

describe('StopWatch', () => {

    test('laps not rendered if user does not click lap', () => {
        render(<StopWatch watchtime={0} laps={[]} />);
        const lapTable = screen.queryByTestId('lap-table');
        expect(lapTable).not.toBeInTheDocument();
    });  

    test('main time renders correctly', () => {
        render(<StopWatch watchtime={360000} laps={[]} />);
        const mainTime = screen.getByText('01:00:00');
        expect(mainTime).toBeInTheDocument();
    });

    test('laps are calculated correctly', () => {
        render(<StopWatch watchtime={0} laps={[360000, 720000]} />);
        const lap1 = screen.getByText('01:00:00.00');
        const lap2 = screen.getByText('02:00:00.00');
        expect(lap1).toBeInTheDocument();
        expect(lap2).toBeInTheDocument();
    });
});

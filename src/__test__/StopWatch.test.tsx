import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../StopWatch';

test('Number display updates', () => {
    render(<StopWatch time={10} />);
    const numberDisplay = screen.getByText("00:00.01");
    expect(numberDisplay).toBeInTheDocument();
});

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import StopwatchLaps from './StopwatchLaps';

it('should render correct amount of laps with the right time format', () => {
    render(<StopwatchLaps laps={[1000, 60000, 23248, 72000]}/>)
    const lapsElement = screen.getAllByTestId("lap-items");
    expect(lapsElement[0].innerHTML).toBe("Lap 1   00:01.000");
    expect(lapsElement[1].innerHTML).toBe("Lap 2   01:00.000");
    expect(lapsElement[2].innerHTML).toBe("Lap 3   00:23.248");
    expect(lapsElement[3].innerHTML).toBe("Lap 4   01:12.000");
});

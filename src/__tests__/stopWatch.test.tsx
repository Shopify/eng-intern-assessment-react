import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import StopWatch from '../StopWatch';
import {Lap} from "../App";

const MockChildrenComponent = () => {
    return <div>mock buttons</div>
};

const MockLaps = [
    {
        id: 1,
        lapTime: 1000,
        timeElapsed: 1000,
    },
    {
        id: 2,
        lapTime: 500,
        timeElapsed: 1500,
    },
    {
        id: 3,
        lapTime: 1000,
        timeElapsed: 2500,
    }
] as Lap[]


// testing the StopWatch component (time display and laps)
describe('<StopWatch/>', () => {
    test('should render correct input time', () => {
        const inputTime = 5000;
        const expectedDisplay = "00:05.00";
        const inputSessionLaps = [] as Lap[];
        const {getByTestId} = render(<StopWatch timeElapsed={inputTime} sessionLaps={inputSessionLaps}>
            <div> buttons</div>
        </StopWatch>);

        const stopWatchTimeDisplay = getByTestId('stopwatch-time-display');
        expect(stopWatchTimeDisplay.textContent).toBe(expectedDisplay);
    });

    test('should not render laps container', () => {
        const inputTime = 5000;
        const inputSessionLaps = [] as Lap[];
        const {queryByTestId} = render(<StopWatch timeElapsed={inputTime} sessionLaps={inputSessionLaps}>
            <MockChildrenComponent/>
        </StopWatch>);

        const stopWatchLapsContainer = queryByTestId('laps-table-container');

        expect(stopWatchLapsContainer).toBeNull()
    });

    test('should render correct input laps', () => {
        const inputTime = 5000;
        const {getByTestId, queryAllByTestId} = render(<StopWatch timeElapsed={inputTime} sessionLaps={MockLaps}>
            <MockChildrenComponent/>
        </StopWatch>);

        const laps = queryAllByTestId((content, element) =>
            element.getAttribute('data-testid')?.startsWith('lap-')
        );
        expect(laps.length).toBe(MockLaps.length);


        const lapTime1 = getByTestId('laptime-1');
        expect(lapTime1.textContent).toBe("00:01.00");

        const lapTime2 = getByTestId('laptime-2');
        expect(lapTime2.textContent).toBe("00:00.50");

        const lapTime3 = getByTestId('laptime-3');
        expect(lapTime3.textContent).toBe("00:01.00");
    });
});

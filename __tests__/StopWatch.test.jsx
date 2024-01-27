import React from 'react';
import { render, fireEvent, act, waitFor, findByText, getAllByTestId, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../src/components/StopWatch';

describe("StopWatch", () => {
    // Fake timers using Jest
    beforeEach(() => {
        jest.useFakeTimers()
    })

    // Switching to real timers using Jest
    afterEach(() => {
        jest.useRealTimers()
    })

    it("stopwatch renders initially", () => {
        const { getByText, queryByText, getAllByRole, queryAllByTestId } = render(<StopWatch />);
        expect(getByText("STOPWATCH")).toBeInTheDocument();
        expect(getByText("00:00.00")).toBeInTheDocument();
        expect(getByText("Start")).toBeInTheDocument();
        expect(getByText("Reset")).toBeInTheDocument();

        expect(queryByText("Stop")).toBeNull();
        expect(queryByText("Lap")).toBeNull();

        const test = queryAllByTestId('lap');
        expect(test.length).toBe(0);
        const button = getAllByRole('button');
        expect(button.length).toBe(2);
    });

    it("pressing start changes button texts", () => {
        const { getByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));
        expect(getByText("Stop")).toBeInTheDocument();
        expect(getByText("Lap")).toBeInTheDocument();
    });

    it("pressing start and stop to check timer has run for 3 seconds", () => {
        const { getByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(getByText("00:03.00"));
    });

    it("checks timer display when timer reaches 1 hour", () => {
        const { getByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));
        act(() => {
            jest.advanceTimersByTime(3600000);
        });

        expect(getByText("01:00:00.00"));
    })

    it("presses reset button resets everything", async () => {
        const { getByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));
        act(() => {
            jest.advanceTimersByTime(2453435);
        });
        fireEvent.click(getByText("Stop"));
        expect(getByText("40:53.43"))
        fireEvent.click(getByText("Reset"));
        expect(getByText("00:00.00"));
    });

    it("records 5 laps at different intervals and checks they are displayed", () => {
        const { getByText, getAllByTestId, queryByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));

        let numLaps = 5;
        while (numLaps) {
            act(() => {
                jest.advanceTimersByTime(numLaps * 1000);
            });
            fireEvent.click(getByText("Lap"));
            numLaps--;
        }

        const totalNumLaps = getAllByTestId('lap');
        expect(totalNumLaps.length).toBe(5);
        expect(getByText('00:04.00'));
        expect(getByText("Lap 5")).toHaveStyle({ color: '3, 162, 3' });
        expect(getByText('00:03.00'));
        expect(getByText('00:02.00'));
        expect(getByText("00:05.00")).toHaveStyle({ color: '255, 0, 0' });
        expect(getByText("00:01.00")).toHaveStyle({ color: '3, 162, 3' });
        expect(queryByText("00:00.00")).toBeNull();
    });

    it("checks that reset clears the stored laps", () => {
        const { getByText, getAllByTestId, queryByTestId } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));
        fireEvent.click(getByText("Lap"));
        expect(getByText('Lap 1'));
        fireEvent.click(getByText("Lap"));
        fireEvent.click(getByText("Stop"));
        let totalNumLaps = getAllByTestId('lap');
        expect(totalNumLaps.length).toBe(2);

        fireEvent.click(getByText("Reset"));
        expect(getByText("00:00.00"));
        expect(queryByTestId('lap')).toBeNull();
    });

    it("pressing stop and start again resumes the timer", () => {
        const { getByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        fireEvent.click(getByText("Stop"));
        fireEvent.click(getByText("Start"));
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        fireEvent.click(getByText("Stop"));
        expect(getByText("00:04.00"));
    });
});




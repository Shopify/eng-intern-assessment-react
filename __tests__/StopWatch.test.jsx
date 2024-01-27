import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StopWatch from '../src/StopWatch';

describe("StopWatch", () => {
    it("stopwatch renders initially", () => {
        const { getByText, queryByText } = render(<StopWatch />);

        expect(getByText("STOPWATCH")).toBeInTheDocument();
        expect(getByText("00:00:00.00")).toBeInTheDocument();
        expect(getByText("Start")).toBeInTheDocument();
        expect(getByText("Reset")).toBeInTheDocument();

        expect(queryByText("Stop")).toBeNull();
        expect(queryByText("Lap")).toBeNull();
        expect(queryByText("Lap 0")).toBeNull();
        // expect(screen.queryById()) check that the lap list is empty
    });

    it("start stopwatch", () => {
        const { getByText, queryByText } = render(<StopWatch />);
        fireEvent.click(getByText("Start"));
        expect(getByText("Stop")).toBeInTheDocument();
        expect(getByText("Lap")).toBeInTheDocument();

        expect(queryByText("Start")).toBeNull();
        expect(queryByText("Reset")).toBeNull();
    });


});




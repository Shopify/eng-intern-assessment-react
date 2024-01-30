import StopWatch from '../StopWatch';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import React from 'react';


describe('Stopwatch', () => {

    beforeEach(() => {
        render(<StopWatch />)
    });

    test('renders properly', () => {
        expect(screen.queryByText("00:00:00:00")).toBeInTheDocument()
        expect(screen.queryByText("Start")).toBeInTheDocument()
        expect(screen.queryByText("Reset")).toBeInTheDocument()
        expect(screen.queryByText("Pause")).not.toBeInTheDocument()
        expect(screen.queryByText("Lap")).not.toBeInTheDocument()
    });
    
    test("starts stopwatch", () => {
		fireEvent.click(screen.queryByText("Start"));
        expect(screen.queryByText("Pause")).toBeInTheDocument()
        expect(screen.queryByText("Lap")).toBeInTheDocument()
        expect(screen.queryByText("Start")).not.toBeInTheDocument()
        expect(screen.queryByText("Reset")).not.toBeInTheDocument()

        setTimeout(() => {
            fireEvent.click(screen.queryByText("Pause"));
            expect(screen.queryByText("00:00:02:00")).toBeInTheDocument()
        }, 2000)
	});

    test("start after pause", () => {
		fireEvent.click(screen.queryByText("Start"));
        expect(screen.queryByText("Pause")).toBeInTheDocument()
        expect(screen.queryByText("Lap")).toBeInTheDocument()
        expect(screen.queryByText("Start")).not.toBeInTheDocument()
        expect(screen.queryByText("Reset")).not.toBeInTheDocument()

        setTimeout(() => {
            fireEvent.click(screen.queryByText("Pause"));
            expect(screen.queryByText("00:00:02:00")).toBeInTheDocument()
            fireEvent.click(screen.queryByText("Start"));
        }, 2000)
        setTimeout(() => {
            fireEvent.click(screen.queryByText("Pause"));
            expect(screen.queryByText("00:00:04:00")).toBeInTheDocument()
        }, 2000)
	});

    test("Lap logs correct time", () => {
		fireEvent.click(screen.queryByText("Start"));
        expect(screen.queryByText("Pause")).toBeInTheDocument()
        expect(screen.queryByText("Lap")).toBeInTheDocument()
        expect(screen.queryByText("Start")).not.toBeInTheDocument()
        expect(screen.queryByText("Reset")).not.toBeInTheDocument()

        setTimeout(() => {
            fireEvent.click(screen.queryByText("Lap"));
            expect(screen.queryByText("#1")).toBeInTheDocument()
            expect(screen.queryByText("00:00:02:00")).toBeInTheDocument()
            expect(screen.getByTestId("LapContainer").children.length).toBe(1)
        }, 2000)

        setTimeout(() => {
            fireEvent.click(screen.queryByText("Lap"));
            expect(screen.queryByText("#2")).toBeInTheDocument()
            expect(screen.queryByText("00:00:04:00")).toBeInTheDocument()
            expect(screen.getByTestId("LapContainer").children.length).toBe(2)
        }, 2000)
	});

    test("Reset clears clock and lap times", () => {
		fireEvent.click(screen.queryByText("Start"));
        expect(screen.queryByText("Pause")).toBeInTheDocument()
        expect(screen.queryByText("Lap")).toBeInTheDocument()
        expect(screen.queryByText("Start")).not.toBeInTheDocument()
        expect(screen.queryByText("Reset")).not.toBeInTheDocument()

        setTimeout(() => {
            fireEvent.click(screen.queryByText("Lap"));
            expect(screen.queryByText("#1")).toBeInTheDocument()
            expect(screen.queryByText("00:00:02:00")).toBeInTheDocument()
            expect(screen.getByTestId("LapContainer").children.length).toBe(1)
        }, 2000)

        setTimeout(() => {
            fireEvent.click(screen.queryByText("Lap"));
            expect(screen.queryByText("#2")).toBeInTheDocument()
            expect(screen.queryByText("00:00:04:00")).toBeInTheDocument()
            fireEvent.click(screen.queryByText("Pause"));
            fireEvent.click(screen.queryByText("Reset"));
            expect(screen.getByTestId("LapContainer").children.length).toBe(2)
        }, 2000)

        expect(screen.queryByText("00:00:00:00")).toBeInTheDocument()
        expect(screen.queryByText("#1")).not.toBeInTheDocument()
        expect(screen.queryByText("00:00:02:00")).not.toBeInTheDocument()
        expect(screen.queryByText("#2")).not.toBeInTheDocument()
        expect(screen.queryByText("00:00:04:00")).not.toBeInTheDocument()
        expect(screen.queryByTestId("LapContainer")).not.toBeInTheDocument()
	});

})
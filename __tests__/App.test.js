import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../src/App";
import FakeTimers from "@sinonjs/fake-timers";

let clock;
beforeEach(() => {
    clock = FakeTimers.install();
    render(<App />);
});

afterEach(() => {
    clock = clock.uninstall();
    jest.clearAllMocks();
});

describe('StopWatch', () => {
    test("initialization test", () => {
        expect(screen.getByText("00:00:00:00"));
    });

    test("check start functionality", () => {
        fireEvent.click(screen.getByText("Start"));
        expect(screen.getByText("Stop")).toBeTruthy();
        expect(screen.getByText("Lap")).toBeTruthy();
        act(() => {
            clock.tick(1000)
        });
        expect(screen.getByText("00:00:01:00")).toBeTruthy();
    });

    test("check stop functionality", ()=> {
        fireEvent.click(screen.getByText("Start"));
        act(() => {
            clock.tick(5000)
        });
        fireEvent.click(screen.getByText("Stop"));
        expect(screen.getByText("Start")).toBeTruthy();
        expect(screen.getByText("Reset")).toBeTruthy();
        expect(screen.getByText("00:00:05:00")).toBeTruthy();
    });
});
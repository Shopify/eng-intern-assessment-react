import { timeStamp } from "console";
import useTimer from "../useTimer"
import { act, renderHook } from '@testing-library/react'

jest.useFakeTimers();

describe('useTimer', () => {
    test('starts at a time of 0', () => {
        const { result } = renderHook(() => useTimer());
        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 0,
            ms: 0
        })

        // Does not count until start is called
        jest.advanceTimersByTime(1500);
        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 0,
            ms: 0
        })


        // Does not count until time passes
        act(() => {
            result.current.controls.start();
        })
        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 0,
            ms: 0
        })
    })

    test('advances time correctly', () => {
        const { result } = renderHook(() => useTimer());

        // Advances by the amount of time that has passed
        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })
        expect(result.current.time).toEqual({  
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        })
    })
       
    test('if max value, loop over', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1000);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 0
        });

        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(59 * 1000);
        })
        expect(result.current.time).toEqual({
            h: 0,
            m: 1,
            s: 0,
            ms: 0
        });

        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(59 * 60 * 1000);
        })
        expect(result.current.time).toEqual({
            h: 1,
            m: 0,
            s: 0,
            ms: 0
        });
    })

    test('add new Lap correctly', () => {
        const { result } = renderHook(() => useTimer());

        expect(result.current.laps).toEqual( [] );

        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })

        //add a lap
        act(() => {
            result.current.controls.addLap();
            jest.advanceTimersByTime(1500);
        })

        expect(result.current.laps).toEqual( [{
            "h" : 0,
            "m" : 0,
            "s" : 1,
            "ms" : 500
    }] );
    })

    test('time stop correctly', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });

        act(() => {
            result.current.controls.stop();
            jest.advanceTimersByTime(2500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });
    })

    test('reset time correctly', () =>{
        const { result } = renderHook(() => useTimer());
        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });

        act(() => {
            result.current.controls.reset();
            jest.advanceTimersByTime(2500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 0,
            ms: 0
        });
    })

    test('resume time correclty', () => {
        const { result } = renderHook(() => useTimer());
        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });

        act(() => {
            result.current.controls.stop();
            jest.advanceTimersByTime(2500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });

        act(() => {
            result.current.controls.resume();
            jest.advanceTimersByTime(3500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 5,
            ms: 0
        });
    })



    test('multiple controls works correctly', () => {
        const { result } = renderHook(() => useTimer());
        //start timer
        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });

        //stop timer
        act(() => {
            result.current.controls.stop();
            jest.advanceTimersByTime(2500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 1,
            ms: 500
        });

        //add a lap
        act(() => {
            result.current.controls.addLap();
            jest.advanceTimersByTime(2500);
        })

        expect(result.current.laps).toEqual( [{
            "h" : 0,
            "m" : 0,
            "s" : 1,
            "ms" : 500
    }] );

        //resume timer 
        act(() => {
            result.current.controls.resume();
            jest.advanceTimersByTime(3500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 5,
            ms: 0
        });

        // second start should not do anything
        act(() => {
            result.current.controls.start();
            jest.advanceTimersByTime(1500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 6,
            ms: 500
        });

        //reset timer
        act(() => {
            result.current.controls.reset();
            jest.advanceTimersByTime(3500);
        })

        expect(result.current.time).toEqual({
            h: 0,
            m: 0,
            s: 0,
            ms: 0
        });
    })


})
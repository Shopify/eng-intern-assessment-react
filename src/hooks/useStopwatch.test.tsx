import { act, renderHook } from '@testing-library/react-hooks';
import { useStopwatch } from './useStopwatch';

describe('useStopwatch', () => {
    jest.useFakeTimers();

    it('should start with initial state', () => {
        const { result } = renderHook(() => useStopwatch());

        expect(result.current.time).toBe(0);
        expect(result.current.running).toBe(false);
        expect(result.current.laps).toEqual([]);
    });

    it('should start timer', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => {
            result.current.start();
        });

        expect(result.current.running).toBe(true);
    });

    it('should increment time after 5 seconds', () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useStopwatch());
        act(() => {
            result.current.start();
        });

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(result.current.time).toBe(5);
    });

    it('should stop timer', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => {
            result.current.start();
            result.current.stop();
        });

        expect(result.current.running).toBe(false);
    });

    it('should reset timer', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => {
            result.current.start();
            jest.advanceTimersByTime(3000);
            result.current.reset();
        });

        expect(result.current.time).toBe(0);
        expect(result.current.laps).toEqual([]);
    });

    it('should record laps correctly', () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useStopwatch());

        act(() => {
            result.current.start();
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        act(() => {
            result.current.lap();
        });

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        act(() => {
            result.current.lap();
        });

        expect(result.current.laps).toEqual([2, 3]);
    });
});
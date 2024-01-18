import { renderHook, act } from '@testing-library/react-hooks';
import useStopwatch from '../hooks/useStopwatch';
/**
 * Tests to test if the hook works by itself. 
 */
describe('useStopwatch Hook', () => {
    it('should start with initial time of 0, isActive false, and empty laps array', () => {
        const { result } = renderHook(() => useStopwatch());
        expect(result.current.time).toBe(0);
        expect(result.current.isActive).toBe(false);
        expect(result.current.laps).toEqual([]);
      });

    it('initializes time with 0, isActive with false, and empty laps array', () => {
        const { result } = renderHook(() => useStopwatch());
        expect(result.current.time).toBe(0);
        expect(result.current.isActive).toBe(false);
        expect(result.current.laps).toEqual([]);
    });

    it('sets isActive to true when handleStart is called', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => result.current.handleStart());
        expect(result.current.isActive).toBe(true);
    });
    
    it('sets isActive to false when handleStop is called', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => result.current.handleStart());
        act(() => result.current.handleStop());
        expect(result.current.isActive).toBe(false);
    });
    
    it('resets time to 0, laps to empty array, and isActive to false when handleReset is called', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => result.current.handleStart());
        act(() => result.current.handleReset());
        expect(result.current.time).toBe(0);
        expect(result.current.isActive).toBe(false);
        expect(result.current.laps).toEqual([]);
    });

    it('adds the current time to laps array when handleLaps is called', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => result.current.handleStart());
        act(() => jest.advanceTimersByTime(1000)); // advance time by 1 second
        act(() => result.current.handleLaps());
        expect(result.current.laps).toEqual([1000]); // assuming time is in milliseconds
    });

    jest.useFakeTimers();
    it('increments time correctly when isActive is true', () => {
        const { result } = renderHook(() => useStopwatch());
        act(() => result.current.handleStart());
        act(() => jest.advanceTimersByTime(1000)); // advance time by 1 second
        expect(result.current.time).toBe(1000);
    });

    it('clears interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
        const { result, unmount } = renderHook(() => useStopwatch());
        act(() => result.current.handleStart());
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
    });
    
    
});
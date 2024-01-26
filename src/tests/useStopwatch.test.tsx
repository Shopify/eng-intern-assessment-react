import { renderHook, act } from '@testing-library/react-hooks';
import useStopwatch from '../hooks/useStopwatch';

describe('useStopwatch', () => {
  it('should start the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
  });

  it('should reset the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
      result.current.reset();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.laps).toHaveLength(0);
  });

  it('should calculate elapsed time', () => {
    jest.useFakeTimers(); // Mock the timer

    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    // Advance the timer by 1000ms (1 second)
    jest.advanceTimersByTime(1000);

    expect(result.current.elapsedTime).toBeGreaterThan(0);
  });

  it('should record a lap', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.lap();
    });

    expect(result.current.laps).toHaveLength(1);
    expect(result.current.laps[0]).toBeGreaterThanOrEqual(0);
  });

  it('should reset the stopwatch and clear laps', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
      result.current.lap();
      result.current.reset();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.laps).toHaveLength(0);
  });

  it('should pause and resume the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch());

    // Start the stopwatch
    act(() => {
      result.current.start();
    });

    // Pause the stopwatch
    act(() => {
      result.current.pause();
    });

    // Verify that it is paused
    expect(result.current.isPaused).toBe(true);
    expect(result.current.isRunning).toBe(false);

    // Resume the stopwatch
    act(() => {
      result.current.start();
    });

    // Verify that it's running again
    expect(result.current.isPaused).toBe(false);
    expect(result.current.isRunning).toBe(true);
  });
});

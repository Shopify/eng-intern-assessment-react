import { renderHook, act } from '@testing-library/react';
import useStopwatch from '../hooks/useStopwatch';

describe('useStopwatch', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.laps).toEqual([]);
  });

  it('starts the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);
  });

  it('stops the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
      result.current.stop();
    });
    expect(result.current.isRunning).toBe(false);
  });

  it('records a lap', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
      result.current.lap();
    });
    expect(result.current.laps.length).toBe(1);
    expect(result.current.laps[0]).toBe(result.current.time);
  });

  it('resets the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
      result.current.lap();
      result.current.reset();
    });
    expect(result.current.isRunning).toBe(false);
    expect(result.current.time).toBe(0);
    expect(result.current.laps).toEqual([]);
  });
});

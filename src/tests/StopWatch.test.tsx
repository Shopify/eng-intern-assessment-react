import { renderHook, act } from '@testing-library/react-hooks';
import useStopwatch from '../hooks/useStopwatch';

describe('useStopwatch Hook', () => {
  it('starts the timer when start is called', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);
  });

  it('stops the timer when stop is called', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
      result.current.stop();
    });
    expect(result.current.isRunning).toBe(false);
  });

  it('resets the timer when reset is called', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
      result.current.reset();
    });
    expect(result.current.elapsedTime).toBe(0);
  });

});

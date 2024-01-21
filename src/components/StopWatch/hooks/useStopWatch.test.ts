
import {renderHook, act} from '@testing-library/react';

import useStopwatch from './useStopWatch';


describe('useStopwatch hook - start functionality', () => {

  beforeAll(() => {
    jest.useFakeTimers();
    const startTime = 0;
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation((callback) => {
      return setTimeout(() => callback(startTime + Date.now()), 0) as unknown as number;
    });
    jest.spyOn(performance, 'now').mockImplementation(() => Date.now() - startTime);

    jest.spyOn(global, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id) as unknown as number;
    })
  });


  afterAll(() => {
    jest.restoreAllMocks();

  });

  it('should start the stopwatch', () => {

    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
    });

    expect(result.current.running).toBe(true);


  });


  it('should start counting time', () => {

    const { result } = renderHook(() => useStopwatch({}));
    expect(result.current.milliseconds).toBe(0);
    act(()=>{

      result.current.actions.start();
      jest.advanceTimersByTime(1000); 
    })
    expect(result.current.milliseconds).toBeGreaterThan(0);




  });

  it("should count time accurately", () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000); 
    });

    expect(result.current.milliseconds).toBe(1000);
  })
});

describe('useStopwatch hook - stop functionality', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    const startTime = 0;
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation((callback) => {
      return setTimeout(() => callback(startTime + Date.now()), 0) as unknown as number;
    });
    jest.spyOn(performance, 'now').mockImplementation(() => Date.now() - startTime);

    jest.spyOn(global, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id) as unknown as number;
    })
  });

  afterAll(() => {
    jest.restoreAllMocks();

  });



  it('should stop the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
      result.current.actions.stop();
    })
    
    expect(result.current.running).toBe(false);
  });

  it('should stop counting time', () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      result.current.actions.stop();
      jest.advanceTimersByTime(1000); 
    });

    expect(result.current.milliseconds).toBe(0);
  });

  it('should stop counting time accurately', () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000); 
      result.current.actions.stop();
      jest.advanceTimersByTime(1000); 
    });

    expect(result.current.milliseconds).toBe(1000);
  });
})

describe('useStopwatch hook - reset functionality', () => {

  beforeAll(() => {
    jest.useFakeTimers();
    const startTime = 0;
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation((callback) => {
      return setTimeout(() => callback(startTime + Date.now()), 0) as unknown as number;
    });
    jest.spyOn(performance, 'now').mockImplementation(() => Date.now() - startTime);

    jest.spyOn(global, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id) as unknown as number;
    })
  });
  afterAll(() => {
    jest.restoreAllMocks();

  });


  it('should reset the stopwatch', () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      result.current.actions.reset();
    });

    expect(result.current.running).toBe(true);
    expect(result.current.milliseconds).toBe(0);
  });

  it('should reset the stopwatch accurately', () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000);
      result.current.actions.reset();

    });
    expect(result.current.running).toBe(true);
    expect(result.current.milliseconds).toBe(0);

  });
  it('should reset the stopwatch accurately after stop', () => {
    const { result } = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000);
      result.current.actions.stop();
      result.current.actions.reset();

    });
    expect(result.current.running).toBe(false);
    expect(result.current.milliseconds).toBe(0);
  });

})

describe("useStopwatch hook - lap functionality", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    const startTime = 0;
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation((callback) => {
      return setTimeout(() => callback(startTime + Date.now()), 0) as unknown as number;
    });
    jest.spyOn(performance, 'now').mockImplementation(() => Date.now() - startTime);

    jest.spyOn(global, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id) as unknown as number;
    })
  });
  afterAll(() => {
    jest.restoreAllMocks();

  });

  it("should add a lap", () => {
    const {result} = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000);
      result.current.actions.lap();
    });

    expect(result.current.laps.length).toBe(1);
  });

  it("should add a lap accurately", () => {
    const {result} = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.milliseconds).toBe(1000);

    act(() => {
        result.current.actions.lap();
    })

    expect(result.current.laps.length).toBe(1);
    expect(result.current.laps[0]).toBe(1000);

  });

  it("should add a lap accurately after stop", () => {
    const {result} = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000);
      result.current.actions.stop();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
      result.current.actions.lap();
    })

    expect(result.current.laps.length).toBe(1);
    expect(result.current.laps[0]).toBe(1000);
  });

  it("should add a lap accurately after reset", () => {
    const {result} = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      jest.advanceTimersByTime(1000);
      result.current.actions.reset();
      jest.advanceTimersByTime(1000);
      result.current.actions.lap();
    });

    expect(result.current.laps.length).toBe(1);

  })


  it("Triggering start multiple times should not require multiple stops to stop", ()=>{
    const {result} = renderHook(() => useStopwatch({}));

    act(() => {
      result.current.actions.start();
      
    });
    act(() => {
      result.current.actions.start();
      
    });
    act(() => {
      result.current.actions.start();
      
    });
    act(() => {
      jest.advanceTimersByTime(1000);      
    });

    act(() => {
      result.current.actions.stop();
    })
    act(() => {
      jest.advanceTimersByTime(1000);
    })

    expect(result.current.running).toBe(false);
    expect(result.current.milliseconds).toBe(1000);
  })
});
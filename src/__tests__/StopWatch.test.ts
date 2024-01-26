import { start, stop, reset, update, faceChange, lap, TimerState } from '../Pages/StopWatch/StopWatchSlice';
import { store, RootState, AppDispatch } from '../app/store';

    test('store has correct initial state', () => {
    const initialState = store.getState() as RootState;
    expect(initialState.timer).toEqual({
      running: false,
      value: 0,
      laptime: 0,
      lapsum: 0,
      reference: 0,
      face: 0,
      laps: [],
    });
  });
  
  // Test actions
  test('start action updates the running state and reference time', () => {
    store.dispatch(start());
    const state = store.getState() as RootState;
    expect(state.timer.running).toBe(true);
    expect(state.timer.reference).toBeLessThanOrEqual(Date.now());
  });
  
  test('stop action updates the running state', () => {
    store.dispatch(stop());
    const state = store.getState() as RootState;
    expect(state.timer.running).toBe(false);
  });
  
  test('reset action resets the timer state, but stays running', () => {
    // Assume the timer has been started before resetting
    store.dispatch(start());
    store.dispatch(reset());
    const state = store.getState() as RootState;
    expect(state.timer).toEqual({
      running: true,
      value: 0,
      laptime: 0,
      lapsum: 0,
      reference: expect.any(Number), // Check if reference is a number
      face: 0,
      laps: [],
    });
  });

  test('reset action resets the timer state, but is stopped', () => {
    // Assume the timer has been started before resetting
    store.dispatch(start());
    store.dispatch(stop());
    store.dispatch(reset());
    const state = store.getState() as RootState;
    expect(state.timer).toEqual({
      running: false,
      value: 0,
      laptime: 0,
      lapsum: 0,
      reference: expect.any(Number), // Check if reference is a number
      face: 0,
      laps: [],
    });
  });
  
  test('update action updates the timer value and laptime', () => {
    // Assume the timer has been started before updating
    store.dispatch(start());
    store.dispatch(update());
    const state = store.getState() as RootState;
    expect(state.timer.value).toBeGreaterThanOrEqual(0);
    expect(state.timer.laptime).toBeGreaterThanOrEqual(0);
  });
  
  test('lap action adds laptime to laps array and updates lapsum', () => {
    // Assume the timer has been started before adding a lap
    store.dispatch(start());
    store.dispatch(lap());
    const state = store.getState() as RootState;
    expect(state.timer.laps.length).toBe(1);
    expect(state.timer.lapsum).toBeGreaterThanOrEqual(0);
    expect(state.timer.laptime).toBe(0);
  });
  
  test('faceChange action updates the face state', () => {
    store.dispatch(faceChange());
    const state = store.getState() as RootState;
    expect(state.timer.face).toBeGreaterThanOrEqual(0);
    expect(state.timer.face).toBeLessThanOrEqual(2);
  });


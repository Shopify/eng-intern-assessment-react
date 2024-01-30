import {
  StopWatchState,
  initialState,
  stopWatchReducer,
} from "../lib/stopwatch";

// Tests for "start" action
test("start on inactive sets active to true, and sets a lap start time", () => {
  const state: StopWatchState = initialState;

  const newState = stopWatchReducer(state, "start");

  expect(newState.active).toBe(true);
  expect(newState.currentLapStartTime).not.toBe(null);
});

test("start on active is ignored", () => {
  const state: StopWatchState = {
    ...initialState,
    active: true,
    currentLapStartTime: performance.now(),
  };

  const newState = stopWatchReducer(state, "start");

  expect(newState).toBe(state);
});

// ====================
// Tests for "stop" action
test("stop on inactive is ignored", () => {
  const state: StopWatchState = initialState;

  const newState = stopWatchReducer(state, "stop");

  expect(newState).toBe(state);
});

test("stop on active sets active to false, and adds time since lap start to currentLapElapsedTime", () => {
  jest.useFakeTimers();

  const state: StopWatchState = {
    ...initialState,
    active: true,
    currentLapStartTime: performance.now(),
  };

  jest.advanceTimersByTime(1000);

  const newState = stopWatchReducer(state, "stop");

  expect(newState.active).toBe(false);
  expect(newState.currentLapElapsedTime).toBe(1000);
});

// ====================
// Tests for "lap" action

test("lap on inactive is ignored", () => {
  const state: StopWatchState = initialState;

  const newState = stopWatchReducer(state, "lap");

  expect(newState).toBe(state);
});

test("lap on active sets currentLapStartTime to now, and adds currentLapElapsedTime + lap time to lapDurations", () => {
  jest.useFakeTimers();

  const state: StopWatchState = {
    ...initialState,
    active: true,
    currentLapStartTime: performance.now(),
    currentLapElapsedTime: 1000,
  };

  jest.advanceTimersByTime(1000);

  const newState = stopWatchReducer(state, "lap");

  expect(newState.currentLapStartTime).not.toBe(null);
  expect(newState.lapDurations).toEqual([2000]);
});

// ====================
// Tests for "reset" action

test("reset sets state to initial state", () => {
  const state: StopWatchState = {
    ...initialState,
    active: true,
    currentLapStartTime: performance.now(),
    currentLapElapsedTime: 1000,
    lapDurations: [1000],
  };

  const newState = stopWatchReducer(state, "reset");

  expect(newState).toBe(initialState);
});

// ====================
// Tests for multiple actions

test("multiple actions from initial state", () => {
  jest.useFakeTimers();

  const state: StopWatchState = initialState;

  jest.advanceTimersByTime(Math.random() * 1000);

  // start at a random time
  const state1 = stopWatchReducer(state, "start");
  expect(state1.active).toBe(true);
  expect(state1.currentLapStartTime).not.toBe(null);

  // lap after 1 second
  jest.advanceTimersByTime(1000);
  const state2 = stopWatchReducer(state1, "lap");
  expect(state2.currentLapStartTime).not.toBe(null);
  expect(state2.lapDurations.length).toBe(1);
  expect(state2.lapDurations[0]).toBeCloseTo(1000);

  // stop after 1 second in 2nd lap
  jest.advanceTimersByTime(1000);
  const state3 = stopWatchReducer(state2, "stop");
  expect(state3.active).toBe(false);
  expect(state3.currentLapElapsedTime).toBeCloseTo(1000);

  jest.advanceTimersByTime(Math.random() * 1000);

  // start again after random interval
  const state4 = stopWatchReducer(state3, "start");

  expect(state4.active).toBe(true);
  expect(state4.currentLapStartTime).not.toBe(null);
  expect(state4.currentLapElapsedTime).toBeCloseTo(1000);
  expect(state4.lapDurations.length).toBe(1);

  // lap after 3 seconds
  jest.advanceTimersByTime(3000);
  const state5 = stopWatchReducer(state4, "lap");
  expect(state5.currentLapStartTime).not.toBe(null);
  expect(state5.lapDurations.length).toBe(2);
  expect(state5.lapDurations[0]).toBeCloseTo(1000);
  expect(state5.lapDurations[1]).toBeCloseTo(4000);

  // stop after 1 second in 3rd lap
  jest.advanceTimersByTime(1000);
  const state6 = stopWatchReducer(state5, "stop");
  expect(state6.active).toBe(false);
  expect(state6.currentLapElapsedTime).toBe(1000);
  expect(state6.lapDurations.length).toBe(2);

  // reset
  const state7 = stopWatchReducer(state6, "reset");
  expect(state7).toBe(initialState);
});

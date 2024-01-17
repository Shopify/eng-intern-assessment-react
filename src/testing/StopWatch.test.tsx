import React from 'react';
import renderer from 'react-test-renderer';
import StopWatch from '../StopWatch';

// Mocking 'moment' for consistent results
jest.mock('moment', () => ({
  duration: () => ({ minutes: () => 0, seconds: () => 0, milliseconds: () => 0 }),
}));

describe('Stopwatch Component', () => {
  it('renders Stopwatch component with initial state', () => {
    const component = renderer.create(
      <StopWatch
        elapsedTime={0}
        isRunning={false}
        startStopwatch={() => {}}
        resetStopwatch={() => {}}
        lap={() => {}}
        laps={[]}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders lap times when laps array is not empty', () => {
    
    const component = renderer.create(
      <StopWatch
        elapsedTime={0}
        isRunning={false}
        startStopwatch={() => {}}
        resetStopwatch={() => {}}
        lap={() => {}}
        laps={['00:01:23', '00:02:45']}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles start, stop, reset, and lap interactions', () => {
    const startStopwatchMock = jest.fn();
    const resetStopwatchMock = jest.fn();
    const lapMock = jest.fn();
    const component = renderer.create(
      <StopWatch
        elapsedTime={0}
        isRunning={false}
        startStopwatch={() => {}}
        resetStopwatch={() => {}}
        lap={() => {}}
        laps={[]}
      />
    );
    renderer.act(() => {
      component.root.findByProps({ name: 'Start' }).props.func();
    });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
      component.root.findByProps({ name: 'Reset' }).props.func();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
      component.root.findByProps({ name: 'Lap' }).props.func();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // Check if mock functions were called
    expect(startStopwatchMock).toHaveBeenCalled();
    expect(resetStopwatchMock).toHaveBeenCalled();
    expect(lapMock).toHaveBeenCalled();
  });
});

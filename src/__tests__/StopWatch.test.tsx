import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import StopWatch from '../StopWatch';

jest.useFakeTimers();

describe('StopWatch component', () => {
  it('renders without crashing', () => {
    render(<StopWatch />);
  });
  // START/PAUSE Cases
  // - timer starts at 0 initially and increments when not paused
  describe('Start/Pause Button', () => {
    it('handles start/pause button click', () => {
        const { getByText } = render(<StopWatch />);
        // EXPECT: time is 00:00
        act(() => {
            expect(getByText('00:00')).toBeInTheDocument();
            expect(getByText('Start')).toBeInTheDocument(); // since timer is currently paused
        });
        // click on start button
        act(() => {
          fireEvent.click(getByText('Start'));
        });
        // we advance our own timer by 1 second
        act(() => {
          jest.advanceTimersByTime(1000);
        });
        // EXPECT: time is 00:01
        act(() => {
          expect(getByText('00:01')).toBeInTheDocument(); 
          expect(getByText('Pause')).toBeInTheDocument(); // since timer is currently running
        });
        act(() => {
          fireEvent.click(getByText('Pause'));
        });
        act(() => {
          jest.advanceTimersByTime(1000);
        });
        act(() => {
          expect(getByText('00:01')).toBeInTheDocument(); // no change in time
        });
      });
  });
  // RESET Cases
  // - when press RESET, time should be 0 and lap should be 0
  describe('Reset Button', () => {
    it('handles reset button click', () => {
        const { getByText } = render(<StopWatch />);
        act(() => {
          fireEvent.click(getByText('Start'));
        });
        act(() => {
          jest.advanceTimersByTime(1000);
        });
        act(() => {
          fireEvent.click(getByText('Reset'));
        });
        act(() => {
            expect(getByText('00:00')).toBeInTheDocument();
            expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
        });
      });

  });
  

    //   LAPS CASES:
    // - increases lap count when timer is running
    // - does not increase lap count when timer is not running (i.e. START is not pressed)
    // - does not increase lap count when timer is paused
    // - increases lap count after timer was paused
    // - lap count is zero after reset
    describe('Lap Button', () => {
        it('increases lap count when timer is running', () => {
            const { getByText } = render(<StopWatch />);
            // EXPECT: 0 lap
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            // click the start button
            act(() => {
              fireEvent.click(getByText('Start'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
              });
            // EXPECT: 1 lap
            act(() => {
              expect(getByText('Current Lap: 1 lap')).toBeInTheDocument();
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 2 laps
            act(() => {
                expect(getByText('Current Lap: 2 laps')).toBeInTheDocument();
            });
          });
        
          it('does not increase lap count when timer is not running', () => {
            const { getByText } = render(<StopWatch />);
            // EXPECT: 0 lap
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            // click the lap button
            act(() => {
              fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 0 laps
            act(() => {
              expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
          });
        
          it('does not increase lap count when timer is paused', () => {
            const { getByText } = render(<StopWatch />);
            // EXPECT: 0 lap
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            // click the start button
            act(() => {
                fireEvent.click(getByText('Start'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 1 lap
            act(() => {
                expect(getByText('Current Lap: 1 lap')).toBeInTheDocument();
            });
            // click the pause button
            act(() => {
                fireEvent.click(getByText('Pause'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 1 lap
            act(() => {
                expect(getByText('Current Lap: 1 lap')).toBeInTheDocument();
            });
            
          });
        
          it('increases lap count after timer was paused', () => {
            const { getByText } = render(<StopWatch />);
            // EXPECT: 0 lap
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            // click the start button
            act(() => {
                fireEvent.click(getByText('Start'));
            });
            // click the pause button
            act(() => {
                fireEvent.click(getByText('Pause'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 0 laps
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            // click the start button
            act(() => {
                fireEvent.click(getByText('Start'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 1 lap
            act(() => {
                expect(getByText('Current Lap: 1 lap')).toBeInTheDocument();
            });
            
          });
        
          it('lap count is zero after reset', () => {
            const { getByText } = render(<StopWatch />);
            // EXPECT: 0 lap
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            // click the start button
            act(() => {
                fireEvent.click(getByText('Start'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 1 lap
            act(() => {
                expect(getByText('Current Lap: 1 lap')).toBeInTheDocument();
            });
            // click the reset button
            act(() => {
                fireEvent.click(getByText('Reset'));
            });
            // click the lap button
            act(() => {
                fireEvent.click(getByText('Lap'));
            });
            // EXPECT: 0 laps
            act(() => {
                expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
            });
            
          });

    })


});

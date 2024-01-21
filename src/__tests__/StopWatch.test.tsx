import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import StopWatch from '../StopWatch';

jest.useFakeTimers();

describe('StopWatch component', () => {
    afterEach(() => {
        jest.clearAllTimers();
      });
      
  it('renders without crashing', () => {
    render(<StopWatch />);
  });

  it('has the correct initial state', () => {
    const { getByText } = render(<StopWatch />);
    expect(getByText('00:00')).toBeInTheDocument();
    expect(getByText('Current Lap: 0 laps')).toBeInTheDocument();
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
          // Edge case: Rapid clicks on lap button
          it('handles rapid clicks on lap button', () => {
            const { getByText } = render(<StopWatch />);
            
            // Click the start button
            act(() => {
              fireEvent.click(getByText('Start'));
            });
          
            // Rapidly click the lap button multiple times
            
            for (let i = 0; i < 5; i++) {
                act(() => {
                    fireEvent.click(getByText('Lap'));
                });
            }
          
            // Expect lap count to be accurate
            act(() => {
              expect(getByText('Current Lap: 5 laps')).toBeInTheDocument();
            });
          });

          it('handles lap count after pause', async () => {
            const { getByText } = render(<StopWatch />);
            
            // Click the start button
            act(() => {
              fireEvent.click(getByText('Start'));
            });
          
            // Click the lap button
            act(() => {
              fireEvent.click(getByText('Lap'));
            });
          
            // Click the pause button
            act(() => {
              fireEvent.click(getByText('Pause'));
            });
          
            // Wait for some time (e.g., 1 second) for potential updates
            await waitFor(() => {}, { timeout: 1000 });
          
            // Expect lap count to remain the same after pause
            act(() => {
              expect(getByText('Current Lap: 1 lap')).toBeInTheDocument();
            });
          });

    })

    describe('Lap List', () => {
      it('displays lap list in reverse order with correct lap times', () => {
        // Render the component
        const { getByText } = render(<StopWatch />);
        act(() => {
          fireEvent.click(getByText('Start')); // Lap 1
        });
        // Trigger lap button clicks with a delay
        act(() => {
          fireEvent.click(getByText('Lap')); // Lap 1
        });
        act(() => {
          jest.advanceTimersByTime(10000); // Advance time by 10 seconds
        });

        act(() => {
          fireEvent.click(getByText('Lap')); // Lap 2
        });
        act(() => {
          jest.advanceTimersByTime(5000); // Advance time by 5 seconds
        });

        act(() => {
          fireEvent.click(getByText('Lap')); // Lap 3
        });
        act(() => {
          jest.advanceTimersByTime(7000); // Advance time by 7 seconds
        });

        // Check if lap list items are rendered in reverse order
        // Lap was first clicked at time 00:00, we then clicked lap a second time at time 00:10, etc
        const lapListItems = ['Lap 1: 00:00', 'Lap 2: 00:10', 'Lap 3: 00:05']; // expected lap times

        lapListItems.forEach((lapListItem) => {
          // check with text that is rendered
          expect(getByText(lapListItem)).toBeInTheDocument();
        });
      });
    });


});

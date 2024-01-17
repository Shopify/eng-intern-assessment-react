import React, {useState, useRef, useEffect} from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stopwatch from '../StopWatch';
import moment from 'moment';
jest.useFakeTimers();
const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [laps, setLaps] = useState<string[]>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startStopwatch = () => {
        if (!isRunning) {
            setIsRunning(true);
            setStartTime(moment());
            timerRef.current = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
            }, 10);
        } else {
            setIsRunning(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const resetStopwatch = () => {
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(0);
        setLaps([]);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
    const formatTime = (milliseconds: number): string => {
        const duration = moment.duration(milliseconds);
        return `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}:${String(Math.floor(duration.milliseconds() / 10)).padStart(2, '0')}`;
    };
    const lap = () => {
        if (startTime && isRunning) {
            const lapTime = moment.duration(moment().diff(startTime)).asMilliseconds();
            console.log(lapTime)
            setLaps((prevLaps) => [...prevLaps, formatTime(lapTime)]);
            setStartTime(moment());
        }
    };
describe('Stopwatch', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('renders Stopwatch component', () => {
    render(<Stopwatch {...{ elapsedTime, isRunning, startStopwatch, resetStopwatch, lap, laps }} />);
    expect(screen.getByText('Stopwatch')).toBeInTheDocument();
  });

  test('starts, stops, and resets stopwatch', () => {
    render(<Stopwatch {...{ elapsedTime, isRunning, startStopwatch, resetStopwatch, lap, laps }} />);

    // Start
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByText('00:00.000')).toBeInTheDocument();

    // Advance time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:01.000')).toBeInTheDocument();

    // Stop
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('00:01.000')).toBeInTheDocument(); // Should not change while stopped

    // Reset
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00.000')).toBeInTheDocument();
  });

  test('records laps', () => {
    render(<Stopwatch {...{ elapsedTime, isRunning, startStopwatch, resetStopwatch, lap, laps }} />);

    // Start
    fireEvent.click(screen.getByText('Start'));

    // Advance time by 500 milliseconds
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Lap
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('00:00.500')).toBeInTheDocument();
    expect(screen.getByText('Laps')).toBeInTheDocument();
    expect(screen.getByText('00:00.500')).toBeInTheDocument();

    // Advance time by another 500 milliseconds
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Lap again
    fireEvent.click(screen.getByText('Lap'));
    expect(screen.getByText('00:01.000')).toBeInTheDocument();
    expect(screen.getByText('Laps')).toBeInTheDocument();
    expect(screen.getAllByText('00:00.500').length).toBe(2);
  });
});

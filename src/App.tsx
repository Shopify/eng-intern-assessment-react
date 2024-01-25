import React from 'react';
import useStopwatch from './hooks/useStopwatch';
import Stopwatch from './components/Stopwatch';
import StopwatchButton from './components/StopWatchButton';

const App: React.FC = () => {
    const { time, laps, start, stop, reset, lap } = useStopwatch();

    return (
        <div>
            <Stopwatch time={time} laps={laps} />
            <StopwatchButton
                onStart={start}
                onStop={stop}
                onReset={reset}
                onLap={lap}
            />
        </div>
    );
};

export default App;
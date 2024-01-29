import React from 'react';
import useStopWatch from './hooks/useStopWatch';
import StopWatch from "./components/StopWatch";
import StopWatchButton from './components/StopWatchButton';

const App: React.FC = () => {
    const { time, laps, start, stop, reset, lap } = useStopWatch();

    return (
        <div>
            <StopWatch time={time} laps={laps} />
            <StopWatchButton
                onStart={start}
                onStop={stop}
                onReset={reset}
                onLap={lap}
            />
        </div>
    );
};

export default App;
import React from 'react';

export interface LapData {
    laptime: number,
    totaltime: number
}

export interface StopWatchData {
    starttime: number,
    endtime: number,
    paused: boolean,
    laps: LapData[],
    startTimer: () => void,
    stopTimer: () => void,
    resetTimer: () => void,
    createLap: () => void,
}

export const StopWatchContext = React.createContext<StopWatchData>({
    starttime: 0,
    endtime: 0,
    paused: true,
    laps: [],
    startTimer: () => {},
    stopTimer: () => {},
    resetTimer: () => {},
    createLap: () => {},
});


export const StopWatchProvider = (props: { children: React.ReactNode }) => {
    const [starttime, setStarttime] = React.useState(0);
    const [endtime, setEndtime] = React.useState(0);
    const [paused, setPaused] = React.useState(true);
    const [laps, setLaps] = React.useState(new Array<LapData>());

    function startTimer() {
        setPaused(false);
        if(starttime == 0) { // this is a fresh start
            setStarttime(Date.now());
            setEndtime(Date.now());
        }
        else { // this is if paused and resuming
            // we use the previous state values as there is no guarantee React will batch the updates together properly
            setEndtime(curendtime => {
                setStarttime(curstarttime => (Date.now() - (curendtime - curstarttime)));
                return Date.now();
            })
        }
    }

    function stopTimer() {
        setPaused(true);
    }

    function resetTimer() {
        setPaused(true);
        setStarttime(0);
        setEndtime(0);
        setLaps([]);
    }

    function createLap() {
        setLaps((laps) => [...laps, {
            // lap time would be the current total time - the total time from the last lap (which is 0 if this is the first lap)
            laptime: Date.now() - starttime - (laps.length > 0 ? laps.pop().totaltime : 0),
            totaltime: Date.now() - starttime
        }])
    }

    React.useEffect(() => {
        let timerinterval : NodeJS.Timer;
        if(!paused) {
            // increase timer every 10 millis
            timerinterval = setInterval(() => {
                setEndtime(Date.now());
            }, 10)
        }
        return () => clearInterval(timerinterval);
    }, [paused]);

    return (
        <StopWatchContext.Provider value={{starttime, endtime, paused, laps, startTimer, stopTimer, resetTimer, createLap}}>
            {props.children}
        </StopWatchContext.Provider>
    )
}

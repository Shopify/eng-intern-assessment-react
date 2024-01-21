import React, {useRef,useCallback} from 'react'
import {Resolution,SwActions} from "@types";


export interface StopWatchController {
    milliseconds: number;
    resolutions: Resolution[];
    laps: number[];
    running: boolean;
    actions: SwActions;
}

export interface UseStopWatchProps{
    resolutions?: Resolution[]
}


const defaultResolution: Resolution[] = [
    {divisor: 3600000, modulus: 24},
    {divisor: 60000, modulus: 60},
    {divisor: 1000, modulus: 60},
    {divisor: 10, modulus: 100}
]
export const useStopWatch = (
    {
        resolutions
    }: UseStopWatchProps) : StopWatchController  =>  {

    if(!resolutions) resolutions = defaultResolution;

    const [milliseconds, setMilliseconds] = React.useState(0)
    const [laps, setLaps] = React.useState<number[]>([])
    const [running, setRunning] = React.useState<boolean>()

    const pref = useRef(null);
    let curTime = 0;
    const calculateTime = useCallback((time) => {

        const delta = time - curTime;
        if(delta > 0) {
            console.log("DELTA: ", delta)
            curTime = time;
            setMilliseconds(prev => prev + delta);
        }
        pref.current = requestAnimationFrame(calculateTime);

    }, [curTime, setMilliseconds]);

    const start = useCallback(() => {
        if(!running){
            setRunning(true)
            curTime = performance.now();
            pref.current = requestAnimationFrame(calculateTime);
        }
    },[calculateTime, setRunning, curTime,running]);

    const stop = useCallback (() => {
        setRunning(false)
        cancelAnimationFrame(pref.current);
        //reset pref maybe?
        pref.current = null
    },[setRunning])

    const reset = useCallback(() => {
        setMilliseconds(0);
        setLaps([]);
    },[setMilliseconds, setLaps])


    const lap = useCallback(() => {
        setLaps(prev => [...prev, milliseconds]);

    }, [setLaps, milliseconds]);

    return {
        milliseconds,
        resolutions,
        laps,
        running,
        actions: {
            start,
            stop,
            reset,
            lap
        }
    }

}

export default useStopWatch;
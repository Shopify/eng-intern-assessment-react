import React, { Dispatch, SetStateAction } from 'react'

type state = string;
type setState = string;

export default function StopWatchButton({state}: {state: string}, {setState}: {setState: Dispatch<SetStateAction<string>>}) {
    return(
        <div>
            {/* <button onClick={() => {
                if (mode2){ //Stopwatch is currently running

                }
                }}> Stop! </button> */}
            <button onClick={() => {setState("COUNTING")}}> Start! </button>
            {/* <button onClick={() => mode1 = 2}> Lap </button> */}
        </div>
    )
}
import React from 'react';

interface IStopWatchButtonsProps {
    isRunning: boolean
    handleTimerRunning: () => void
    handleTimerReset: () => void
    handleLapAdd: () => void
}

export default function StopWatchButtons(props: IStopWatchButtonsProps) {

    const {isRunning, handleTimerRunning, handleTimerReset, handleLapAdd} = props;


    return(
        <div className='stopWatchButton__container'>
            <button className='stopWatchButton__start' onClick={handleTimerRunning} style={{background: `${isRunning ? '#fa8072' : 'rgb(70, 246, 187)'}`}}>
                {isRunning ? "Pause" : "Start"}
            </button>
            {isRunning ? 
                <button className='stopWatchButton__lap' onClick={handleLapAdd}>
                    Lap
                </button>:
                <button className='stopWatchButton__reset' onClick={handleTimerReset}>
                    Reset
                </button>
            }

        </div>
    )
}
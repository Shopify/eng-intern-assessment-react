import React from 'react'
import StopWatchButton from './StopWatchButton'

interface Time{
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}

const [time, setTime] = React.useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
})
const [lapNum, setLapNum] = React.useState(0)
const state = 0

export default function StopWatch() {

    React.useEffect(() => {
        setTimeout(() => {
            const newTime = time
            if (newTime.seconds == 59){
                newTime.seconds = 0;
                newTime.minutes++;
            }
            if (newTime.minutes == 60){
                newTime.minutes = 0;
                newTime.hours++;
            }
        }, state);
    })

    document.getElementById('lap')?.addEventListener('click', function(){
        const newLap = document.createElement("div")
        const lapText = document.createTextNode("Lap " + lapNum + ": " + time.hours + ":" + time.minutes + ":" + time.seconds + ":" + time.milliseconds)
        newLap.appendChild(lapText);
        const lapList = document.getElementById('lapList')
        lapList?.appendChild(newLap)
    })  

    return(
        <div style={{
            display: 'grid', //2 columns, 3 rows
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gridTemplateRows: 'minmax(0, 1fr) minmax(0, 3fr) minmax(0, 1fr)'
        }}>
            <div style={{ //Title
                gridColumn: '1 / span 2',
                gridRow:'1'
            }}>
                Stopwatch
            </div>

            <div style={{ //Timer Element
                gridColumn: '1',
                gridRow: '2'
            }}>
                {time.hours + ":" + time.minutes + ":" + time.seconds + ":" + time.milliseconds}
            </div>

            <div style={{ //Lap Display
                gridColumn: '2',
                gridRow: '2'
            }} id="lapList">
                Laps
            </div>

            <div style={{ //Buttons
                gridColumn: '1',
                gridRow: '3'
            }}>
            <StopWatch/>
            <input type="button" value="Lap" id="lap"/>
            </div>
        </div>
    )
}
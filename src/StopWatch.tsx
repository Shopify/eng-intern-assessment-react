import { networkInterfaces } from 'os'
import React from 'react'
import StopWatchButton from './StopWatchButton'
//import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

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
    const [timer, setTimer] = React.useState("PAUSED")
    let lapNum = 1

    React.useEffect(() => {        
        let prevTime = Date.now() //Save the time after each interval, as setInterval is inaccurate
        if(timer == "RUNNING"){
            var timerInterval = setInterval(count, 10);
        }
        else if(timer == "RESET"){
            setTime({
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            })
            lapNum = 0
            updateTime(time)
        }

        function count(){
            if(timer != "RUNNING"){
                clearInterval(timerInterval);
                return;
            }
            let newTime = time
            const timeElapsed = Date.now() - prevTime
            newTime.milliseconds = newTime.milliseconds + timeElapsed/10 //Milliseconds in this context are represented as 0 to 99
            if (newTime.milliseconds >= 100){ //100 milliseconds = 1 second
                newTime.seconds++;
                newTime.milliseconds = newTime.milliseconds - 100
            }
            if (newTime.seconds == 60){ //60 seconds = 1 minute
                newTime.minutes++;
                newTime.seconds = 0
            }
            if (newTime.minutes == 60){ //50 minutes = 1 hour
                newTime.hours++;
                newTime.minutes = 0
            }
            prevTime = Date.now()
            updateTime(newTime)
        }

        function updateTime(newTime: Time){
            const timerElem = document.getElementById('timer')
            let digitAdjust
            if(newTime.milliseconds < 10){
                digitAdjust = "0" + String(Math.floor(newTime.milliseconds))
            }
            else{
                digitAdjust = Math.floor(newTime.milliseconds)
            }
            const timeText = document.createTextNode(newTime.hours + ":" + newTime.minutes + ":" + newTime.seconds + ":" + digitAdjust)
            timerElem.replaceChild(timeText, timerElem.firstChild)
        }
      
        document.getElementById('lap')?.addEventListener('click', function(){ //Save a lap
            let newLap = document.createElement("div");
            let lapText = document.createTextNode("Lap " + lapNum + ": " + time.hours + ":" + time.minutes + ":" + time.seconds + ":" + Math.round(time.milliseconds));
            newLap.appendChild(lapText);
            const lapList = document.getElementById('lapList');
            lapList?.appendChild(newLap);
            lapNum++;
        })  
        return () => {}
    },[timer])

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
                <h1 style={{
                    textAlign: 'center'
                }}>Stopwatch</h1>
            </div>

            <div id='timer' style={{ //Timer Element
                gridColumn: '1',
                gridRow: '2'
            }}>
                {time.hours + ":" + time.minutes + ":" + time.seconds + ":" + time.milliseconds}
            </div>

            <div style={{ //Lap Display
                gridColumn: '2',
                gridRow: '2 / span 2'
            }} id="lapList">
                Laps
            </div>

            <div style={{ //Buttons
                gridColumn: '1',
                gridRow: '3'
            }}>
            <StopWatchButton 
            timer={timer}
            runTimer={() => setTimer("RUNNING")}
            pauseTimer={() => setTimer("PAUSED")}
            resetTimer={() => setTimer("RESET")}/>
            <input type="button" value="Lap" id="lap"/>
            </div>
        </div>
    )
}
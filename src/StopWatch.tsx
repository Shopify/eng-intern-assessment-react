import { networkInterfaces } from 'os'
import React, { useEffect } from 'react'
import StopWatchButton from './StopWatchButton'
//import StopWatchButton from './StopWatchButton'
let lapNum = 1

export default function StopWatch() {

    interface Time{
        minutes: number,
        seconds: number,
        milliseconds: number
    }

    const [time, setTime] = React.useState<Time>({
        minutes: 0,
        seconds: 0,
        milliseconds: 0
    })
    const [timer, setTimer] = React.useState("PAUSED")

    React.useEffect(() => {        
        let prevTime = Date.now() //Save the time after each interval, as setInterval is inaccurate

        const timerInterval = setInterval(() => {
            if(timer == "PAUSED" || timer == "RESET"){
                clearInterval(timerInterval);
                clearInterval(titleTimer);
                if(timer == "RESET"){
                    lapNum = 0;
                    updateTime({
                        minutes: 0,
                        seconds: 0,
                        milliseconds: 0
                    })
                    setTime({
                        minutes: 0,
                        seconds: 0,
                        milliseconds: 0
                    })
                    const lapElem = document.getElementById("lapList"); //Reset Lap list
                    while(lapElem.firstChild){
                        lapElem.removeChild(lapElem.firstChild);
                    }
                    document.title = "Stopwatch [0:0]"
                }
                return () => {
                    clearInterval(timerInterval);
                    document.getElementById('lap')?.removeEventListener('click', addLap);
                }
            }
            let newTime = time;
            const timeElapsed = Date.now() - prevTime;
            console.log(timeElapsed)
            newTime.milliseconds += timeElapsed
            if (newTime.milliseconds >= 1000){ //100 milliseconds = 1 second
                newTime.seconds++;
                newTime.milliseconds = newTime.milliseconds - 1000;
            }
            if (newTime.seconds == 60){ //60 seconds = 1 minute
                newTime.minutes++;
                newTime.seconds = 0;
            }
            prevTime = Date.now()
            newTime.milliseconds = Math.round(newTime.milliseconds)
            updateTime(newTime)
        }, 10)

        const titleTimer = setInterval(() => { //Dynamically update the page title
            document.title = "Stopwatch [" + time.minutes + ":" + time.seconds + "]"
        }, 100)

        function updateTime(newTime: Time){ //Update stopwatch text
            const timerElem = document.getElementById('timer')
            let minAdj;
            let secAdj;
            let milAdj;
            if(newTime.minutes < 10) { minAdj = "0" + newTime.minutes}
            else{ minAdj = newTime.minutes}
            if(newTime.seconds < 10){ secAdj = "0" + newTime.seconds}
            else{ secAdj = newTime.seconds}
            if(newTime.milliseconds < 100){ milAdj = "0" + Math.round(newTime.milliseconds/10) }
            else{ milAdj = Math.round(newTime.milliseconds/10) }
            const timeText = document.createTextNode(minAdj + ":" + secAdj + ":" + milAdj)
            timerElem.replaceChild(timeText, timerElem.firstChild)
        }
        return () => { 
            clearInterval(timerInterval);
            clearInterval(titleTimer);
            document.getElementById('lap')?.removeEventListener('click', addLap);
        }
    },[timer])

    document.getElementById('lap')?.addEventListener('click', addLap)

    function addLap(){
        let newLap = document.createElement("div");
        console.log(newLap)
        let lapText = document.createTextNode("Lap " + lapNum + ": " + time.minutes + ":" + time.seconds + ":" + Math.round(time.milliseconds/10));
        newLap.appendChild(lapText);
        const lapList = document.getElementById('lapList');
        lapList?.appendChild(newLap);
        lapNum++;
    }

    return(

        <div style={{
            display: 'grid', //3 columns, 3 rows
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
            gridTemplateRows: 'minmax(0, 1fr) minmax(0, 3fr) minmax(0, 1fr)',
            margin: '40px'
        }}>
            <div style={{ //Title
                gridColumn: '1 / span 3',
                gridRow:'1'
            }}>
                <h1 style={{
                    textAlign: 'center'
                }}>Stopwatch</h1>
            </div>

            <div style={{ //Timer Element
                gridColumn: '1 / span 2',
                gridRow: '2',
                width: '100%',
                paddingTop: '10%',
                textAlign: 'center',
                fontSize: '60px',
                fontFamily: "Courier New"
            }}>
                <div id='timer' style={{

                }}>
                    00:00:00
                </div>
            </div>

            <div style={{ //Lap Display
                gridColumn: '3',
                gridRow: '2 / span 2',
                borderStyle: 'double',
                borderRadius: '10px',
                borderColor: '#989898',
                height: '500px',
                fontSize: '25px'
            }}>
                <p style={{
                    margin: '15px'
                }}>Laps</p>
                <div id="lapList" style={{
                    overflow: 'auto',
                    margin: '20px',
                    height: '430px',
                    fontSize: '18px'
                }}>
                </div>
            </div>

            <div style={{ //Buttons
                gridColumn: '1 / span 2',
                gridRow: '3',
                textAlign: 'center',
                display: 'grid',
                gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)'
            }}>
            <div style={{
                display: 'table',
                margin: '0 auto'
            }}>             
                <StopWatchButton 
                timer={timer}
                runTimer={() => setTimer("RUNNING")}
                pauseTimer={() => setTimer("PAUSED")}
                resetTimer={() => setTimer("RESET")}/>
            </div>
            <input style={{
                gridRow: '2',
                margin: '0 auto',
                width: '100px',
                height: '50px',
                fontSize: '30px',
                fontFamily: "Times New Roman",
            }} type="button" value="Lap" id="lap"/>
            </div>
        </div>
    )
}
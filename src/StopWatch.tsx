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

    const [timer, setTimer] = React.useState("PAUSED") //Track stopwatch state

    React.useEffect(() => {        
        let prevTime = Date.now() //Save the time after each interval, as setInterval is inaccurate

        const timerInterval = setInterval(() => {
            if(timer == "PAUSED" || timer == "RESET"){
                clearInterval(timerInterval);
                clearInterval(titleTimer);
                if(timer == "RESET"){
                    lapNum = 1;
                    setTime({
                        minutes: 0,
                        seconds: 0,
                        milliseconds: 0
                    })
                    updateTime("00:00:00")
                    const lapElem = document.getElementById("lapList"); //Reset Lap list
                    while(lapElem.firstChild){
                        lapElem.removeChild(lapElem.firstChild);
                    }
                    document.title = "Stopwatch [0:0]"
                }
                return;
            }
            let newTime = time;
            const timeElapsed = Date.now() - prevTime;
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
            newTime.milliseconds = Math.floor(newTime.milliseconds)
            updateTime(timerFormat())
        }, 10)

        const titleTimer = setInterval(() => { //Dynamically update the page title
            document.title = "Stopwatch [" + time.minutes + ":" + time.seconds + "]"
        }, 500)

        function updateTime(timerMsg: string){ //Update stopwatch text
            const timerElem = document.getElementById('timer')
            const timeText = document.createTextNode(timerMsg)
            timerElem.replaceChild(timeText, timerElem.firstChild)
        }

        function timerFormat(){
            let minAdj;
            let secAdj;
            let milAdj;
            if(time.minutes < 10) { minAdj = "0" + time.minutes}
            else{ minAdj = time.minutes}
            if(time.seconds < 10){ secAdj = "0" + time.seconds}
            else{ secAdj = time.seconds}
            if(time.milliseconds < 100){ milAdj = "0" + Math.floor(time.milliseconds/10) } //Milliseconds are typically represented from 0-99
            else{ milAdj = Math.floor(time.milliseconds/10) }
            let timerMsg = minAdj + ":" + secAdj + ":" + milAdj
            return timerMsg
        }

        document.getElementById('lap')?.addEventListener('click', addLap)

        function addLap(){ //Creates a new div element to store each lap
            if( timer=="PAUSED" || timer == "RESET") return;
            let newLap = document.createElement("div");
            let lapText = document.createTextNode("Lap " + lapNum + " - " + timerFormat());
            newLap.appendChild(lapText);
            const lapList = document.getElementById('lapList');
            lapList?.appendChild(newLap);
            lapNum++;
        }

        return () => { //Cleanup Function
            clearInterval(timerInterval);
            clearInterval(titleTimer);
            document.getElementById('lap')?.removeEventListener('click', addLap);
        }
    },[timer])

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
                <h1 data-testid='heading' style={{
                    textAlign: 'center',
                    fontSize: '55px'
                }}>Stopwatch</h1>
            </div>

            <div style={{ //Timer Element
                gridColumn: '1 / span 2',
                gridRow: '2',
                width: '100%',
                paddingTop: '10%',
                fontSize: '60px',
                fontFamily: "Courier New"
            }}>
                <div id='timer' style={{
                    textAlign: 'center'
                }}>
                    00:00:00
                </div>
            </div>

            <div style={{ //Lap Frame
                gridColumn: '3',
                gridRow: '2 / span 2',
                borderStyle: 'double',
                borderRadius: '10px',
                borderColor: '#989898',
                height: '600px',
                fontSize: '25px'
            }}>
                <p style={{
                    margin: '15px'
                }}>Laps</p>
                <div data-testid='laplist' id='lapList' style={{ //Lap Container, scrolls as more laps are added
                    overflow: 'auto',
                    margin: '20px',
                    height: '530px',
                    fontSize: '18px',
                    justifyContent: 'space-between',
                    rowGap: '10px'
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
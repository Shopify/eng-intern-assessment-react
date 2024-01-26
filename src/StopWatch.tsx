import React from 'react'
import { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'
import { format } from 'react-string-format'

const timeToString = (time: number) => { 
	const hours = Math.floor(time / 360000)
	const minutes = Math.floor((time % 360000) / 6000)
	const seconds = Math.floor((time % 6000) / 100)

	//every unit represents 10 milliseconds
	const milliseconds = time % 100
	const formattedTime = format('{0}:{1}:{2}:{3}', 
								  hours.toString().padStart(2, '0'), 
								  minutes.toString().padStart(2, '0'),
								  seconds.toString().padStart(2, '0'),
								  milliseconds.toString().padStart(2, '0')
								)
	return formattedTime
}

const TimeDisplay = ({ time } : {time: number}) => {
	return (
		<div id='timeDisplay'>
			{timeToString(time)}
		</div>
	)
}

const LapDisplay = ({ laps } : {laps: number[]}) => {
	let id = 1;
	return (
		<div id='lapDisplay'>
			{laps.map(lap => {
				let curId = id.toString();
				id += 1;
				return (<p key={curId}>{curId}: {timeToString(lap)}</p>)
			})}
		</div>
	)
}

export default function StopWatch() {
	//stores time such that one unit represents 10 milliseconds
	const [time, setTime] = useState(0)
	const [start, setStart] = useState(false)
	const [laps, setLaps] = useState([])

	const handleStart = () => {
		setStart(true)
	}

	const handleStop = () => {
		setStart(false)
	}

	const handleReset = () => {
		setStart(false)
		setTime(0)
		setLaps([])
	}

	const handleLap = () => {
		const newLaps = laps.concat(time)
		setLaps(newLaps)
	}

	useEffect(() => {
		//Increases time by 1 unit for every 10 milliseconds passed
		if (start) {
			const interval = setInterval(() => setTime(time + 1), 10)
			return () => clearInterval(interval)
		}
	}, [time, start, laps])

    return(
        <div>
			<div>
				<TimeDisplay time={time} />
			</div>
			<div>
				<StopWatchButton 
					handleStart={handleStart}
					handleStop={handleStop}
					handleReset={handleReset}
					handleLap={handleLap}  
				/>
			</div>
			<div>
				<LapDisplay laps={laps} />
			</div>			
        </div>
    )
}

export { timeToString };
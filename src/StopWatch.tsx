import React from 'react'
import { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

const TimeDisplay = ({ hours, minutes, seconds, milliseconds } : 
	{ hours: number, minutes: number, seconds: number, milliseconds: number}) => {
		return (
			<>
				{hours.toString().padStart(2, '0')}:
				{minutes.toString().padStart(2, '0')}:
				{seconds.toString().padStart(2, '0')}:
				{milliseconds.toString().padStart(2, '0')} 
			</>
		)
}

export default function StopWatch() {
	//stores time such that one unit represents 10 milliseconds
	const [time, setTime] = useState(0)
	const [start, setStart] = useState(false)
	const [lapCount, setLapCount] = useState(0)

	const handleStart = () => {
		setStart(true)
	}

	const handleStop = () => {
		setStart(false)
	}

	const handleReset = () => {
		setStart(false)
		setTime(0)
		setLapCount(0)
	}

	useEffect(() => {
		//Increases time by 1 unit for every 10 milliseconds passed
		if (start) {
			const interval = setInterval(() => setTime(time + 1), 10)
			return () => clearInterval(interval)
		}
	}, [time, start, lapCount])

	const hours = Math.floor(time / 360000)
	const minutes = Math.floor((time % 360000) / 6000)
	const seconds = Math.floor((time % 6000) / 100)

	//every unit represents 10 milliseconds
	const milliseconds = time % 100

    return(
        <div>
			<div>
				<TimeDisplay 
					hours={hours} 
					minutes={minutes} 
					seconds={seconds} 
					milliseconds={milliseconds} 
				/>
			</div>
			<div>
				<button onClick={handleStart}>start</button>
				<button onClick={handleStop}>stop</button>
				<button onClick={handleReset}>reset</button>
				<StopWatchButton />
			</div>
			<div>
			
			</div>			
        </div>
    )
}
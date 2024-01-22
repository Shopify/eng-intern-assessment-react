import React from 'react'
import { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

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

	

    return(
        <div>
			<div>
				{time}
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
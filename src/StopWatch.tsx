import React from 'react'
import '../util/styles.css'

interface StopWatchProps {
	time: number
}

const StopWatch: React.FC<StopWatchProps> = ({
	time,
}) => {

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		const formattedHours = hours.toString().padStart(2, '0')
		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = seconds.toString().padStart(2, '0')

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	};

    return(
        <h2 className='stopWatchDisplay'>
			{formatTime(time)}
		</h2>
    )
}

export default StopWatch

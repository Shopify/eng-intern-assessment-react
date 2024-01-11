import React from 'react'
import { formatTime } from '../util/helpers'
import '../util/styles.css'

interface StopWatchProps {
	time: number
}

const StopWatch: React.FC<StopWatchProps> = ({
	time,
}) => {

    return(
        <h2 className='stopWatchDisplayText'>
			{formatTime(time)}
		</h2>
    )
}

export default StopWatch

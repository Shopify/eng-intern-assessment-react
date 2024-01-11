import React from 'react'
import '../util/styles.css'

interface StopWatchButtonProps {
	id: number;
	display: string;
	onButtonClick: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
	id, // this prop isn't used but could be used in future if we wanted to do specific styling on the buttons
	display,
	onButtonClick,
}) => {
    return(
        <button 
			className='stopWatchButton'
			onClick={onButtonClick}
		>
			{display}
		</button>
    )
}

export default StopWatchButton

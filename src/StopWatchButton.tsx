import React from 'react'
import '../util/styles.css'

interface StopWatchButtonProps {
	id: number;
	display: string;
	onButtonClick: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
	id,
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

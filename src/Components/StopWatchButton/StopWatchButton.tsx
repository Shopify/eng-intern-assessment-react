import React from 'react'
import './StopWatchButton.css'

interface Props {
	buttonType: string;
	onClick: Function;
}

const StopWatchButton: React.FC<Props> = ({ buttonType, onClick }) => {
	// stopwatch buttons
	return (
		<button className={buttonType=="Change Watch Face"?'changebutton':'button'} onClick={() => onClick()}>{buttonType}</button>
	)
}

export default StopWatchButton;
import React from 'react'
import { Button, Text } from '@shopify/polaris'
import './StopWatchButton.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
interface Props {
	buttonType: string;
	onClick: Function;
}

const StopWatchButton: React.FC<Props> = ({ buttonType, onClick }) => {
	const timer = useSelector((state: RootState) => state.timer)
	return (
			<button className={buttonType=="Change Watch Face"?'changebutton':'button'} onClick={() => onClick()}>{buttonType}</button>
		
	)
}

export default StopWatchButton;
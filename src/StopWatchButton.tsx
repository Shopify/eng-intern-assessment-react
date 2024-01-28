import React, { ReactNode } from 'react';
import './styles/StopWatchButton.css';

type PropType = {
	children: ReactNode;
	onClick: () => void;
	timerIsRunning: boolean;
};

export default function StopWatchButton({
	children,
	onClick,
	timerIsRunning,
}: PropType) {
	

	return <button onClick={() => onClick()} >{children}</button>;
}


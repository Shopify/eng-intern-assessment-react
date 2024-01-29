import React, { ReactNode } from 'react';
import './styles/StopWatchButton.css';

type PropType = {
	children: string;
	onClick: () => void;
	disabled?: boolean;
};

export default function StopWatchButton({
	children,
	onClick,
	disabled,
}: PropType) {
	return (
		<button
			onClick={() => onClick()}
			disabled={disabled}
			aria-label={children}
		>
			{children}
		</button>
	);
}


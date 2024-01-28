import React, { ReactNode } from 'react';
import './styles/StopWatchButton.css';

type PropType = {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
};

export default function StopWatchButton({
	children,
	onClick,
	disabled,
}: PropType) {
	return (
		<button onClick={() => onClick()} disabled={disabled}>
			{children}
		</button>
	);
}


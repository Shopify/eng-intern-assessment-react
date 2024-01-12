import React from "react";

interface StopWatchButtonProps {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function StopWatchButton({
	children,
	onClick,
}: StopWatchButtonProps) {
	return (
		<button type="button" onClick={onClick}>
			{children}
		</button>
	);
}

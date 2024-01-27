import React from "react";
import "./StopWatchButton.scss";

interface ButtonProps {
	text: string;
	className: string;
	clickHandler: () => void;
}

export default function StopWatchButton({
	text,
	className,
	clickHandler,
}: ButtonProps) {
	return (
		<div>
			<button
				className={`button ${{ className }}`}
				onClick={clickHandler}
			>
				{text}
			</button>
		</div>
	);
}

import React from "react";
import { twMerge } from "tailwind-merge";

interface StopWatchButtonProps {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	className?: string;
}

export default function StopWatchButton({
	children,
	onClick,
	disabled,
	className,
}: StopWatchButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={twMerge(
				"size-20 rounded-full bg-gray-600 text-slate-50",
				disabled && "bg-gray-400",
				className,
			)}
		>
			{children}
		</button>
	);
}

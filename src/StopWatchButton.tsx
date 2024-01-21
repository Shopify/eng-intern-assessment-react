import React from "react";

/**
 * Typesafety is one of my favorite parts of any React application. Assigning types to your props is vitally important to ensure typesafety across your whole app.
 */
interface Props {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export default function StopWatchButton({
    onClick,
    disabled = false,
    children,
}: Props) {
    // I added an aria-disabled attribute to the lap button to make it more accessible. This is a common practice in React.
    return (
        <button
            className="rounded-lg px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-300"
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
}

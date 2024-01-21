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
        <button onClick={onClick} disabled={disabled} aria-disabled={disabled}>
            {children}
        </button>
    );
}

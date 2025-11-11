import React, { Children } from 'react';

type ButtonProps = {
    title: string;
    children?: React.ReactChild;
    onClick: (children?: React.ReactChild) => void;
};

export default function StopWatchButton({ title, children, onClick }: ButtonProps) {
    return (
        <span onClick={() => onClick(children)}>
            {title}
        </span>
    );
}








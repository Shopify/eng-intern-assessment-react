import React from "react";

interface Props {
    onClick: () => void;
    label: string;
}

const StopwatchButton: React.FC<Props> = ({ onClick, label }) => {
    return <button onClick={onClick}>{label}</button>;
};

export default StopwatchButton;

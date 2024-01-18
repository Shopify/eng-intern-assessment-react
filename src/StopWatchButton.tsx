import React from "react"
import "./StopWatchButton.css"


interface StopWatchButtonProps {
    buttonName: string;
    buttonFunction: () => void;
    disabled: boolean;
    style?: React.CSSProperties;
}

export default function StopWatchButton({buttonName, buttonFunction, disabled, style}: StopWatchButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    const hoverStyle: React.CSSProperties = {
        border: style?.border || "3px solid white",
        color: style?.color || "white",
        backgroundColor: style?.backgroundColor || "white",
        boxShadow: `0 0 0 4px ${style?.color || "white"} inset`,
    }

    const pressedStyle: React.CSSProperties = {
        backgroundImage: "linear-gradient(rgb(0 0 0/40%) 0 0)",
    }

    let combinedStyle = style || {};
    if (isHovered) {
        combinedStyle = {...combinedStyle, ...hoverStyle};
    }
    if (isPressed) {
        combinedStyle = {...combinedStyle, ...pressedStyle};
    }

    return (
        <div>
            <React.Fragment>
                <button onClick={() => buttonFunction()}
                        disabled={disabled}
                        className={"basicButton"}
                        style={combinedStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                >
                {buttonName}
            </button>
        </React.Fragment>
</div>
)
}
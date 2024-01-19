import React from "react"
import "./StopWatchButton.css"


interface StopWatchButtonProps {
    buttonName: string;
    buttonFunction: () => void;
    disabled: boolean;
    style?: React.CSSProperties;
}


/**
 * a button for the stopwatch
 * @component
 * @example
 * const name = "test";
 * const function = () => {};
 * const buttonDisability = false;
 * const buttonStyle: React.CSSProperties = null;
 * return (
 *   <StopWatchButton buttonName={name} buttonFunction={function} disabled={buttonDisability} style={buttonStyle}/>
 * )
 */
export default function StopWatchButton({buttonName, buttonFunction, disabled, style}: StopWatchButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);


    /**
     * button style when hovered
     */
    const hoverStyle: React.CSSProperties = {
        border: style?.border || "3px solid white",
        color: style?.color || "white",
        backgroundColor: style?.backgroundColor || "white",
        boxShadow: `0 0 0 4px ${style?.color || "white"} inset`,
    }

    /**
     * button style when pressed down
     */
    const pressedStyle: React.CSSProperties = {
        backgroundImage: "linear-gradient(rgb(0 0 0/40%) 0 0)",
    }

    /**
     * combines the styles of the button
     */
    let combinedStyle = style || {};
    if (isHovered) {
        combinedStyle = {...combinedStyle, ...hoverStyle};
    }
    if (isPressed) {
        combinedStyle = {...combinedStyle, ...pressedStyle};
    }

    /**
     * renders the button
     */
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
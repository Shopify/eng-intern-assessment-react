import React from "react";
import "./ClockLoader.css";

// Props interface for type checking and documentation.
interface Props {
    className: string, // CSS class for custom styling.
    loadingSpeed: number, // Duration of one rotation cycle in seconds.
    clockColor: string, // Color of the clock hands and border.
    loadingColor: string // Color of the loading circle.
}

/**
 * ClockLoader Component: Renders an animated clock-like loader.
 * @param {Props} props - The properties passed to the component.
 * @param {string} props.className - The CSS class for custom styling.
 * @param {number} props.loadingSpeed - The duration of one rotation cycle in seconds.
 * @param {string} props.clockColor - The color of the clock hands and border.
 * @param {string} props.loadingColor - The color of the loading circle.
 * @returns {React.ReactElement} A clock-like loader element.
 */
export default function ClockLoader({ className, loadingSpeed, clockColor, loadingColor }: Props) {
    return (
        <div className={className}>
            {/* Loader circle with dynamic color and rotation speed */}
            <div className="loader" style={{ animationDuration: `${loadingSpeed}s`, borderColor: loadingColor }}></div>

            {/* SVG representing the clock */}
            <svg
                version="1.1"
                id="L2"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
            >
                {/* Outer circle of the clock */}
                <circle fill="none" stroke={clockColor} strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="48" />

                {/* Minute hand of the clock with rotation animation */}
                <line
                    fill="none"
                    strokeLinecap="round"
                    stroke={clockColor}
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="15"
                >
                    <animateTransform
                        attributeName="transform"
                        dur={`${loadingSpeed}s`}
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                    />
                </line>

                {/* Hour hand of the clock with slower rotation animation */}
                <line
                    fill="none"
                    strokeLinecap="round"
                    stroke={clockColor}
                    strokeWidth="4"
                    strokeMiterlimit="10"
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="22"
                >
                    <animateTransform
                        attributeName="transform"
                        dur={`${loadingSpeed * 7.5}s`}
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                    />
                </line>
            </svg>
        </div>
    );
}
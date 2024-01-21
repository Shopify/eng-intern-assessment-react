import { AnalogDisplayProps, AnalogProps } from "@types";
import { useMemo } from 'react';

export interface UseAnalogClockProps extends AnalogDisplayProps {
    secondHandLength: number,
    secondHandShift:number,
    laps: number[],
}


export const centerIconStyle:React.CSSProperties = {
    width: "4px",
    height: "4px",
    borderRadius: "100%",
    backgroundColor: "white",
    position: "absolute",
    border: `2px solid red`,
    bottom: "50%",
    left: "50%",
    transform: "translate(-50%,50%)",
    zIndex: 100,
};






export const useAnalogClock = ({
    containerStyles,
    faceColor,
    darkTheme,
    clockSize,
    borderWidth,
    borderColor,
    borderRadius,
    backgroundImage,
    secondTicks,
    clockStyle,
    secondHandShift,
    laps,
    milliseconds,

}: UseAnalogClockProps) => {
    const cs = containerStyles ? containerStyles : {};
    const finalContainerStyle: React.CSSProperties = {
        ...cs,
        margin: "16px",
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundColor: faceColor
            ? faceColor 
            : darkTheme 
                ? "rgb(28,28,28,1)" 
                : "rgb(240,240,240,1)",
        alignItems: 'center',
        width: `${clockSize + borderWidth + 15}px`,
        height: `${clockSize + borderWidth + 15}px`,
        borderRadius: borderRadius,
        border: `${4}px solid ${borderColor}`,
        boxShadow: '-4px -4px 10px rgba(67, 67, 67, 0.5), inset 4px 4px 10px rgba(0, 0, 0, 0.5), inset -4px -4px 10px rgba(67, 67, 67, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.3)',

        backgroundImage: backgroundImage
    };

    
    const finalClockStyle = {
        ...clockStyle,
        width: `${clockSize}px`,
        height: `${clockSize}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: borderRadius,
        position:'relative',
        background: secondTicks ? `repeating-conic-gradient(from 0deg, black 0deg 2deg, transparent 3deg 90deg), repeating-conic-gradient(from 0deg, rgba(95, 97, 95, 0.854) 0deg 1deg, transparent 1deg 6deg)` : "",
        boxShadow: `0 2vw 4vw -1vw rgba(0,0,0,0.8)`,
        maskImage: `radial-gradient(circle at center,transparent 60%,white 60.1%)`
    };


    const secondHandStyle = {
        transform: `rotate(${(milliseconds / 1000) * 6 % 360}deg)`,
        bottom:"50%",
        left: "50%",
        marginLeft: '-1px',
        marginBottom: `-${secondHandShift}px`,
        width: "2px",
        height: `${clockSize / 2 }px`,
        zIndex: 20,
        position:'absolute',
        backgroundColor: "red",
        transformOrigin: "50% 85%",
    }


     const lapHandStyle = {     
        bottom:"50%",
        left: "50%",
        marginLeft: '-1px',
        marginBottom: `-${secondHandShift}px`,
        width: "2px",
        height: `${clockSize / 2 }px`,
        zIndex: 20,
        position:'absolute',
        transformOrigin: "50% 85%", 
        backgroundColor:"rgb(0, 122, 255)", 
        transform: laps && laps.length > 0 ?  `rotate(${((milliseconds / 1000) * 6 % 360) - ((laps[laps.length-1] / 1000) * 6 % 360)}deg)` : null,
    }

    return useMemo(() => {
        return {
            finalContainerStyle,
            finalClockStyle,
            secondHandStyle,
            lapHandStyle,
        }
    }, [finalContainerStyle, finalClockStyle, secondHandStyle, lapHandStyle])
}
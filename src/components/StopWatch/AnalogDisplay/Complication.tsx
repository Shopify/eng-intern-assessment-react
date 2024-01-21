import React from 'react'
import {AnalogProps, StopWatchUIElement, Resolution, stopWatch} from "@types";
import { centerIconStyle } from './utils';
import { StopWatchContext } from '../'

export interface ComplicationProps extends AnalogProps, StopWatchUIElement{
    clockStyle?: React.CSSProperties;
    backgroundImage?: string;
    secondHandStyle?: React.CSSProperties;
    complicationSize?: number;
    borderWidth?: number;
    faceColor?: string;
    posBottom?: number;
    clockSize?: number;
    
}
export function Complication({
    milliseconds,
    containerStyles,
    secondTicks = true,

    clockSize = 75,
    handColor = 'rgb(255, 0, 0)',
    complication = true,
    posBottom = 20,
        }:ComplicationProps) {


    if(!complication){
        return null;
    }

  
    
    let secondHandLength = (clockSize / 2 );
    let secondHandShift = secondHandLength * 0.15;
    


    const secondHandStyle: React.CSSProperties ={
        bottom: "50%",
        left: "50%",
        width: "1.5px",
        transform: `rotate(${((milliseconds)/1000)*360 % 360}deg)`,
        height: `${secondHandLength}px`,
        backgroundColor: handColor,
        marginBottom: `-${secondHandShift}px`,
        
        marginLeft: '-0.75px',
        position:'absolute',

        transformOrigin: "50% 85%",
    }

    const complicationStyle: React.CSSProperties = {
        backgroundImage: secondTicks
            ? "repeating-conic-gradient(from 0deg, rgba(97, 95, 95, 0.854) 0deg 1deg, transparent 1deg 6deg), repeating-conic-gradient(from 0deg, black 0deg 2deg, transparent 3deg 90deg)"
            : "white",
        width: `${clockSize}px`,
        height: `${clockSize}px`,
        borderRadius: "100%",
        border:' 6px solid #333',
        boxShadow: '0 2vw 4vw -1vw rgba(0,0,0,0.8)',
        maskImage:" radial-gradient(circle at center,transparent 55%,red 55.1%)"
    }

    const complicationContainerStyle: React.CSSProperties = {
        position:"absolute",
        bottom:`${posBottom}%`,
        margin: `8% auto 0`,
        borderRadius: "100%",

        ...containerStyles
    }


        return (
            <div style={complicationContainerStyle} data-testid='complication-wrapper'>
                <div
                    style={complicationStyle as React.CSSProperties}
                    className='complication'
                    data-testid='complication'
                    >
                    
                </div>
                <div style={centerIconStyle}> </div>
                <div className='hand' data-testid='complication-hand' style={secondHandStyle as React.CSSProperties}/>
            </div>
        )
}

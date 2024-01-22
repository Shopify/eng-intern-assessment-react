import React, { useLayoutEffect, useRef } from 'react'
import { Time } from './Time'

/*
    This file defines the <StopWatch> view which comes in 2 types:
    1. DigitalTime_View
    2. AnalogTime_View
*/


interface View_Props {
    time: Time
};

function DigitalTime_View(props: View_Props) {
    /*
        In this view, the time is displayed as:
        "hours : minutes : seconds : milliseconds"
    */
    const style: React.CSSProperties = {
        // Style for main div
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        fontVariantNumeric: "tabular-nums",
        fontSize:50,
    };
    const style_alt: React.CSSProperties = {
        // Style for the 2 least significant digits
        fontSize:30,
        color: "#707070"
    };
    return (
        <div id="DigitalTime" style={style}>
            <p id="time" style={style}>
                {props.time.display().slice(0, -2)}
            </p>
            <p id="ms" style={style_alt}>
                {props.time.display().slice(-2)}
            </p>
        </div>
    );
}

function AnalogTime_View(props: View_Props) {
    /*
        In this view, the time is displayed as a
        clock (drawn on a canvas element)
    */
    const canvasRef = useRef<HTMLCanvasElement>(null); //reference the canvas element
    const w = 200;      //canvas width
    const h = 200;      //canvas height
    const radius = w/2; //radius of the clock

    //Drawing:
    useLayoutEffect(() => {
        const gc = canvasRef.current?.getContext("2d");
        if(!gc) return;
        //Draw the clock and the hands of time (for hours and seconds)
        drawClock(gc, 60, 5);
        drawHand(gc, props.time.s, 60, 3, 0.9);
        drawHand(gc, props.time.min, 60, 6, 0.6);
    });

    const drawHand = (gc: CanvasRenderingContext2D, time: number, max: number, lw: number, l: number) => {
        gc.save()
        //------
        gc.strokeStyle = "black";
        gc.lineWidth = lw;
        gc.translate(radius, radius);
        let ang = time * Math.PI / (max/2);
        gc.rotate(ang);
        gc.beginPath();
        gc.moveTo(0,0);
        gc.lineTo(0, -radius*l);
        gc.closePath();
        gc.stroke();
        //------
        gc.restore();
    };

    const drawClock = (gc: CanvasRenderingContext2D, n: number, step: number) => {
        gc.save();
        gc.clearRect(0, 0, w, h);
        //--------
        //  Main Circle
        gc.lineWidth = 2;
        gc.fillStyle = "white";
        gc.beginPath();
        gc.arc(w/2, h/2, radius, 2*Math.PI, 0);
        gc.stroke();
        gc.fill();
        gc.closePath();
        //----
        gc.translate(radius, radius);
        // Draw center dot
        gc.fillStyle="black";
        gc.beginPath();
        gc.arc(0,0,5,2*Math.PI, 0);
        gc.fill();
        gc.closePath();
        // Draw numbers
        gc.font = "20px Arial";
        gc.textBaseline="middle";
        gc.textAlign="center"
        for (let num = 0; num < n; num+=1) {
            let ang = num * Math.PI / (n/2)
            gc.rotate(ang);
            //Draw Line
            let t = 3;
            if(num % step == 0) {
                gc.strokeStyle = "black";
                t = 5;
            } else {
                gc.strokeStyle = "grey";
            }
            gc.beginPath();
            gc.moveTo(0,-radius);
            gc.lineTo(0, -radius+t);
            gc.closePath();
            gc.stroke();

            gc.translate(0, -radius*0.8);
            gc.rotate(-ang);
            //Draw Number
            if(num % step == 0) {
                gc.fillText(num == 0 ? n.toString() : num.toString(), 0, 0);
            }
            gc.rotate(ang);
            //------
            gc.translate(0, radius*0.8);
            gc.rotate(-ang);
        }
        //--------
        gc.restore();
    };

    // Render
    return (
        <canvas
            ref={canvasRef}
            width={w}
            height={h}
            style={{ width: w, height: h }}
        />
    );
}

interface StopWatch_Props {
    caption: string;
    time: Time
};

export default function StopWatch(props: StopWatch_Props) {
    /*
        The StopWatch display: <DigitalTime_View> + <AnalogTime_View>
    */
    const style: React.CSSProperties = {
        width: "100%",
        padding: 30,
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };
    return(
        <div id={`StopWatch-${props.caption}`} style={style}>
            <p style={{fontWeight: "bold"}}>{props.caption}</p>
            <DigitalTime_View
                time={props.time}
            />
            <AnalogTime_View
                time={props.time}
            />
        </div>
    )
}
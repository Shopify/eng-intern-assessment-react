import React, { useLayoutEffect, useRef } from 'react'
import { useEffect, useState } from 'react'

interface StopWatch_Props {
    time_ms: number
    time_s: number;
    time_min: number;
    time_hour: number;
};

function DigitalTime_View(props: StopWatch_Props) {
    /*
        In this view, the time is displayed as:
        <days - hours - seconds - milliseconds>
    */

    const style: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    };

    return (
        <div id="DigitalTime" style={style}>
            <p id="time"
                style={{
                    fontSize:50
                }}
            >
                {props.time_hour} : {props.time_min} : {props.time_s} : {props.time_ms.toString()[0]} </p>
            <p id="ms"
                style={{
                    fontSize: 30,
                }}
            >
                {props.time_ms.toString().slice(-2)}
            </p>
        </div>
    );
}

function AnalogTime_View(props: StopWatch_Props) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const w = 200;
    const h = 200;
    const radius = w/2;

    //Drawing
    useLayoutEffect(() => {
        const gc = canvasRef.current?.getContext("2d");
        if(!gc) return;
        drawClock(gc, 60, 5);
        drawHand(gc, props.time_s, 60, 3, 0.9);
        drawHand(gc, props.time_min, 60, 6, 0.6);
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


    return (
        <canvas
            ref={canvasRef}
            width={w}
            height={h}
            style={{ width: w, height: h }}
        />
    );
}

export default function StopWatch(props: StopWatch_Props) {
    /*
        The stopwatch display
    */
    const style: React.CSSProperties = {
        width: "100%",
        padding: 30,
        backgroundColor: "black",
        color: "white",
        fontSize: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };
    return(
        <div id="StopWatch" style={style}>
            <DigitalTime_View
                time_s={props.time_s}
                time_ms={props.time_ms}
                time_min={props.time_min}
                time_hour={props.time_hour}
            />
            <AnalogTime_View
                time_s={props.time_s}
                time_ms={props.time_ms}
                time_min={props.time_min}
                time_hour={props.time_hour}
            />
        </div>
    )
}
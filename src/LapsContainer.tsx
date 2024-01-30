import React from "react";
// import './LapsContainerStyling.css'

interface ILapsContainerProps {
    laps: string[]
}


export default function LapsContainer(props: ILapsContainerProps) {

    const {laps} = props

    return (
        <div className="LapsContainer" data-testid="LapsContainer">
            {laps.map((lap, index) => (
                <div className="LapsContainer__lap" key={index}>
                    <div className="LapsContainer__lap--index">#{laps.length - index}</div>
                    <div className="LapsContainer__lap--time">{lap}</div>
                </div>
            ))}  
        </div>
    )

}
import React from "react";

interface ILapsContainerProps {
    laps: string[]
}


export default function LapsContainer(props: ILapsContainerProps) {

    const {laps} = props

    return (
        <div>

            {laps.map((lap, index) => (
                <div>
                    <div>{index}</div>
                    <div>{lap}</div>
                </div>
            ))}
            
        </div>
    )

}
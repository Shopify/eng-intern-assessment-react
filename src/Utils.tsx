import React from "react"

interface time {
    time: number
}

export function DisplayTime(props: time) {
    // display the current time in the format: "hour : minute : second : one hundrdth of a second"
    const hours = Math.floor((props.time / 10000) % 60)
    const minutes = Math.floor((props.time / 1000) % 60)
    const seconds = Math.floor((props.time / 100) % 60)
    const hundredth = Math.floor(props.time % 60)

    return (
        <div>
            {hours < 10 ? 0 : ""}{hours}:
            {minutes < 10 ? 0 : ""}{minutes}:
            {seconds < 10 ? 0 : ""}{seconds}:
            {hundredth < 10 ? 0 : ""}{hundredth}
        </div>
    )
}

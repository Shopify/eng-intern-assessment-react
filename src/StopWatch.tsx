import React, { useState, useEffect } from 'react'

interface props{
    time: number
    laps: number
}

export default function StopWatch(props: props) {

    const hours = Math.floor(props.time / 60 / 60 % 60)
    const minutes = Math.floor(props.time / 60 % 60)
    const seconds = props.time % 60

   return(
    <div>
        <h1>{hours < 10 ? 0 : ""}{hours}:{minutes < 10 ? 0 : ""}{minutes}:{seconds < 10 ? 0 : ""}{seconds}</h1>
    </div>
   )
}
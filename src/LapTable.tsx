import React from "react"
import { DisplayTime } from "./App"

interface props {
  lapNum: number
  time: number
  lapTime: number
}

export default function Laps(props: props) {

  return (
    <div>
      Laps: {props.lapNum} time: <DisplayTime time={props.time}/> lap time: <DisplayTime time={props.lapTime}/>
    </div>
  )
}

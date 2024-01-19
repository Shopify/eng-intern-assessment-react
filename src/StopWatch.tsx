import React from "react"
import { DisplayTime } from "./App"

interface props {
  time: number
}

export default function StopWatch(props: props) {

  return (
    <div>
        <DisplayTime time={props.time}/>
    </div>
  )
}

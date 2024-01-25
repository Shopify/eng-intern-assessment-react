import React from "react";

export default function StopWatch(props: { time: number }) {
  {
    const min = Math.floor(props.time / 60000);
    const sec = Math.floor(props.time / 1000) % 1000;
    const msec = props.time % 1000;

    return (
      <div>
        {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}:
        {msec > 99 ? msec : msec > 9 ? "0" + msec : "00" + msec}
      </div>
    );
  }
}

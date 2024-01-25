import React from "react";

type props = {
  time: number;
};

export default function StopWatch(props: props) {
  const { time } = props;
  return <p>{time}</p>;
}

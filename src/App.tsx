// Node Imports:
import React, { useState } from "react";
// Local Imports:
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import { Time, Lap } from "./Time";
import { useTimer } from "./useTimer"

/*
	This file defines the components that combine to create the MVC architecture
	- View: items in the <ViewArea> component (ie: <StopWatch>, <Laps>)
	- Controller: <Controller> component; has buttons to control the model/view
	- Model: <useTimer> hook; holds information/functions relating to time.
*/

interface Laps_Props {
  laps: Lap[];
}

function Laps(props: Laps_Props) {
	/*
		[React Component] to display laps
	*/
  const style: React.CSSProperties = {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    maxHeight: "100vh",
    backgroundColor: "black",
    color: "white",
    padding: 20,
    paddingRight: 40,
    borderRight: "1px solid grey",
  };
  const inner_style: React.CSSProperties = {
    display: "flex",
    gap: 20,
    justifyContent: "space-between",
  };
  const p_style: React.CSSProperties = {
    fontWeight: "bold",
  };

	// Render: maps each lap object to a div that displays times.
  return (
    <div style={style} hidden={true}>
      <p style={p_style}>Laps:</p>
      <div style={inner_style}>
        <p style={p_style}>End Time</p>
        <p style={p_style}>Length</p>
      </div>
      {props.laps.map((lap, index) => {
        return (
          <div id={`lap-${index}`} style={inner_style}>
            <p id={`lapTotal-${index}`}>{lap.total_t.display()}</p>
            <p id={`lapLength-${index}`}>{lap.lap_t.display()}</p>
          </div>
        );
      })}
    </div>
  );
}

interface LapView_Props {
  enabled: boolean;
  children: React.ReactNode;
};

function LapView(props: LapView_Props) {
	/*
		[React Component] to display the info related to laps (<Stopwatch> and <Laps> components)
		- visibility depends on the prop <enabled>
		- initially, LapView is not visible. It becomes visible when the first lap is set.
	*/
  const style = {
    width: "100%",
    display: props.enabled ? "flex" : "none", //don't display if no
  };
  return <div style={style}>{props.children}</div>;
}

interface Controller_Props {
	children: React.ReactNode;
};

function ViewArea(props: { children: React.ReactNode }) {
	/*
		[ReactComponent] container to hold the views (<StopWatch> components)
	*/
  const style: React.CSSProperties = {
    display: "flex",
    flex: "0 0 100%",
  };
  return <div style={style}>{props.children}</div>;
}

function Controller(props: Controller_Props) {
	/*
		[React Component] to store the buttons, ie. controller of
		the stopwatch
	*/
  const style: React.CSSProperties = {
    display: "flex",
    gap: 20,
    padding: 50,
    backgroundColor: "black",
    borderBottom: "2px solid white",
  };
  return (
    <div id="Controls" style={style}>
      {props.children}
    </div>
  );
}

export default function App() {
	/*
		Main App component:
		- holds the timer (model, using the <useTimer> hook)
		- keeps track of an array of laps
		- converts the elapsed time (in ms) to a better format (ie: Time object)
	*/

	//Main model for time:
  const timer = useTimer();
	// Store laps:
  const [laps, setLaps] = useState([] as Lap[]);
  const [lapsEnabled, setLapsEnabled] = useState(false);
	//Create the time objects based on the timer:
  const total_t = new Time(timer.elapsedTime);
  const lap_t = new Time(timer.lapTime);

  const lap_callback = () => {
		// called by the timer when a new lap is set:
    laps.push({ total_t: total_t, lap_t: lap_t });
    setLapsEnabled(true);
  };

  const reset = () => {
		// when the timer is reset, the laps need to be as well:
    timer.handleReset();
    setLaps([]);
    setLapsEnabled(false);
  };

  // Render:
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial",
    height: "100vh",
    backgroundColor: "black",
  };
  return (
    <div id="App" style={style}>
      <Controller>
        <StopWatchButton name="Start" callback={timer.handleStart} />
        <StopWatchButton name="Stop" callback={timer.handleStop} />
        <StopWatchButton name="Reset" callback={reset} />
        <StopWatchButton
          name="Lap"
          callback={() => timer.handleLap(lap_callback)}
        />
      </Controller>
      <ViewArea>
        <LapView enabled={lapsEnabled}>
          <Laps laps={laps} />
          <StopWatch caption="Lap Time" time={lap_t} />
        </LapView>
        <StopWatch caption="Total Time" time={total_t} />
      </ViewArea>
    </div>
  );
}

// Node Imports:
import React, { useState } from "react";
// Local Imports:
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import { Time, Lap } from "./Time";
import { useTimer } from "./useTimer";
import "./styles.css";

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
		- Render: maps each lap object to a div that displays times.
	*/
  return (
    <div id="Laps" hidden={true}>
      <h3>Laps:</h3>
      <div className="LapTime">
        <h4>End Time</h4>
        <h4>Length</h4>
      </div>
      {props.laps.map((lap, index) => {
        return (
          <div className="LapTime" id={`lap-${index}`}>
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
}

function LapView(props: LapView_Props) {
  /*
		[React Component] to display the info related to laps (<Stopwatch> and <Laps> components)
		- visibility depends on the prop <enabled>
		- initially, LapView is not visible. It becomes visible when the first lap is set.
	*/
  return (
    <div id="LapView" className={props.enabled ? "enabled" : "disabled"}>
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
  const model = useTimer();
	const [lapsEnabled, setLapsEnabled] = useState(false);

  // Render:
  return (
    <div id="App">
      <div id="Controller">
        <StopWatchButton name="Start" callback={model.handleStart} />
        <StopWatchButton name="Stop" callback={model.handleStop} />
        <StopWatchButton name="Reset" callback={()=>{
					model.handleReset();
					setLapsEnabled(false);
				}} />
        <StopWatchButton name="Lap" callback={() => {
					model.handleLap();
					setLapsEnabled(true);
				}}/>
      </div>
      <div id="ViewArea">
        <LapView enabled={lapsEnabled}>
          <Laps laps={model.laps} />
          <StopWatch caption="Lap Time" time={model.lap_t} />
        </LapView>
        <StopWatch caption="Total Time" time={model.total_t} />
      </div>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils/formatTime";
import { ButtonGroup, Text, Card } from "@shopify/polaris";

export default function StopWatch() {
  const start: string = "Start";
  const stop: string = "Stop";
  const reset: string = "Reset";
  const lap: string = "Lap";
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [btnActionStartStop, setBtnStartStop] = useState<string>("Start");
  const [btnActionResetLap, setBtnResetLap] = useState<string>("Lap");
  const [laps, setLaps] = useState<number[]>([]);

  const stopStartTimer = () => {
    setIsRunning(!isRunning);
    const btnActionStartStop = isRunning ? start : stop;
    const btnActionLapReset =
      isRunning && btnActionStartStop == start ? reset : lap;
    setBtnResetLap(btnActionLapReset);
    setBtnStartStop(btnActionStartStop);
  };

  const actResetLap = () => {
    if (btnActionResetLap == lap) {
      setLaps([...laps, 0]);
      console.log(laps);
    } else if (btnActionResetLap == reset) {
      setTime(0);
      setIsRunning(false);
      setBtnResetLap(lap);
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 10), 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (time) {
      const rest = laps.slice(0, laps.length - 1);
      const curr = time - rest.reduce((acc, v) => acc + v, 0);
      setLaps([...rest, curr]);
    } else {
      setLaps([]);
    }
  }, [time]);
  return (
    <div>
      <Card>
        <Text variant='heading3xl' as='h1' alignment='start'>
          {formatTime(time)}
        </Text>
        <ButtonGroup>
          <StopWatchButton
            btnAction={btnActionStartStop}
            abilityDisable={false}
            onClick={stopStartTimer}
          ></StopWatchButton>
          <StopWatchButton
            btnAction={btnActionResetLap}
            abilityDisable={time == 0 && !isRunning}
            onClick={actResetLap}
          ></StopWatchButton>
        </ButtonGroup>
      </Card>
      {/* I Could have made the laps a prop and just passed down the laps into it, and that would have made the code cleaner
        but the instructions said to modify the code given to us, so I did not create a new  */}
      <div>
        <Text variant='headingLg' as='h3' alignment='start'>
          {" "}
          Laps
        </Text>
        <Card>
          <div data-testid='lap-list'>
            {laps.map((lap, i) => (
              <div data-testid={`lap: ${i}`} key={i}>
                <Text variant='headingLg' as='h5' alignment='start'>
                  Lap {i + 1}: {formatTime(lap)}
                </Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

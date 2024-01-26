import React, { useEffect, useRef, useState } from "react";
import StopWatchButton from "../common/button/StopWatchButton";
import Time from "../common/time/Time";
import Lap from "../common/lap/Lap";
import classes from "./StopWatch.module.css";
import btnclasses from "../common/button/StopWatchButton.module.css";

//Declare and initalize an initialTime for the stopwatch
const initialTime: TimeType = {
  milli: 0,
  second: 0,
  minute: 0,
  hour: 0,
};

//Declare and initalize an initialDateTime for the stopwatch
const initialDateTime: DateTimeType = {
  currentTime: Date.now(),
  pausedTime: Date.now(),
  capturedTime: Date.now(),
};

export default function StopWatch() {
  //Represents the initial state of the timer, true if first, false after
  const initialStartRef = useRef(true);

  //Represents the reset state. True on reset
  const onResetRef = useRef(false);
  //Holds the delay value of the laps. Incremented by 250 each lap
  const delayRef = useRef(0);
  //Represent the timer to reset lap compoenent. depend on delayRef value
  let lapsDelayTimer: NodeJS.Timeout;

  //State that holds the time of the stopwatch
  const [timeState, setTimeState] = useState({
    time: initialTime,
    lapTime: initialTime,
    dateTime: initialDateTime,
  });

  //State that holds the laps component array of the stopwatch
  const [laps, setLapsState] = useState<{
    lapNumber: number;
    component: TimeType[];
  }>({
    lapNumber: 0,
    component: [],
  });

  /**
   * State that holds the properties of each stopwatch button
   *
   * btn1: Represents Start button
   * btn2: Represents Stop button
   * btn3: Represents Lap button
   * btn4: Represents Reset button
   */
  const [btnState, setBtnState] = useState({
    className: "",
    btnType: {
      btn1: {
        label: "Start",
        isActive: true,
      },
      btn2: {
        label: "Stop",
        isActive: false,
      },
      btn3: {
        label: "Lap",
        isActive: true,
      },
      btn4: {
        label: "Reset",
        isActive: false,
      },
    },
  });

  //Function that handles button click
  const handleButtonClick = (btnClick: string) => {
    //Condition If Start button is click
    if (btnClick === "Start") {
      if (!btnState.btnType.btn2.isActive) {
        //Constantly check if stop button isn't active. It means it was paused
        //Calculate the pause Duration: d = (now - timeOnStop)
        const pauseDuration = Date.now() - timeState.dateTime.pausedTime;

        //Sets value
        initialStartRef.current = true;
        onResetRef.current = false;

        //Set the current and captured time to currentTime plus the pause time accumulated if it was pause
        setTimeState((prev) => {
          return {
            ...prev,
            dateTime: {
              ...prev.dateTime,
              currentTime: prev.dateTime.currentTime + pauseDuration,
              capturedTime: prev.dateTime.capturedTime + pauseDuration,
            },
          };
        });
      }
    }

    //Condition If Stop button is click
    //Set the pausedTime value to the time it was clicked
    if (btnClick === "Stop") {
      setTimeState((prev) => {
        return {
          ...prev,
          dateTime: {
            ...prev.dateTime,
            pausedTime: Date.now(),
          },
        };
      });
    }

    //Condition If Reset button is click
    //Set TimeState and Laps to intial value
    if (btnClick === "Reset") {
      if (btnState.btnType.btn4) {
        onResetRef.current = true;
        lapsDelayTimer = setTimeout(
          //Wait for the laps animation to finish before setting to initial value
          () => {
            setLapsState(() => {
              return {
                lapNumber: 0,
                component: [],
              };
            });
          },
          delayRef.current <= 1000 ? 3000 : delayRef.current + 1200
        );

        setTimeState(() => {
          return {
            time: initialTime,
            lapTime: initialTime,
            dateTime: initialDateTime,
          };
        });
      }
    }
    //Set the button state to know which button to activate or deactivate
    setBtnState((prev) => {
      switch (
        btnClick //Surround each with a switch case
      ) {
        case "Start":
          return {
            ...prev,
            btnType: {
              ...prev.btnType,
              btn1: {
                ...prev.btnType.btn1,
                isActive: false,
              },
              btn2: {
                ...prev.btnType.btn2,
                isActive: true,
              },
              btn3: {
                ...prev.btnType.btn3,
                isActive: true,
              },
            },
          };
        case "Stop":
          return {
            ...prev,
            btnType: {
              ...prev.btnType,
              btn1: {
                ...prev.btnType.btn1,
                isActive: true,
              },
              btn2: {
                ...prev.btnType.btn2,
                isActive: false,
              },
              btn3: {
                ...prev.btnType.btn3,
                isActive: false,
              },
            },
          };
        case "Lap":
          return {
            ...prev,
            btnType: {
              ...prev.btnType,
              btn3: {
                ...prev.btnType.btn3,
                isActive: true,
              },
            },
          };
        case "Reset":
          return {
            ...prev,
            btnType: {
              ...prev.btnType,
              btn3: {
                ...prev.btnType.btn3,
                isActive: true,
              },
              btn4: {
                ...prev.btnType.btn4,
                isActive: false,
              },
            },
          };
        default:
          return { ...prev };
      }
    });
  };

  //Clean up function
  useEffect(() => {
    return () => {
      clearTimeout(lapsDelayTimer);
    };
  }, []);

  //useEffect to track changes buttons and lap number then start the stopwatch timer
  useEffect(() => {
    const startTimer = setInterval(() => {
      //First timer to start the stopwatch timer
      if (btnState.btnType.btn2.isActive) {
        // If button start is click, button stop will be active
        setTimeState((prev) => {
          //Set the time state as follows

          //Caluclate the time difference from time it was started to Now (td = now - curr)
          const timeDifference = Date.now() - prev.dateTime.currentTime;

          //initialize a temp time
          //(dividing the time on millis by the number of millis)
          const temp: TimeType = {
            milli: prev.time.milli >= 1000 ? 0 : prev.time.milli + 10, //Increment 10, reset after 1000
            hour: Math.floor((timeDifference / (1000 * 60 * 60)) % 24), // Formula to calculate hour
            minute: Math.floor((timeDifference / (1000 * 60)) % 60), // Formula to calculate minute
            second: Math.floor((timeDifference / 1000) % 60), // Formula to calculate second
          };
          return {
            ...prev,
            time: temp,
          };
        });
      }
    }, 10);

    //Seocond timer representing the laps timer
    const startLapTimer = setInterval(() => {
      if (btnState.btnType.btn2.isActive) {
        setTimeState((prev) => {
          //Calculate time difference, if initial lap, get the difference from start time else from time lap button was click
          const timeDifference =
            laps.lapNumber === 0
              ? Date.now() - prev.dateTime.currentTime
              : Date.now() - prev.dateTime.capturedTime;
          const temp: TimeType = {
            milli: prev.time.milli >= 1000 ? 0 : prev.time.milli + 10,
            hour: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
            minute: Math.floor((timeDifference / (1000 * 60)) % 60),
            second: Math.floor((timeDifference / 1000) % 60),
          };

          return {
            ...prev,
            lapTime: temp,
          };
        });
      }
    }, 10);

    //Clear interval
    return () => {
      clearInterval(startLapTimer);
      clearInterval(startTimer);
    };
  }, [btnState.btnType.btn1, btnState.btnType.btn2, laps.lapNumber]);

  //useEffect to track lap button click
  useEffect(() => {
    if (initialStartRef.current) {
      initialStartRef.current = false;
      return;
    }

    //Run function if stop button is active
    if (btnState.btnType.btn2.isActive) {
      //Set lap state with lapNumber and laptime
      setLapsState((prev) => {
        return {
          lapNumber: prev.lapNumber + 1,
          component: [...prev.component, timeState.lapTime],
        };
      });

      //Reset the lap current time to start counting back to zero
      //Set the lap captured time to now
      setTimeState((prev) => {
        return {
          ...prev,
          lapTime: initialTime,
          dateTime: {
            ...prev.dateTime,
            capturedTime: Date.now(),
          },
        };
      });
    }
  }, [btnState.btnType.btn3]);

  //Hanlde which button to display for the first button
  const hanldeStartStop = btnState.btnType.btn1.isActive
    ? btnState.btnType.btn1
    : btnState.btnType.btn2;
  //Hanlde which button to display for the second button
  const hanldeLapReset = btnState.btnType.btn3.isActive
    ? btnState.btnType.btn3
    : btnState.btnType.btn4;

  //Component renders all the time, make sure delay ref is set to zero
  delayRef.current = 0;

  return (
    <div className="main">
      <div className="container">
        <div className={classes.time}>
          <Time time={timeState.time} className="stopwatch" />
        </div>
        <div title={"button"} className={btnclasses["btn-container"]}>
          <StopWatchButton
            btnType={hanldeStartStop}
            onButtonClick={handleButtonClick}
            className={hanldeStartStop.label}
            name={hanldeStartStop.label}
          />
          <StopWatchButton
            btnType={hanldeLapReset}
            onButtonClick={handleButtonClick}
            className={hanldeLapReset.label}
            name={hanldeLapReset.label}
          />
        </div>
      </div>
      <div title={"laps"} className={classes["lap-container"]}>
        <ul role={"ul"} className={classes.ul}>
          {laps.component.map((lap, i) => {
            return (
              <li role={"li"} key={i} className={classes.li}>
                <Lap
                  className={
                    onResetRef.current
                      ? i % 2 === 0
                        ? "startLeft"
                        : "startRight"
                      : "idle"
                  }
                  delay={(delayRef.current += 250)}
                  index={i}
                  lap={lap}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

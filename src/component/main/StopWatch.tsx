import React, { useState } from "react";
import StopWatchButton from "../common/button/StopWatchButton";

export default function StopWatch() {
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

  //Hanlde which button to display for the first button
  const hanldeStartStop = btnState.btnType.btn1.isActive
    ? btnState.btnType.btn1
    : btnState.btnType.btn2;
  //Hanlde which button to display for the second button
  const hanldeLapReset = btnState.btnType.btn3.isActive
    ? btnState.btnType.btn3
    : btnState.btnType.btn4;

  return (
    <div className="main">
      <div className="container">
        <div className="time">
          <span>00:00:00:00</span>
        </div>
        <div className="btn-container">
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
    </div>
  );
}

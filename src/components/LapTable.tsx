import React from "react";

interface LapTableProps {
  lap: string[][];
}

const LapTable: React.FC<LapTableProps> = ({ lap }: LapTableProps) => {
  function convertTimeToMilliseconds(timeString: string) {
    // Split the string into [hours, minutes, seconds, milliseconds]
    const parts = timeString.split(":").map(Number);

    // Convert hours, minutes, seconds to milliseconds and add them up
    const hoursInMs = parts[0] * 60 * 60 * 1000;
    const minutesInMs = parts[1] * 60 * 1000;
    const secondsInMs = parts[2] * 1000;
    const milliseconds = parts[3];

    return hoursInMs + minutesInMs + secondsInMs + milliseconds;
  }

  function convertMillisecondsToTime(milliseconds: number) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor(((milliseconds % 360000) % 60000) / 1000);
    let millisecondsLeft = ((milliseconds % 360000) % 60000) % 1000;

    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    let secondsString = seconds.toString();
    let millisecondsString = millisecondsLeft.toString();

    if (hours < 10) {
      hoursString = "0" + hoursString;
    }

    if (minutes < 10) {
      minutesString = "0" + minutesString;
    }

    if (seconds < 10) {
      secondsString = "0" + secondsString;
    }

    if (millisecondsLeft < 10) {
      millisecondsString = "0" + millisecondsString;
    }

    return (
      hoursString +
      ":" +
      minutesString +
      ":" +
      secondsString +
      "." +
      millisecondsString
    );
  }

  function findDifference(currentLap: string, index: number) {
    if (index == 0) {
      return currentLap;
    }

    let currentTimeInteger = convertTimeToMilliseconds(currentLap);
    let previousTimeInteger = convertTimeToMilliseconds(lap[index - 1][1]);

    let difference = currentTimeInteger - previousTimeInteger;
    return convertMillisecondsToTime(difference);
  }

  return (
    <div className="row text-center mt-3" id="lap-container">
      <table id="lap-table">
        <thead>
          <tr>
            <th>Lap Number</th>
            <th>Time</th>
            <th>Overall Time</th>
          </tr>
        </thead>
        <tbody>
          {lap.map((lap, index) => (
            <tr key={index}>
              <td id={"Number-" + index.toString() + "-1"}>{lap[0]}</td>
              <td id={"Number-" + index.toString() + "-2"}>{findDifference(lap[1], index)}</td>
              <td id={"Number-" + index.toString() + "-3"}>{lap[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LapTable;

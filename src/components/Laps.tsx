import React from "react";
import { formatTime } from "../utils/formatTime";
import './styles/Laps.css'

interface Props {
  laps: number[],
  currentLapTime: number
};

const Laps: React.FC<Props> = ({ laps = [], currentLapTime }: Props) => {
  return (
    <div className="lap-table-container" data-testid='lap-table'>

      <ul className="">
        {/* display current lap */}
        {currentLapTime > 0 &&
        <div className="laps-list scrollable-table">
          <li className="lap-listing current-lap">
            <span>Lap {laps.length + 1} </span>
            <span data-testid='current-lap-time'>{formatTime(currentLapTime)}</span>
          </li>
        </div>
          
        }

        {/* display lap history */}
        <div className="laps-list scrollable-table">
          {laps && laps.length > 0 ?
            laps.map((lapTime: number, lapNum: number) => (
              <li className="lap-listing" key={lapNum + 1}>
                <span>Lap {lapNum + 1} </span>
                <span>{formatTime(lapTime)}</span>
              </li>
            ))
            :
            null
          }
        </div>
      </ul>
    </div>
  );
}


export default Laps;
import React from "react";
import { formatTime } from "../utils/formatTime";
import './styles/Laps.css'

interface Props {
  laps: number[],
  currentLapTime: number
};

const Laps: React.FC<Props> = ({ laps = [], currentLapTime }: Props) => {
  return (
    <div>

      <ul >
        {/* display current lap */}
        {currentLapTime > 0 &&
          <li>
            <span>Lap {laps.length + 1} </span>
            <span>{formatTime(currentLapTime)}</span>
          </li>
        }

        {/* display lap history */}
        <div className="laps-list">
          {laps && laps.length > 0 ?
            laps.map((lapTime: number, lapNum: number) => (
              <li key={lapNum + 1}>
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
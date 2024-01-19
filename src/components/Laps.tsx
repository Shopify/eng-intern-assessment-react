import React from "react";
import formatTime from "../utils/formatTime";

interface Lap {
  number: number;
  totalTime: number;
  timeInterval: number;
}

interface LapsProps {
  laps: Lap[];
}

const Laps = ({ laps }: LapsProps) => {
  return (
    <>
      <div className="laps__title">
        <h3>Laps</h3>
        <div className="lap__times">
          <span className="lap__times__time">Time</span>
          <span className="lap__times__time">Interval</span>
        </div>
      </div>
      <div className="laps-list" data-testid="laps-list">
        {laps.map((lap) => {
          return (
            <div key={lap.number} className="lap">
              <span>{lap.number}</span>
              <div className="lap__times">
                <span className="lap__times__time">
                  {formatTime(lap.totalTime)}
                </span>
                <span className="lap__times__time">
                  {formatTime(lap.timeInterval)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Laps;

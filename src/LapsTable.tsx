import React from 'react';

interface LapDisplayProps {
  lapTimes: string[];
}

const LapsTable = ({ lapTimes }: LapDisplayProps) => {
  return (
    <div className="lap-display">
      <h2>Lap Times</h2>
      <div className="lap-list">
        {lapTimes.map((lapTime, index) => (
          <div key={index} className={index % 2 === 0 ? 'blue-text' : 'black-text'}>
            Lap {index + 1}: {lapTime}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LapsTable;

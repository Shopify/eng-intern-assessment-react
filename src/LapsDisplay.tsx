import React from 'react';

type LapsDisplayProps = {
  laps: String[];
};

const LapsDisplay: React.FC<LapsDisplayProps> = ({ laps }) => {
  return (
    <div>
      <h3>Laps</h3>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{lap}</li>
        ))}
      </ul>
    </div>
  );
};

export default LapsDisplay;

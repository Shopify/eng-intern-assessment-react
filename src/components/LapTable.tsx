import React from 'react';
import '../styles/LapTable.css';

// Interface for individual lap data
interface Lap {
  lapTime: number;
  currentTime: string;
}

// Props definition for the LapTable component
interface LapTableProps {
  laps: Lap[];
  formatLap: (milliseconds: number) => string;
  handleClearLaps: () => void;
  handleExport: () => void;
}

// The LapTable component displays the laps in a table format and provides buttons for additional actions (Clear, Export)
// Only apears once laps array is greater than 0
const LapTable: React.FC<LapTableProps> = ({ laps, formatLap, handleClearLaps, handleExport }) => {
  return (
    <div className="laps-container">
      {/* Title for the laps section */}
      <div className="laps-title">
        <h2>Lap Times</h2>
      </div>
      {/* Container for the lap times table */}
      <div className="laps-content">
        {/* Table header for lap information */}
        <div className="table-headers">
          <span className="lap-number">Lap #</span>
          <span className="lap-time">Lap Time</span>
          <span className="lap-elapsed-time">Elapsed Time</span>
          <span className="lap-current-time">Current Time & Date</span>
        </div>
        {/* Mapping over each lap to create a table row for each */}
        {laps.map((lap, index) => (
          <div key={index} className="lap">
            <span className="lap-number">Lap {laps.length - index}</span>
            <span className="lap-time">{formatLap(lap.lapTime)}</span>
            <span className="lap-elapsed-time">
              {index < laps.length - 1 ? formatLap(lap.lapTime - laps[index + 1].lapTime) : "00:00:00.00"}
            </span>
            <span className="lap-current-time">{lap.currentTime}</span>
          </div>
        ))}
      </div>
      {/* Container for action buttons */}
      <div className="button-container">
        {/* Button to clear all laps */}
        <button className="clear-laps" onClick={handleClearLaps}>Clear Laps</button>
        {/* Button to export lap times as a CSV file */}
        <button data-testid="export-csv" className="export-laps" onClick={handleExport}>Export as CSV</button>
      </div>
    </div>
  );
};

export default LapTable;
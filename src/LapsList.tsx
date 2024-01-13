import React from 'react';
import { Lap } from './types';

interface IProps {
  laps: Lap[];
}

export default function LapsList({ laps }: IProps) {
  return (
    <table className='lap-table'>
      <thead>
        <tr className='lap-table-header-row'>
          <th>Lap #</th>
          <th>Lap Time</th>
        </tr>
      </thead>
      <tbody data-testid='lap-list'>
        {laps.map((lap) => {
          return (
            <tr className='lap-table-row' key={`lap-${lap.lapNumber}`}>
              <td>{lap.lapNumber}</td>
              <td>{lap.lapTime}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

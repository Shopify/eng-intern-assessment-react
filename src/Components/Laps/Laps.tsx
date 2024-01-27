import React from 'react'
import { Time } from '../../Models/timeModel'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface LapsProps {
    lapTimes: string[];
    onDelete: (index: number) => void;
  }
  
export default function Laps({lapTimes, onDelete}: LapsProps) {
    return(
        <div data-testid="lap-list">
          <Table bordered hover>
          <thead>
            <tr>
              <th>Lap #</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lapTimes.map((lapTime: string, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td data-testid={`lap-time-${index}`}>
                  {lapTime}
                </td>
                <td>
                    <Button variant="dark" size="sm" onClick={() => onDelete(index)}>
                      Delete
                    </Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
}
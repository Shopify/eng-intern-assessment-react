import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './Laps.css'

/*
  Define the props for the Laps component
  lapTimes: an array of strings representing the lap times
  onDelete: a function that takes an index and deletes the lap time at that index
*/

interface LapsProps {
    lapTimes: string[];
    onDelete: (index: number) => void;
  }


/*
  Lap component that displays the lap times in a table
*/

export default function Laps({lapTimes, onDelete}: LapsProps) {
    return(
        <div className="table-container" data-testid="lap-list">
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
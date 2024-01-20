import React from "react";

const SavedLaps = () => {
  return (
    <table className="lapped">
      <tr>
        <th>Lap</th>
        <th>Lap Time</th>
        <th>Total Time</th>
      </tr>
      <tr>
        <td>2</td>
        <td>00:05:01:12</td>
        <td>00:05:01:12</td>
      </tr>
      <tr>
        <td>1</td>
        <td>00:15:31:12</td>
        <td>00:25:01:12</td>
      </tr>
    </table>
  );
};

export default SavedLaps;

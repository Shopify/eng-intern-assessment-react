import React from "react";
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <span className="timerText">
        00:00:00<span className="ms">.00</span>
      </span>
      <div className="buttonContainer">
        <button>Reset</button>
        <button>Start</button>
        <button>Lap</button>
      </div>

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
    </div>
  );
}

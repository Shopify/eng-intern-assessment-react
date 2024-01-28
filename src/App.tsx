import React, {useState} from "react";
import StopWatch from "./components/StopWatch";

export default function App() {
  const [lap, setLap] = useState([]);

  return (
    <>
      <div>
        <StopWatch lap={lap} setLap={setLap}/>
      </div>
    </>
  );
}

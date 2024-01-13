import React, { useState } from "react";
import StopWatch from "./StopWatch";

export default function App() {
  const [lapTimes, setLapTimes] = useState<string[]>(["00:12:89", "00:23:03"]);
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        width: "100vw",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StopWatch
        addLap={(lap) => setLapTimes([lap, ...lapTimes])}
        clearLaps={() => setLapTimes([])}
      />
      <div
        id="lap-list"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginLeft: 50,
          fontSize: 24,
          fontFamily: "Inter",
        }}
      >
        {lapTimes.map((lap, index) => (
          <div key={index} style={{ marginBlock: 10 }}>
            <div
              style={{
                display: "inline",
                paddingBlock: 5,
                paddingInline: 15,
                borderRadius: 100,
                backgroundColor: "lightgrey",
              }}
            >
              {lap}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

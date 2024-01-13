import React from "react";
import StopWatch from "./StopWatch";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="timer__container">
        <h2>Shopify Stopwatch</h2>
        <StopWatch />
      </div>
    </div>
  );
};

export default App;

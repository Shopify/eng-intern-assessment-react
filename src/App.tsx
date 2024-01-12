import React from "react";
import Stopwatch from "./Stopwatch";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="app__title">Stopwatch</h1>
      <Stopwatch />
    </div>
  );
};

export default App;

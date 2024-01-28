import React from 'react'
import StopWatch from './StopWatch';

const App = () => {
    const countdown = StopWatch ();
    return (
        <div>
          <StopWatch></StopWatch>
        </div>
      );
}
export default App;